/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar';

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
  const { id } = useParams();
  const history = useNavigate();
  const [opt, setOpt] = useState([])
  const [produtos, setProdutos] = useState([])
  const [listProdutos, setListProdutos] = useState([])

  const [requesting, setRequesting] = useState(false);
  const [initialValues, setInitialValues] = useState({
    "data_pedido": new Date().toJSON().slice(0, 10),
    "opt": [],
    "produtos": [],
  });

  const validationSchema = Yup.object().shape({
    // nota: Yup.string().required(REQUIRED_FIELD)
  });

  const onSubmit = async (formValues) => {
    console.log(formValues)
    try {
      setRequesting(true)
      if (false) {
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

      //Carrega lista de produtos
      try {
        let produtos = (await client.get("/api/estoque?group=true&by_nota=true"));
        produtos = produtos.data
        produtos = produtos.map((item => {
          return {
            ...item,
            produto_id: item.pedidos_fornecedor.produto.id,
            label: `${item.pedidos_fornecedor.produto.marca || ''} ${item.pedidos_fornecedor.produto.modelo || ''} ${item.pedidos_fornecedor.produto.cor || ''} ${item.pedidos_fornecedor.produto.ram || ''}`,
            data_recebimento: moment(item.data_recebimento?.slice(0, 10)).format("DD-MM-YYYY"),
            opt: Array.from({ length: item.total_produtos_em_estoque }, (_, i) => i + 1)

          }
        }))
        console.log(produtos)
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
      // console.log(formik.values)
      // formik.values.produtos.map(async (produto, index) => {
      //   if (produto.produto_id) {
      //     try {
      //       formik.setFieldValue(`produtos.${index}.quantidade`, produtos[produto.id].opt, true)
      //       setOpt(produtos[produto.id].opt)
      //     } catch (error) {
      //       formik.setFieldValue(`produtos.${index}.quantidade`, 0, true)
      //     }
      //   }
      // })
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
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Recent ListVenda */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <div>
                  <EnhancedTableToolbar title={'Venda'} onClickAdd={() => { history(`/`) }} />
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
                              setOpt((v=[])=>{
                                v.splice(index, 0, value?.opt);
                                return v; 
                              });
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
                          <Autocomplete
                            className='margin-l'
                            disablePortal
                            id={`produtos.${index}.quantidade`}
                            name={`produtos.${index}.quantidade`}
                            options={opt[index]??['loading...']}
                            sx={{ minWidth: 200 }}
                            onChange={(e, value) => {
                              console.log(value);
                              console.log(value > 0 ? value : initialValues.quantidade);
                              formik.setFieldValue(
                                `produtos.${index}.quantidade`,
                                value > 0 ? value : initialValues.quantidade
                              );
                            }}
                            renderInput={(params) =>
                              <TextField {...params}
                                margin='dense'
                                label="Quantidade"
                                variant='outlined'
                                autoComplete='on'
                                className='form-field'
                                onChange={(e, value) => formik.setFieldValue(`produtos.${index}.quantidade`, value)}
                                value={formik.values.quantidade}
                                error={!!formik.errors.quantidade && formik.touched.quantidade}
                                helperText={formik.touched.quantidade && formik.errors.quantidade}
                                disabled={requesting}
                                sx={{ minWidth: 200 }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />}
                          />
                          <TextField
                            className='margin-l'
                            id={`produtos.${index}.desconto`}
                            name={`produtos.${index}.desconto`}
                            label="Desconto"
                            variant='outlined'
                            autoComplete='on'
                            onChange={formik.handleChange}
                            value={formik.values.desconto}
                            error={!!formik.errors.desconto && formik.touched.desconto}
                            helperText={formik.touched.desconto && formik.errors.desconto}
                            disabled={requesting}
                            type="number"
                            margin='dense'
                            sx={{ minWidth: 200 }}
                            InputLabelProps={{
                              shrink: true,
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
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </React.Fragment>
  );
}