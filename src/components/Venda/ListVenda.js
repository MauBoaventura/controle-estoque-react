import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogActions from '@mui/material/DialogActions';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';



import { toast } from 'react-toastify';


import { CircularProgress } from '@mui/material';
import { client } from "../../services";
import Toast from "../Toast/Toast";

import {
  TICKET_DELETED,
  TICKET_ERROR,
} from '../../constants/Messages'

import './styles.scss';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ListVenda() {
  const history = useNavigate();
  const [cliente, setEstoque] = useState([])
  const [clienteRow, setEstoqueRow] = useState({})
  const [requesting, setRequesting] = useState(true)
  const [openDialogDevolution, setOpenDialogDevolution] = useState(false)

  // Dialog 
  const handleDeleteClose = () => {
    setOpenDialogDevolution(false);
  };

  const handleConfirmeDelete = async () => {
    try {
      let resposta = (await client.delete("/api/cliente/" + clienteRow.id));

      if (resposta.status === 200) {
        toast(
          <Toast
            type='success'
            title='Venda'
            text={TICKET_DELETED}
          />
        );
      }
      else {
        toast(
          <Toast
            type='error'
            title='Venda'
            text={TICKET_ERROR}
          />
        );
      }
      setEstoque((r) => r.filter((x) => clienteRow.id !== x.id));
      setEstoqueRow({});
    } catch (error) {
      console.error(error)
    }
    setOpenDialogDevolution(false);
  };

  const columns = [
    {
      field: 'id',
      // cellClassName: verificaQuantidadeRecebida,
      headerName: '',
      width: 50,
    },
    {
      field: 'nome',
      headerName: 'Nome do Venda',
      // type: 'date',
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ShoppingCartCheckoutSharpIcon />}
          label="Delete"
          onClick={() => {
            history(`/vendas/${params.row.id}`);
          }}
        />,
        // <GridActionsCellItem
        //   icon={<SecurityIcon />}
        //   label="Toggle Admin"
        //   onClick={() => { }}
        //   showInMenu
        // />,
        // <GridActionsCellItem
        //   icon={<FileCopyIcon />}
        //   label="Duplicate User"
        //   onClick={() => { }}
        //   showInMenu
        // />,
      ],
    },
  ];


  useEffect(() => {
    async function loadAll() {
      try {
        let cliente = (await client.get("/api/cliente"));
        cliente = cliente.data
        setEstoque(cliente);
      } catch (error) {
        console.error(error)
      }
      finally {
        setRequesting(false)
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
    // history("/");
  };
  const handleCloseAndNew = () => {
    history("/cliente/criar");

  };
  const handleCloseAndEdit = () => {
    history("/");

  };
  const handleCloseAndDelete = () => {
    history("/cliente");
  };

  // Edit row 
  // const processRowUpdate = useCallback(
  //   async (rowEdited, rowOldValues) => {
  //     try {
  //       // Quantidade recebida maior que a solicitada
  //       if (rowEdited.quantidade_recebida > rowOldValues.quantidade_solicitada) {
  //         toast(
  //           <Toast
  //             type='error'
  //             title='cliente'
  //             text={TICKET_QUNT_1_ERROR}
  //           />
  //         );
  //         return rowOldValues;
  //       }

  //       // Quantidade recebida menor que a pré-existente
  //       if (rowEdited.quantidade_recebida < rowOldValues.quantidade_recebida) {
  //         toast(
  //           <Toast
  //             type='error'
  //             title='cliente'
  //             text={TICKET_QUNT_2_ERROR}
  //           />
  //         );
  //         return rowOldValues;
  //       }
  //       delete rowEdited['data_recebimento']

  //       let desconto = rowEdited.desconto
  //       if (typeof desconto === 'string' || desconto instanceof String) {
  //         desconto = rowEdited.desconto.replace('R', '').replace('$', '').replace(' ', '')
  //       }

  //       let response = (await client.put("/api/cliente/" + rowEdited.id, {desconto})).data;
  //       console.log(response)
  //       // response = {
  //       //   ...response,
  //       //   data_cliente: moment(cliente.data_cliente?.slice(0, 10)).format("DD-MM-YYYY")
  //       // }
  //       toast(
  //         <Toast
  //           type='success'
  //           title='cliente'
  //           text={TICKET_UPDATE}
  //         />
  //       );
  //       // return response;
  //       // return rowEdited;
  //       return { ...rowEdited, desconto  };

  //     } catch (error) {
  //       toast(
  //         <Toast
  //           type='error'
  //           title='cliente'
  //           text={TICKET_UPDATE_ERROR}
  //         />
  //       );
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [],
  // );

  return (
    <React.Fragment>
      <div className='list-cliente'>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size='large'
        >
          Vendas
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

      <div className='content'>
        {requesting ? <CircularProgress /> :
          <div style={{
            height: 400, 
            width: '100%', 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignContent: 'flex-start',
          }}>
            {/* <DataGrid
              rows={cliente}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableMultipleSelection={true}
              disableSelectionOnClick
              // rowHeight={30}
              experimentalFeatures={{ newEditingApi: true }}
              // processRowUpdate={processRowUpdate}
            /> */}
            {cliente.map((item) => {
              return <Paper
              elevation={3} 
                sx={{
                  p: 2,
                  marginRight: '20px',
                  maxWidth: 250,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
                onClick={() => {
                  history(`/vendas/${item.id}`);
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <IconButton color="success" >
                      <LocalMallSharpIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4} sm container>
                    <Grid item xs container direction="column">
                      <Grid item xs>
                        <Typography variant="overline" component="div">
                          {item.nome}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            })}
          </div>

        }
      </div>
    </React.Fragment>
  );
}
