import { useState } from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Collapse from '@mui/material/Collapse';

export default function Row(props) {
  const { row, labelId } = props;
  const [open, setOpen] = useState(false);

  console.log(row);

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
            onClick={() => setOpen(!open)}
          >
            {/* {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />} */}
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
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
        <TableCell align="left">{row[0]?.data_pedido}</TableCell>
        <TableCell align="right">{row[0]?.fornecedor.nome}</TableCell>
        <TableCell align="right">{row[0]?.freteiro.nome}</TableCell>
        <TableCell align="right">{row[0]?.dolar_compra}</TableCell>
        <TableCell align="left">{row[0]?.dolar_compra*10}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Valor unitário</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell align="right">Frete (R$)</TableCell>
                    <TableCell align="right">Transporte (R$)</TableCell>
                    <TableCell align="right">Total (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.map((historyRow) => (
                    <TableRow key={historyRow?.produto_id}>
                      <TableCell>{historyRow?.produto.marca}</TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow?.valor_produto}
                      </TableCell>
                      <TableCell>{historyRow?.quantidade_solicitada}</TableCell>
                      <TableCell align="right">{historyRow?.taxa_transporte_produto.taxa}</TableCell>
                      <TableCell align="right">{'20' }</TableCell>
                      <TableCell align="right">{'historyRow?.total' }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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

const a = {
  "1": [
      {
          "id": 1,
          "data_pedido": "2022-08-03T00:00:00.000Z",
          "nota": 1,
          "fornecedor_id": 1,
          "produto_id": 1,
          "freteiro_id": 1,
          "taxa_transporte_produto_id": 1,
          "dolar_compra": 5.6,
          "quantidade_solicitada": 10,
          "valor_produto": 100,
          "quantidade_recebida": 0,
          "createdAt": "2022-08-03T18:50:39.000Z",
          "updatedAt": "2022-08-03T18:50:39.000Z",
          "deletedAt": null,
          "fornecedor": {
              "id": 1,
              "nome": "Mega",
              "createdAt": "2022-07-27T19:54:16.000Z",
              "updatedAt": "2022-07-27T19:54:16.000Z",
              "deletedAt": null
          },
          "freteiro": {
              "id": 1,
              "nome": "Hoeliton",
              "createdAt": "2022-06-28T06:31:25.000Z",
              "updatedAt": "2022-07-06T02:32:03.000Z",
              "deletedAt": null
          },
          "estoques": [],
          "produto": {
              "id": 1,
              "marca": "Xiaomi",
              "modelo": "Note 10S",
              "cor": "Branco",
              "capacidade": "128 GB",
              "ram": "6 RAM",
              "createdAt": "2022-06-29T21:07:44.000Z",
              "updatedAt": "2022-06-29T21:07:44.000Z",
              "deletedAt": null
          },
          "taxa_transporte_produto": {
              "id": 1,
              "freteiro_id": 1,
              "produto_id": 1,
              "taxa": "0.05",
              "createdAt": "2022-06-30T19:15:03.000Z",
              "updatedAt": "2022-06-30T19:15:03.000Z",
              "deletedAt": null
          }
      },
      {
          "id": 2,
          "data_pedido": "2022-08-03T00:00:00.000Z",
          "nota": 1,
          "fornecedor_id": 1,
          "produto_id": 11,
          "freteiro_id": 1,
          "taxa_transporte_produto_id": 11,
          "dolar_compra": 5.6,
          "quantidade_solicitada": 20,
          "valor_produto": 600,
          "quantidade_recebida": 0,
          "createdAt": "2022-08-03T18:50:39.000Z",
          "updatedAt": "2022-08-03T18:50:39.000Z",
          "deletedAt": null,
          "fornecedor": {
              "id": 1,
              "nome": "Mega",
              "createdAt": "2022-07-27T19:54:16.000Z",
              "updatedAt": "2022-07-27T19:54:16.000Z",
              "deletedAt": null
          },
          "freteiro": {
              "id": 1,
              "nome": "Hoeliton",
              "createdAt": "2022-06-28T06:31:25.000Z",
              "updatedAt": "2022-07-06T02:32:03.000Z",
              "deletedAt": null
          },
          "estoques": [],
          "produto": {
              "id": 11,
              "marca": "Xiaomi",
              "modelo": "Note 11",
              "cor": "Azul",
              "capacidade": "128 GB",
              "ram": "6 RAM",
              "createdAt": "2022-07-08T20:55:20.000Z",
              "updatedAt": "2022-07-26T19:04:12.000Z",
              "deletedAt": null
          },
          "taxa_transporte_produto": {
              "id": 11,
              "freteiro_id": 1,
              "produto_id": 11,
              "taxa": "0.05",
              "createdAt": "2022-06-30T19:15:03.000Z",
              "updatedAt": "2022-06-30T19:15:03.000Z",
              "deletedAt": null
          }
      }
  ]
}