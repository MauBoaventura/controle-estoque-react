import { useState } from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Collapse from '@mui/material/Collapse';
import { toast } from 'react-toastify';

import { client } from "../../services";
import { formatToReal, formatToDollar } from '../../util/formatCoin'
import Toast from "../Toast/Toast";

import {
  TICKET_ERROR, 
  PRODUCT_DELETED,
} from '../../constants/Messages'

const moment = require('moment')

export default function Row(props) {
  const { rows, labelId } = props;
  const [row, setRow] = useState(rows);
  const [open, setOpen] = useState(false);
  const [pedido, setPedido] = useState([])
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  const handelDeleteRow = (params) => {
    setOpenDialogDelete(true);
    // let a = row.filter((x) => pedido.id !== x.id) //map(item=>(item.filter((x) => pedido.id !== x.id)))
    // console.log(a)
    setPedido(params)
  }

  // Dialog 
  const handleDeleteClose = () => {
    setOpenDialogDelete(false);
  };

  const handleConfirmeDelete = async () => {
    try {
      let resposta = (await client.delete("/api/pedido/" + pedido.id));

      if (resposta.status === 200) {
        toast(
          <Toast
            type='success'
            title='Produto'
            text={PRODUCT_DELETED}
          />
        );
      }
      else {
        toast(
          <Toast
            type='error'
            title='Produto'
            text={TICKET_ERROR}
          />
        );
      }
      setPedido({});

    } catch (error) {
      console.error(error)
    }
    setRow((r) => r.filter((x) => pedido.id !== x.id));
    setOpenDialogDelete(false);
  };

  const totalRow = row?.reduce((acc, rowData) => { return acc += row[0]?.dolar_compra * rowData?.valor_produto * rowData?.quantidade_solicitada - rowData?.taxa_transporte_produto.taxa * rowData?.valor_produto * rowData?.quantidade_solicitada }, 0)

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        key={row[0]?.name}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowDownIcon  onClick={() => setOpen(!open)}/> : <KeyboardArrowRightIcon  onClick={() => setOpen(!open)} />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          {row[0]?.nota}
        </TableCell>
        <TableCell align="left" padding='none'>{moment(row[0]?.data_pedido).format("DD-MM-YYYY")}</TableCell>
        <TableCell align="left" padding="none">{row[0]?.fornecedor.nome}</TableCell>
        <TableCell align="left" padding="none">{row[0]?.freteiro.nome}</TableCell>
        <TableCell align="right" padding="none">{formatToReal(row[0]?.dolar_compra)}</TableCell>
        <TableCell align="right" padding="none">{formatToReal(totalRow)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Valor unitário ($)</TableCell>
                    <TableCell align="right">Frete (R$)</TableCell>
                    <TableCell align="right">Transporte (R$)</TableCell>
                    <TableCell align="right">Total (R$)</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.map((historyRow) => (
                    <TableRow key={historyRow?.id} >
                      <TableCell>
                        {`${historyRow?.produto?.marca || ''} ${historyRow?.produto?.modelo || ''} ${historyRow?.produto?.capacidade || ''} ${historyRow?.produto?.cor || ''} ${historyRow?.produto?.ram || ''}`}
                      </TableCell>
                      <TableCell>{historyRow?.quantidade_solicitada}</TableCell>
                      <TableCell component="th" scope="row">
                        {formatToDollar(historyRow?.valor_produto)}
                      </TableCell>
                      <TableCell align="right">{formatToReal(row[0]?.dolar_compra * historyRow?.taxa_transporte_produto.taxa * historyRow?.valor_produto * historyRow?.quantidade_solicitada)}</TableCell>
                      <TableCell align="right">{formatToReal(20)}</TableCell>
                      <TableCell align="right">{formatToReal(row[0]?.dolar_compra * historyRow?.valor_produto * historyRow?.quantidade_solicitada - historyRow?.taxa_transporte_produto.taxa * historyRow?.valor_produto * historyRow?.quantidade_solicitada)}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handelDeleteRow(historyRow)}
                        >
                          <DeleteIcon 
                          onClick={() => handelDeleteRow(historyRow)}
                          fontSize='small'
                           color='error' />
                        </IconButton>
                      </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={openDialogDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja realmente apagar?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* {`ID: ${pedido?.id ?? '-'}`} */}
            {/* <br /> */}
            {`Nota: ${pedido?.nota ?? '-'}`}
            <br />
            {`Produto: ${pedido?.produto?.marca || ''} ${pedido?.produto?.modelo || ''} ${pedido?.produto?.capacidade || ''} ${pedido?.produto?.cor || ''} ${pedido?.produto?.ram || ''}`}
            <br />
            {`Fornecedor: ${pedido?.fornecedor?.nome ?? '-'}`}
            <br />
            {`Data: ${moment(pedido?.data_pedido).format("DD-MM-YYYY") ?? '-'}`}
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancelar</Button>
          <Button onClick={handleConfirmeDelete} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// Row?.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };
