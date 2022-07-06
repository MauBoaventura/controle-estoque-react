import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title/Title';

import { client } from "../../services";

// const moment = require('moment')

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [pedidos, setPedidos] = useState(rows)
  useEffect(() => {
    async function loadAll() {
        try {
            var pedidos = (await client.get("/api/pedido"));
            // const time = moment(pedidos.data.dataVencimentoPedido).format("YYYY-MM-DD");
            // setDataVencimento(time);
          setPedidos(pedidos.data);            
        } catch (error) {
            console.error(error)
        }
    }
    loadAll()
}, [])

  return (
    <React.Fragment>
      <Title>Últimos Pedidos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data pedido</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell>Fornecedor</TableCell>
            <TableCell>Dolar compra</TableCell>
            <TableCell>Quantidade solicitada</TableCell>
            <TableCell align="right">Valor da nota</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          pedidos.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.data_pedido}</TableCell>
              <TableCell>{row.lote}</TableCell>
              <TableCell>{row.fornecedor_id}</TableCell>
              <TableCell>{row.dolar_compra}</TableCell>
              <TableCell>{row.quantidade_solicitada}</TableCell>
              <TableCell align="right">{`$${row.total_nota}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}