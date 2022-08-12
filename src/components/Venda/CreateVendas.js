/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Toast from '../Toast/Toast';

import { client } from "../../services";


import {
  TICKET_CREATED,
  TICKET_ERROR,
  REQUIRED_FIELD,
} from '../../constants/Messages';

const moment = require('moment')

export default
  function CreatePedidos() {
  const history = useNavigate();
  const [freteiros, setFreteiros] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [produtos, setProdutos] = useState([])
  const [listProdutos, setListProdutos] = useState([])

  const [requesting, setRequesting] = useState(false);
  const [initialValues, setInitialValues] = useState({
    "data_pedido": new Date().toJSON().slice(0, 10),
    "taxa": 0,
    "produtos": [],
  });

  const validationSchema = Yup.object().shape({
    nota: Yup.string().required(REQUIRED_FIELD)
  });

  const onSubmit = async (formValues) => {
    try {
      setRequesting(true)
      if (true) {
        delete formValues['taxa']
        let vendas = (await client.post("/api/pedido/", formValues));

        if (vendas.status === 201) {
          toast(
            <Toast
              type='success'
              title='Pedido'
              text={TICKET_CREATED}
            />
          );
          history("/vendas");
        }
        else {
          toast(
            <Toast
              type='error'
              title='Pedido'
              text={TICKET_ERROR}
            />
          );
          history("/vendas");
        }
      }
    } catch (error) {
      toast(
        <Toast
          type='error'
          title='Pedido'
          text={TICKET_ERROR}
        />
      );
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
        setInitialValues({ ...initialValues, 'nota': lastpedido + 1 });
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

      setListProdutos([0])
    }
    loadAll()
  }, [])

  useEffect(() => {
    async function load() {
      formik.values.produtos.map(async (produto, index) => {
        if (produto.produto_id && produto.freteiro_id) {
          try {
            let taxa = (await client.get(`/api/taxa/?freteiro_id=${produto.freteiro_id}&produto_id=${produto.produto_id}`));
            if (taxa.status === 200) {
              taxa = taxa.data.taxa
              formik.setFieldValue(`produtos.${index}.taxa`, (taxa * 100).toFixed(2), true)
            } else {
              formik.setFieldValue(`produtos.${index}.taxa`, (5).toFixed(2), true)
            }
          } catch (error) {
            formik.setFieldValue(`produtos.${index}.taxa`, 0, true)
          }
        }
      })
    }
    if (formik.values.produtos.length !== 0)
      load()
  }, [...formik.values.produtos])


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndNew = () => {
    history("/vendas/criar");

  };
  const handleCloseAndEdit = () => {
    history("/");

  };
  const handleCloseAndDelete = () => {
    history("/vendas");
  };

  useEffect(() => {
    formik.validateForm();
  }, []);

  const addProduto = () => {
    setListProdutos([...listProdutos, 2]);
  }
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
        <div className='form-row'>
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
            renderInput={(params) => (
              <TextField
                variant='outlined'

                autoComplete='on'
                className='form-field'
                error={Boolean(formik.touched.data_pedido && formik.errors.data_pedido)}
                helperText={formik.touched.data_pedido && formik.errors.data_pedido}
                label="Data Pedido"
                margin="dense"
                name="data_pedido"
                sx={{ minWidth: 200 }}
                {...params}
              />
            )}
          />
          <TextField
            id='nota'
            name='nota'
            label="Nota"
            variant='outlined'

            autoComplete='on'
            className='margin-l'
            onChange={formik.handleChange}
            value={formik.values.nota}
            error={!!formik.errors.nota && formik.touched.nota}
            helperText={formik.touched.nota && formik.errors.nota}
            disabled={requesting}
            type="number"
            margin='dense'
            sx={{ minWidth: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: 0 }
            }}
          />

        </div>
        <div className='form-row'>
          <Autocomplete
            disablePortal
            id='fornecedor_id'
            name='fornecedor_id'
            options={fornecedores}
            sx={{ minWidth: 200 }}
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

                autoComplete='on'
                className='form-field'
                onChange={(e, value) => formik.setFieldValue("fornecedor_id", value)}
                value={formik.values.fornecedor_id}
                error={!!formik.errors.fornecedor_id && formik.touched.fornecedor_id}
                helperText={formik.touched.fornecedor_id && formik.errors.fornecedor_id}
                disabled={requesting}
                sx={{ minWidth: 200 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />}
          />
        </div>
        <div className='form-row'>
          <TextField
            id='dolar_compra'
            name='dolar_compra'
            label="Dólar compra"
            variant='outlined'

            autoComplete='on'
            className='form-field'
            onChange={formik.handleChange}
            value={formik.values.dolar_compra}
            error={!!formik.errors.dolar_compra && formik.touched.dolar_compra}
            helperText={formik.touched.dolar_compra && formik.errors.dolar_compra}
            disabled={requesting}
            type="number"
            margin='dense'
            sx={{ minWidth: 200 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Typography gutterBottom variant="h6" component="div" marginTop={1}>
          Produto
          <IconButton color="success" onClick={addProduto}>
            <AddShoppingCartIcon />
          </IconButton>
        </Typography>
        <Divider />
        {
          listProdutos.map((item, index) => (
            <>
              <div className='form-row'>
                <Autocomplete
                  id={`produtos.${index}.produto_id`}
                  name={`produtos.${index}.produto_id`}
                  options={produtos}
                  sx={{ minWidth: 200 }}
                  onChange={(e, value) => {
                    console.log(value);
                    formik.setFieldValue(
                      `produtos.${index}.produto_id`,
                      value !== null ? value.id : initialValues.produto_id
                    );
                  }}
                  renderInput={(params) =>
                    <TextField {...params}
                      margin='dense'
                      label="Produto"
                      variant='outlined'
                      autoComplete='on'
                      className='form-field'
                      onChange={(e, value) => formik.setFieldValue(`produtos.${index}.produto_id`, value)}
                      value={formik.values.produto_id}
                      error={!!formik.errors.produto_id && formik.touched.produto_id}
                      helperText={formik.touched.produto_id && formik.errors.produto_id}
                      disabled={requesting}
                      sx={{ minWidth: 200 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                />
                <TextField
                  className='margin-l'
                  id={`produtos.${index}.valor_produto`}
                  name={`produtos.${index}.valor_produto`}
                  label="Valor unitário"
                  variant='outlined'
                  autoComplete='on'
                  onChange={formik.handleChange}
                  value={formik.values.valor_produto}
                  error={!!formik.errors.valor_produto && formik.touched.valor_produto}
                  helperText={formik.touched.valor_produto && formik.errors.valor_produto}
                  disabled={requesting}
                  type="number"
                  margin='dense'
                  sx={{ minWidth: 200 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Autocomplete
                  className='margin-l'
                  disablePortal
                  id={`produtos.${index}.freteiro_id`}
                  name={`produtos.${index}.freteiro_id`}
                  options={freteiros}
                  sx={{ minWidth: 200 }}
                  onChange={(e, value) => {
                    console.log(value);
                    formik.setFieldValue(
                      `produtos.${index}.freteiro_id`,
                      value !== null ? value.id : initialValues.freteiro_id
                    );
                  }}
                  renderInput={(params) =>
                    <TextField {...params}
                      margin='dense'
                      label="Freteiro"
                      variant='outlined'
                      autoComplete='on'
                      className='form-field'
                      onChange={(e, value) => formik.setFieldValue(`produtos.${index}.freteiro_id`, value)}
                      value={formik.values.freteiro_id}
                      error={!!formik.errors.freteiro_id && formik.touched.freteiro_id}
                      helperText={formik.touched.freteiro_id && formik.errors.freteiro_id}
                      disabled={requesting}
                      sx={{ minWidth: 200 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />}
                />
                <TextField
                  className='margin-l'
                  id={`produtos.${index}.quantidade_solicitada`}
                  name={`produtos.${index}.quantidade_solicitada`}
                  label="Quantidade solicitada"
                  variant='outlined'
                  autoComplete='on'
                  onChange={formik.handleChange}
                  value={formik.values.quantidade_solicitada}
                  error={!!formik.errors.quantidade_solicitada && formik.touched.quantidade_solicitada}
                  helperText={formik.touched.quantidade_solicitada && formik.errors.quantidade_solicitada}
                  disabled={requesting}
                  type="number"
                  margin='dense'
                  sx={{ minWidth: 200 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
                <TextField
                  className='margin-l'
                  id={`produtos.${index}.taxa`}
                  name={`produtos.${index}.taxa`}
                  label="Taxa"
                  variant='outlined'
                  autoComplete='on'
                  value={formik.values.produtos[index]?.taxa}
                  disabled={true}
                  type="number"
                  margin='dense'
                  sx={{ minWidth: 200 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                    inputProps: { min: 0 }
                  }}
                />
              </div>
              <Divider />
            </>

          ))
        }
        <div className='form-row'>
          <Button className='margin-t' variant="contained" color="success" type='submit'>
            Salvar
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}