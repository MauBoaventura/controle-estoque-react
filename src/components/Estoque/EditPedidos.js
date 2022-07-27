import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import { client } from "../../services";

const moment = require('moment')



export default function EditPedidos({ id }) {
  const [, setPedido] = useState([])
  const [freteiros, setFreteiros] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [produtos, setProdutos] = useState([])
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
useEffect(() => {
    async function loadAll() {
      //Carrega o pedido
      try {
        let pedidos = (await client.get("/api/pedido/" + id));
        pedidos = pedidos.data
        pedidos = {
          ...pedidos,
          data_pedido: moment(pedidos.data_pedido).format("DD-MM-YYYY")
        }
        setPedido(pedidos);
      } catch (error) {
        console.error(error)
      }

      //Carrega lista de freteiro
      try {
        let freteiros = (await client.get("/api/freteiro/"));
        freteiros = freteiros.data.map((item, i) => ({ label: item.nome, id: item.id }))
        setFreteiros(freteiros);
      } catch (error) {
        console.error(error)
      }

      //Carrega lista de fornecedores
      try {
        let fornecedores = (await client.get("/api/fornecedor/"));
        fornecedores = fornecedores.data.map((item, i) => ({ label: item.nome, id: item.id }))
        setFornecedores(fornecedores);
      } catch (error) {
        console.error(error)
      }

      //Carrega lista de produtos
      try {
        let produtos = (await client.get("/api/produto/"));
        produtos = produtos.data.map((item) => ({ label: `${item.marca || ''} ${item.modelo || ''} ${item.cor || ''} ${item.ram || ''}`, id: item.id }))
        setProdutos(produtos);
      } catch (error) {
        console.error(error)
      }
    }
    loadAll()
  }, [id])

  

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
      <TextField
        id="outlined-number"
        label="Nota"
        type="number"
        margin='dense'
        sx={{ width: 300 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div style={{ display: 'flex' }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={fornecedores}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField margin='dense' {...params} label="Fornecedor" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={freteiros}
          marg
          sx={{ width: 300 }}
          renderInput={(params) => <TextField margin='dense' {...params} label="Freteiro" />}
        />
      </div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={produtos}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField margin='dense' {...params} label="Produto" />}
      />

    </React.Fragment>
  );
}

