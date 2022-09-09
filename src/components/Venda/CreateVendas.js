/*eslint-disable */
import React, { useCallback, useEffect, useState } from 'react';
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

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';

import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar';

import Toast from '../Toast/Toast';

import { client } from "../../services";


import {
  TICKET_CREATED,
  TICKET_ERROR,
  REQUIRED_FIELD,
} from '../../constants/Messages';
import { Input, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const moment = require('moment')

function isEmpty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
export default
  function CreatePedidos() {
  const { id } = useParams();
  const history = useNavigate();
  const [opt, setOpt] = useState([])
  const [produtos, setProdutos] = useState([])
  const [listProdutos, setListProdutos] = useState([])
  const [codBarra, setCodBarra] = useState([])
  const [estoqueRow, setEstoqueRow] = useState({})
  const [openDialogDevolution, setOpenDialogDevolution] = useState(false)

  const [requesting, setRequesting] = useState(false);
  const initialValues = {
    "data_pedido": new Date().toJSON().slice(0, 10)
  }

  const validationSchema = Yup.object().shape({
    // nota: Yup.string().required(REQUIRED_FIELD)
  });

  const onSubmit = async (formValues) => {
    console.log(formValues)
    console.log(listProdutos)
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

  const pesquisaApaga = async (e) => {
    if (e.key === "Enter") {
      let dado = (await client.get(`/api/vendabycod?cod=${e.target.value}`));
      if (isEmpty(dado.data)) {
        toast(
          <Toast
            type='error'
            title='Produto'
            text={'Produto não consta em estoque'}
          />
        );
        setCodBarra('');
        return;
      }
      setCodBarra('');
      handleAddRow(dado.data)
    }
  }

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
        await client.put("/api/estoquelimpaconsulta");
      } catch (error) {
        console.error(error)
      }
    }
    loadAll()
  }, [])

  const columns = [
    {
      field: 'Produto',
      headerName: 'Produto',
      sortable: false,
      width: 260,
      valueGetter: (params) =>
        `${params.row.label}`,
    },
    {
      field: 'valor_venda',
      headerName: 'Valor Venda',
      sortable: false,
      width: 260,
      valueGetter: (params) =>
        `${params.row.valor_venda}`,
    }, {
      field: 'desconto',
      headerName: 'Desconto',
      sortable: false,
      editable: true,
      type: 'number',
      width: 260,
      valueGetter: (params) =>
        `${params.row.desconto}`,
    },
    {
      field: 'valor_final',
      headerName: 'Total',
      sortable: false,
      width: 260,
      valueGetter: (params) =>
        `${params.row.valor_venda - params.row.desconto}`,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => { handelDeleteRow(params) }}
        />,
      ],
    },
  ];

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

  const handleAddRow = (product) => {
    setListProdutos([...listProdutos, {
      ...product,
      label: `${product.pedidos_fornecedor.produto.marca || ''} ${product.pedidos_fornecedor.produto.modelo || ''} ${product.pedidos_fornecedor.produto.cor || ''} ${product.pedidos_fornecedor.produto.ram || ''}`,
      desconto: 0
    }]);
  }

  const processRowUpdate = useCallback(
    async (rowEdited, rowOldValues) => {
      try {
        if (rowEdited.desconto < 0) {
          toast(
            <Toast
              type='error'
              title='Desconto'
              text={'Desconto negativo'}
            />
          );
          return rowOldValues;
        }
        if (rowEdited.desconto > rowEdited.valor_venda) {
          toast(
            <Toast
              type='error'
              title='Desconto'
              text={'Desconto maior que o valor do produto'}
            />
          );
          return rowOldValues;
        }
        setListProdutos((produtos) => {
          return produtos.map(produto => {
            console.log(produto)
            console.log(rowEdited.id)
            if (produto.id === rowEdited.id) {
              return { ...produto, desconto: rowEdited.desconto }
            }
            return produto
          })
      });
        return rowEdited;

      } catch (error) {
        toast(
          <Toast
            type='error'
            title='Pedido'
            // text={TICKET_UPDATE_ERROR}
          />
        );
      }

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Dialog 
  const handleDeleteClose = () => {
    setOpenDialogDevolution(false);
  };

  const handelDeleteRow = (params) => {
    setEstoqueRow(params.row)
    setOpenDialogDevolution(true);
  }

  const handleConfirmeDelete = async () => {
    try {
      let resposta = (await client.put("/api/estoque/" + estoqueRow.id, { status_consulta: false }));

      if (resposta.status === 200) {
        toast(
          <Toast
            type='success'
            title='Produto'
            text={`Produto removido da venda`}
          />
        );
      }
      else {
        toast(
          <Toast
            type='error'
            title='Produto'
            text={`Ocorreu um erro`}
          />
        );
      }
      setListProdutos((r) => r.filter((x) => estoqueRow.id !== x.id));
      setEstoqueRow({});
    } catch (error) {
      console.error(error)
    }
    setOpenDialogDevolution(false);
  };
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
                  </Typography>
                  <Divider />
                  <Box sx={{ width: '100%', marginTop: 1 }}>
                    <Input value={codBarra} placeholder='Código de barra' onChange={(value) => setCodBarra(value.target.value)} onKeyDown={pesquisaApaga}></Input>
                    <Stack direction="row" spacing={2}>
                      <Button size="small" onClick={pesquisaApaga}>
                        Pesquisar
                      </Button>
                    </Stack>
                    <Box sx={{ height: 400, mt: 1 }}>
                      <DataGrid
                        rows={listProdutos}
                        columns={columns}
                        pageSize={100}
                        disableMultipleSelection={true}
                        disableSelectionOnClick
                        // rowHeight={30}
                        experimentalFeatures={{ newEditingApi: true }}
                        processRowUpdate={processRowUpdate}
                      />
                    </Box>
                  </Box>
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
      <Dialog
          open={openDialogDevolution}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Deseja realmente apagar?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`ID: ${estoqueRow?.id ?? '-'}`}
              <br />
              {`${estoqueRow?.pedidos_fornecedor?.produto?.marca || ''} ${estoqueRow?.pedidos_fornecedor?.produto?.modelo || ''} ${estoqueRow?.pedidos_fornecedor?.produto?.cor || ''} ${estoqueRow?.pedidos_fornecedor?.produto?.ram || ''}`} 
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Cancelar</Button>
            <Button onClick={handleConfirmeDelete} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}