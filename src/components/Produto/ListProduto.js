import React, { useEffect, useState , useCallback} from 'react';
import { useNavigate } from "react-router-dom";

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


import { CircularProgress } from '@mui/material';
import { client } from "../../services";
import Toast from "../Toast/Toast";

import {
  TICKET_DELETED, 
  TICKET_ERROR, 
  TICKET_UPDATE, 
  TICKET_UPDATE_ERROR, 
  TICKET_QUNT_1_ERROR, 
  TICKET_QUNT_2_ERROR,
} from '../../constants/Messages'

import './styles.scss';
import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar';

const moment = require('moment')

export default function ListEstoque() {
  const history = useNavigate();
  const [estoque, setEstoque] = useState([])
  const [estoqueRow, setEstoqueRow] = useState({})
  const [requesting, setRequesting] = useState(true)
  const [openDialogDevolution, setOpenDialogDevolution] = useState(false)

  // Dialog 
  const handleDeleteClose = () => {
    setOpenDialogDevolution(false);
  };

  const handleConfirmeDelete = async () => {
    try {
      let resposta = (await client.delete("/api/produto/" + estoqueRow.id));

      if (resposta.status === 200) {
        toast(
          <Toast
            type='success'
            title='Pedido'
            text={TICKET_DELETED}
          />
        );
      }
      else {
        toast(
          <Toast
            type='error'
            title='Pedido'
            text={TICKET_ERROR}
          />
        );
      }
      setEstoque((r) => r.filter((x) => estoqueRow.id !== x.id));
      setEstoqueRow({});
    } catch (error) {
      console.error(error)
    }
    setOpenDialogDevolution(false);
  };

  const handelDeleteRow = (params) => {
    setEstoqueRow(params.row)
    setOpenDialogDevolution(true);
  }

  const columns = [
    {
      field: 'id',
      // cellClassName: verificaQuantidadeRecebida,
      headerName: '',
      width: 50,
    },
    {
      field: 'marca',
      headerName: 'Marca',
      type: 'date',
      width: 150,
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      width: 150,
      },
    {
      field: 'capacidade',
      headerName: 'Capacidade',
      width: 150,
    },
    {
      field: 'cor',
      headerName: 'Cor',
      width: 150,
      },
    {
      field: 'ram',
      headerName: 'RAM',
      width: 150,
      },
    {
      field: 'valor_transporte',
      headerName: 'Valor transporte',
      width: 150,
      },
    {
      headerName: 'Apagar',
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


  useEffect(() => {
    async function loadAll() {
      try {
        let estoque = (await client.get("/api/produto"));
        estoque = estoque.data
        estoque = estoque.map((estoque => {
          return {
            ...estoque,
            // data_recebimento: moment(estoque.data_recebimento?.slice(0, 10)).format("DD-MM-YYYY")
          }
        }))
        setEstoque(estoque);
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
    history("/estoque/criar");

  };
  const handleCloseAndEdit = () => {
    history("/");

  };
  const handleCloseAndDelete = () => {
    history("/estoque");
  };

  // Edit row 
  const processRowUpdate = useCallback(
    async (rowEdited, rowOldValues) => {
      try {
        // Quantidade recebida maior que a solicitada
        if (rowEdited.quantidade_recebida > rowOldValues.quantidade_solicitada) {
          toast(
            <Toast
              type='error'
              title='estoque'
              text={TICKET_QUNT_1_ERROR}
            />
          );
          return rowOldValues;
        }

        // Quantidade recebida menor que a pré-existente
        if (rowEdited.quantidade_recebida < rowOldValues.quantidade_recebida) {
          toast(
            <Toast
              type='error'
              title='estoque'
              text={TICKET_QUNT_2_ERROR}
            />
          );
          return rowOldValues;
        }
        delete rowEdited['data_recebimento']

        // let desconto = rowEdited.desconto
        // if (typeof desconto === 'string' || desconto instanceof String) {
        //   desconto = rowEdited.desconto.replace('R', '').replace('$', '').replace(' ', '')
        // }

        // let response = (await client.put("/api/estoque/" + rowEdited.id, {desconto})).data;
        // console.log(response)
        // response = {
        //   ...response,
        //   data_estoque: moment(estoque.data_estoque?.slice(0, 10)).format("DD-MM-YYYY")
        // }
        toast(
          <Toast
            type='success'
            title='estoque'
            text={TICKET_UPDATE}
          />
        );
        // return response;
        return rowEdited;
        // return { ...rowEdited, desconto  };

      } catch (error) {
        toast(
          <Toast
            type='error'
            title='estoque'
            text={TICKET_UPDATE_ERROR}
          />
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <React.Fragment>
      {/* <div className='list-estoque'>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size='large'
        >
          Estoque
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
      </div> */}
        <EnhancedTableToolbar numSelected={0} title={'Produto'} onClickAdd={() => { history("/produtos/criar") }} />

      <div className='content'>
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
              {`Data: ${estoqueRow?.data_recebimento ?? '-'}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Cancelar</Button>
            <Button onClick={handleConfirmeDelete} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        {requesting ? <CircularProgress /> :
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={estoque}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableMultipleSelection={true}
              disableSelectionOnClick
              // rowHeight={30}
              experimentalFeatures={{ newEditingApi: true }}
              processRowUpdate={processRowUpdate}
            />
          </div>
        }
      </div>
    </React.Fragment>
  );
}