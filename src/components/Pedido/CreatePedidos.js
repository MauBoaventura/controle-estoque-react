/*eslint-disable */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";
import { parseISO } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Toast from '../Toast/Toast';
import { toast } from 'react-toastify';


import { client } from "../../services";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  TICKET_CREATED,
  TICKET_ERROR,
  REQUIRED_FIELD,
} from '../../constants/Messages';

const moment = require('moment')

export default
  function CreatePedidos() {
  const history = useNavigate();
  // const [pedido, setPedido] = useState([])
  const [freteiros, setFreteiros] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [produtos, setProdutos] = useState([])
  const [taxas, setTaxas] = useState([])

  const [requesting, setRequesting] = useState(false);
  const [initialValues, setInitialValues] = useState({
    "data_pedido": new Date().toJSON().slice(0, 10),
    // "lote": 1,
    // "produto_id": 1,
    // "total_recebido": 0,
    "taxa": 0,
  });

  const validationSchema = Yup.object().shape({
    lote: Yup.string().required(REQUIRED_FIELD)
  });

  const onSubmit = async (formValues) => {
    try {
      setRequesting(true)
      if (true) {
        delete formValues['taxa']
        let pedidos = (await client.post("/api/pedido/", formValues));

        if (pedidos.status === 201) {
          toast(
            <Toast
              type='success'
              title='Pedido'
              text={TICKET_CREATED}
            />
          );
          history("/pedidos");
        }
        else {
          toast.error(
            <Toast
              type='error'
              title='Pedido'
              text={TICKET_ERROR}
            />
          );
          history("/pedidos");
        }
      }
    } catch (error) {
      console.error(error)
    }
    finally {
      setRequesting(false)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    async function loadAll() {
      //Carrega lista de freteiro
      try {
        let lastpedido = (await client.get("/api/lastpedido"));
        lastpedido = lastpedido.data
        setInitialValues({ ...initialValues, 'lote': lastpedido + 1 });
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

      //Carrega taxas de produtos
      try {
        let taxas = (await client.get("/api/taxa/"));
        // taxas = taxas.data.map((item) => ({ label: `${item.marca || ''} ${item.modelo || ''} ${item.cor || ''} ${item.ram || ''}`, id: item.id }))
        setTaxas(taxas);
      } catch (error) {
        console.error(error)
      }
    }
    loadAll()
  }, [])

  useEffect(() => {
    async function load() {
      if (formik.values.produto_id && formik.values.freteiro_id) {
        try {
          let taxa = (await client.get(`/api/taxa/?freteiro_id=${formik.values.freteiro_id}&produto_id=${formik.values.produto_id}`));
          if (taxa.status === 200) {
            taxa = taxa.data.taxa
            console.log(taxa * 100)
            formik.setFieldValue("taxa", (taxa * 100).toFixed(2) ?? 5, true)
          } else {
            formik.setFieldValue("taxa", (taxa * 100).toFixed(2) ?? 5, true)
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        formik.setFieldValue("taxa", 0, true)
      }
    }
    load()
  }, [formik.values.produto_id, formik.values.freteiro_id])


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndNew = () => {
    history("/pedidos/criar");

  };
  const handleCloseAndEdit = () => {
    history("/");

  };
  const handleCloseAndDelete = () => {
    history("/pedidos");
  };

  useEffect(() => {
    formik.validateForm();
  }, []);
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
          <MenuItem onClick={handleCloseAndNew}>Novo</MenuItem>
          <MenuItem onClick={handleCloseAndEdit}>Editar</MenuItem>
          <MenuItem onClick={handleCloseAndDelete}>Deletar</MenuItem>
        </Menu>
      </div>
      <form className='form' onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex' }}>
          <DatePicker
            id='data_pedido'
            name='data_pedido'
            label="Data do pedido"
            onChange={(value) => {
              console.log(value)
              formik.setFieldValue("data_pedido", moment(value).format("YYYY-MM-DD"), true)
            }}
            value={parseISO(moment(formik.values.data_pedido).format("YYYY-MM-DD"))}
            inputFormat="dd/MM/yyyy"
            fullWidth
            renderInput={(params) => (
              <TextField
                variant='outlined'
                fullWidth
                autoComplete='on'
                className='form-field'
                error={Boolean(formik.touched.data_pedido && formik.errors.data_pedido)}
                helperText={formik.touched.data_pedido && formik.errors.data_pedido}
                label="Data Pedido"
                margin="dense"
                name="data_pedido"
                sx={{ width: 200 }}
                {...params}
              />
            )}
          />
          <TextField
            style={{ marginLeft: '10px' }}
            id='lote'
            name='lote'
            label="Lote"
            variant='outlined'
            fullWidth
            autoComplete='on'
            className='form-field'
            onChange={formik.handleChange}
            value={formik.values.lote}
            error={!!formik.errors.lote && formik.touched.lote}
            helperText={formik.touched.lote && formik.errors.lote}
            disabled={requesting}
            type="number"
            margin='dense'
            sx={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: 0 }
            }}
          />

        </div>
        <div style={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            id='fornecedor_id'
            name='fornecedor_id'
            options={fornecedores}
            sx={{ width: 200 }}
            onChange={(e, value) => {
              console.log(value);
              formik.setFieldValue(
                "fornecedor_id",
                value !== null ? value.id : initialValues.fornecedor_id
              );
            }}
            renderInput={(params) =>
              <TextField {...params}
                margin='dense'
                label="Fornecedor"
                variant='outlined'
                fullWidth
                autoComplete='on'
                className='form-field'
                onChange={(e, value) => formik.setFieldValue("fornecedor_id", value)}
                value={formik.values.fornecedor_id}
                error={!!formik.errors.fornecedor_id && formik.touched.fornecedor_id}
                helperText={formik.touched.fornecedor_id && formik.errors.fornecedor_id}
                disabled={requesting}
                sx={{ width: 200 }}
              />}
          />
        </div>
        <div style={{ display: 'flex', marginTop: '20px' }}>

          <TextField
            id='dolar_compra'
            name='dolar_compra'
            label="Dólar compra"
            variant='outlined'
            fullWidth
            autoComplete='on'
            className='form-field'
            onChange={formik.handleChange}
            value={formik.values.dolar_compra}
            error={!!formik.errors.dolar_compra && formik.touched.dolar_compra}
            helperText={formik.touched.dolar_compra && formik.errors.dolar_compra}
            disabled={requesting}
            type="number"
            margin='dense'
            sx={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <Autocomplete
            style={{ marginRight: '10px' }}
            disablePortal
            id='produto_id'
            name='produto_id'
            options={produtos}
            sx={{ width: 200 }}
            onChange={(e, value) => {
              console.log(value);
              formik.setFieldValue(
                "produto_id",
                value !== null ? value.id : initialValues.produto_id
              );
            }}
            renderInput={(params) =>
              <TextField {...params}
                margin='dense'
                label="Produto"
                variant='outlined'
                fullWidth
                autoComplete='on'
                className='form-field'
                onChange={(e, value) => formik.setFieldValue("produto_id", value)}
                value={formik.values.produto_id}
                error={!!formik.errors.produto_id && formik.touched.produto_id}
                helperText={formik.touched.produto_id && formik.errors.produto_id}
                disabled={requesting}
                sx={{ width: 200 }}
              />}
          />
          <TextField
            style={{ marginRight: '10px' }}
            id='valor_produto'
            name='valor_produto'
            label="Valor unitário"
            variant='outlined'
            fullWidth
            autoComplete='on'
            className='form-field'
            onChange={formik.handleChange}
            value={formik.values.valor_produto}
            error={!!formik.errors.valor_produto && formik.touched.valor_produto}
            helperText={formik.touched.valor_produto && formik.errors.valor_produto}
            disabled={requesting}
            type="number"
            margin='dense'
            sx={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Autocomplete
            style={{ marginRight: '10px' }}
            disablePortal
            id='freteiro_id'
            name='freteiro_id'
            options={freteiros}
            sx={{ width: 200 }}
            onChange={(e, value) => {
              console.log(value);
              formik.setFieldValue(
                "freteiro_id",
                value !== null ? value.id : initialValues.freteiro_id
              );
            }}
            renderInput={(params) =>
              <TextField {...params}
                margin='dense'
                label="Freteiro"
                variant='outlined'
                fullWidth
                autoComplete='on'
                className='form-field'
                onChange={(e, value) => formik.setFieldValue("freteiro_id", value)}
                value={formik.values.freteiro_id}
                error={!!formik.errors.freteiro_id && formik.touched.freteiro_id}
                helperText={formik.touched.freteiro_id && formik.errors.freteiro_id}
                disabled={requesting}
                sx={{ width: 200 }}
              />}
          />
          <TextField
            style={{ marginRight: '10px' }}
            id='quantidade_solicitada'
            name='quantidade_solicitada'
            label="Quantidade solicitada"
            variant='outlined'
            fullWidth
            autoComplete='on'
            className='form-field'
            onChange={formik.handleChange}
            value={formik.values.quantidade_solicitada}
            error={!!formik.errors.quantidade_solicitada && formik.touched.quantidade_solicitada}
            helperText={formik.touched.quantidade_solicitada && formik.errors.quantidade_solicitada}
            disabled={requesting}
            type="number"
            margin='dense'
            sx={{ width: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: 0 }
            }}
          />
          <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined" >
            <InputLabel htmlFor="outlined-adornment-taxa">Taxa</InputLabel>
            <OutlinedInput
              style={{ marginRight: '10px' }}
              id='taxa'
              name='taxa'
              label="Taxa"
              variant='outlined'
              fullWidth
              autoComplete='on'
              className='form-field'
              onChange={formik.handleChange}
              value={formik.values.taxa}
              error={!!formik.errors.taxa && formik.touched.taxa}
              helpertext={formik.touched.taxa && formik.errors.taxa}
              endAdornment={<InputAdornment position="start">%</InputAdornment>}
              disabled={true}
              type="number"
              margin='dense'
              sx={{ width: 100 }}
            />
          </FormControl>
        </div>
        <Button variant="contained" color="success" type='submit'>
          Salvar
        </Button>
      </form>
    </React.Fragment>
  );
}