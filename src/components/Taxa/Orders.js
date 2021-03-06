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
  const [taxa, setTaxa] = useState([])
  useEffect(() => {
    async function loadAll() {
      try {
        let taxa = (await client.get("/api/taxa"));

        setTaxa(taxa.data);
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
            <TableCell>Freteiro</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell>Taxa %</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {
            taxa.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.freteiro?.nome}</TableCell>
                <TableCell>{`${row.produto?.marca || ''} ${row.produto?.modelo || ''} ${row.produto?.cor || ''} ${row.produto?.ram || ''}`}</TableCell>
                <TableCell>{(row.taxa*100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}