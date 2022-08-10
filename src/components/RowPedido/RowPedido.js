import { useState, useCallback } from 'react';
// import PropTypes from 'prop-types';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';


import { client } from "../../services";
import { formatToReal, formatToDollar } from '../../util/formatCoin'
import Toast from "../Toast/Toast";

import {
  TICKET_UPDATE,
  TICKET_UPDATE_ERROR,
  TICKET_QUNT_1_ERROR,
  TICKET_QUNT_2_ERROR,
  PRODUCT_DELETED,
  TICKET_ERROR,
} from '../../constants/Messages'

const moment = require('moment')

export default function RowPedido(props) {
  const { rowPedido ,deleteRowAction} = props;
  const [qutdRecebida, setQutdRecebida] = useState(rowPedido.quantidade_recebida);
  const [qutdRecebidaOld, setQutdRecebidaOld] = useState(rowPedido.quantidade_recebida);
  const [rowCurent, setRowCurent] = useState(rowPedido)
  const [pedido, setPedido] = useState([])
  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handelDeleteRowPedido = (params) => {
    setOpenDialogDelete(true);
    setPedido(params)
  }

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
      setRowCurent({ ...rowCurent, produto: {} })
    } catch (error) {
      console.error(error)
    }
    // setRow((r) => r.filter((x) => pedido.id !== x.id));
    setOpenDialogDelete(false);
  };

  const handelEditRowPedido = async (params) => {
    const a = await processRowUpdate({ quantidade_recebida: parseInt(params.target.value) })
    setQutdRecebida(a)
    setQutdRecebidaOld(a)
    setOpenEdit(false);
  }

  const processRowUpdate = async (rowOldValue) => {
    try {
      // Quantidade recebida maior que a solicitada
      if (rowOldValue.quantidade_recebida > rowCurent.quantidade_solicitada) {
        console.log('DIRCEU')
        toast(
          <Toast
            type='error'
            title='Pedido'
            text={TICKET_QUNT_1_ERROR}
          />
        );
        return qutdRecebidaOld;
      }

      // Quantidade recebida menor que a pré-existente
      if (rowOldValue.quantidade_recebida < qutdRecebidaOld) {
        toast(
          <Toast
            type='error'
            title='Pedido'
            text={TICKET_QUNT_2_ERROR}
          />
        );
        return qutdRecebidaOld;
      }
      delete rowCurent['data_pedido']

      await client.put("/api/pedido/" + rowCurent.id, { quantidade_recebida: rowOldValue.quantidade_recebida });
      toast(
        <Toast
          type='success'
          title='Pedido'
          text={TICKET_UPDATE}
        />
      );
      return rowOldValue.quantidade_recebida;
    } catch (error) {
      toast(
        <Toast
          type='error'
          title='Pedido'
          text={TICKET_UPDATE_ERROR}
        />
      );
      return qutdRecebidaOld;
    }
  }

  return (
    <>
      <TableRow key={rowCurent?.id}>
        <TableCell>
          {`${rowCurent?.produto?.marca || ''} ${rowCurent?.produto?.modelo || ''} ${rowCurent?.produto?.capacidade || ''} ${rowCurent?.produto?.cor || ''} ${rowCurent?.produto?.ram || ''}`}
        </TableCell>
        <TableCell>{rowCurent?.quantidade_solicitada}</TableCell>
        <TableCell
          onClick={() => setOpenEdit(true)}
          onBlur={handelEditRowPedido}
        >
          {openEdit ?
            <TextField
              id="outlined-basic"
              variant="standard"
              type='number'
              value={qutdRecebida}
              onChange={(e) => { setQutdRecebida(e.target.value ?? '') }}
              autoFocus
            /> :
            qutdRecebida}
        </TableCell>
        <TableCell component="th" scope="row">
          {formatToDollar(rowCurent?.valor_produto)}
        </TableCell>
        <TableCell align="right">{formatToReal(rowCurent.dolar_compra * rowCurent?.taxa_transporte_produto.taxa * rowCurent?.valor_produto * rowCurent?.quantidade_solicitada)}</TableCell>
        <TableCell align="right">{formatToReal(20)}</TableCell>
        <TableCell align="right">{formatToReal(rowCurent.dolar_compra * rowCurent?.valor_produto * rowCurent?.quantidade_solicitada - rowCurent?.taxa_transporte_produto.taxa * rowCurent?.valor_produto * rowCurent?.quantidade_solicitada)}</TableCell>
        <TableCell align="right" padding='none'>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            <DeleteIcon
              onClick={deleteRowAction}
              fontSize='small'
              color='error' />
          </IconButton>
        </TableCell>
      </TableRow>
      {/* <Dialog
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
      </Dialog> */}
    </>
  );
}
