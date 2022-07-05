import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { client } from "../../services";

const moment = require('moment')

const rows = [
  {
    "id": 2,
    "data_pedido": "2022-06-30T00:00:00.000Z",
    "lote": 1,
    "fornecedor_id": 1,
    "dolar_compra": "1.00",
    "quantidade_solicitada": 1,
    "valor_produto": "1.00",
    "quantidade_recebida": 1,
    "produto_id": 1,
    "freteiro_id": 1,
    "total_nota": 1,
    "total_recebido": 0,
    "createdAt": "2022-07-04T05:40:37.000Z",
    "updatedAt": "2022-07-04T05:40:37.000Z",
    "deletedAt": null,
    "fornecedor": {
      "id": 1,
      "nome": "Mega"
    }
  }
];
const verificaQuantidadeRecebida = (params) => {
  if (params.row.quantidade_recebida === 0)
    return 'nenhum'
  else if (params.row.quantidade_recebida === params.row.quantidade_solicitada)
    return 'recebido'
  else return 'faltando'
}
const columns = [
  {
    field: 'id',
    cellClassName: verificaQuantidadeRecebida,
    headerName: 'ID',
    width: 70,
  },
  {
    field: 'data_pedido',
    cellClassName: verificaQuantidadeRecebida,
    headerName: 'Data Pedido',
    type: 'date',
    width: 130,
  },
  {
    field: 'lote',
    cellClassName: verificaQuantidadeRecebida,
    headerName: 'Lote',
    type: 'number',
    width: 90,
  },
  {
    field: 'fornecedor_nome', headerName: 'Fornecedor', width: 130,
    cellClassName: verificaQuantidadeRecebida,
    valueGetter: (params) =>
      `${params.row.fornecedor.nome || ''}`
  },
  {
    field: 'Produto',
    cellClassName: verificaQuantidadeRecebida,
    headerName: 'Produto',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 260,
    valueGetter: (params) =>
      `${params.row.produto?.marca || ''} ${params.row.produto?.modelo || ''} ${params.row.produto?.cor || ''} ${params.row.produto?.ram || ''}`,
  },
  {
    field: 'quantidade_solicitada',
    cellClassName: verificaQuantidadeRecebida,
    headerName: 'Quantidade solicitada',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 170,
    valueGetter: (params) =>
      `${params.row.quantidade_solicitada || ''}`,
  },
  {
    field: 'valor_produto',
    cellClassName: verificaQuantidadeRecebida,
    headerName: 'Valor do produto',
    width: 170,
    valueGetter: (params) =>
      `R$ ${params.row.valor_produto || ''}`,
  },
  {
    field: 'dolar',
    cellClassName: verificaQuantidadeRecebida,
    headerName: 'Dólar',
    width: 70,
    valueGetter: (params) =>
      `$ ${params.row.dolar_compra || ''}`,
  },
  {
    field: 'total_nota',
    cellClassName: verificaQuantidadeRecebida,
    headerName: 'Total em reais',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 170,
    valueGetter: (params) =>
      `R$ ${parseFloat(params.row.valor_produto * params.row.dolar_compra * params.row.quantidade_solicitada).toFixed(2) || ''}`,
  },
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [pedidos, setPedidos] = useState(rows)
  useEffect(() => {
    async function loadAll() {
      try {
        let pedidos = (await client.get("/api/pedido"));
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size='large'
        >
          Todos Pedidos
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Novo</MenuItem>
          <MenuItem onClick={handleClose}>Editar</MenuItem>
          <MenuItem onClick={handleClose}>Deletar</MenuItem>
        </Menu>
      </div>
      <Title>
      </Title>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={pedidos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      {/* <Table size="small">
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
                <TableCell>{row.fornecedor?.nome?row.fornecedor.nome:row.fornecedor_id}</TableCell>
                <TableCell>{row.dolar_compra}</TableCell>
                <TableCell>{row.quantidade_solicitada}</TableCell>
                <TableCell align="right">{`$${row.total_nota}`}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table> */}
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
