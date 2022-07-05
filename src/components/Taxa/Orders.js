import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { client } from "../../services";

const moment = require('moment')

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
        let pedidos = (await client.get("/api/produto"));
        pedidos = pedidos.data
        pedidos = pedidos.map((pedido => {
          return {
            ...pedido,
            data_pedido: moment(pedido.data_pedido).format("DD-MM-YYYY")
          }
        }))

        setPedidos(pedidos);
      } catch (error) {
        console.error(error)
      }
    }
    loadAll()
  }, [])

  return (
    <React.Fragment>
      <Title>Todos Produtos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Cor</TableCell>
            <TableCell>Capacidade</TableCell>
            <TableCell>RAM</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {
            pedidos.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.modelo}</TableCell>
                <TableCell>{row.cor}</TableCell>
                <TableCell>{row.capacidade}</TableCell>
                <TableCell>{row.ram??"-"}</TableCell>
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