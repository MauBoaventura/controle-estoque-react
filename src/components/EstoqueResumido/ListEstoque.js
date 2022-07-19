import React, { useEffect, useState, useCallback } from 'react';
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

const moment = require('moment')
const isActiveColor = true

const verificaQuantidadeRecebida = (params) => {
  if (isActiveColor) {
    if (params.row.quantidade_recebida === params.row.quantidade_solicitada)
      return 'recebido'
    else if (params.row.quantidade_recebida > 0)
      return 'faltando'
    else
      return 'nenhum'
  }
}

export default function ListEstoque() {
  const history = useNavigate();
  const [estoque, setEstoque] = useState([])
  const [pedido, setPedido] = useState({})
  const [requesting, setRequesting] = useState(true)
  const [openDialogDelete, setOpenDialogDelete] = useState(false)

  // Dialog 
  const handleDeleteClose = () => {
    setOpenDialogDelete(false);
  };

  const handleConfirmeDelete = async () => {
    try {
      let resposta = (await client.delete("/api/pedido/" + pedido.id));

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
      setEstoque((r) => r.filter((x) => pedido.id !== x.id));
      setPedido({});
    } catch (error) {
      console.error(error)
    }
    setOpenDialogDelete(false);
  };

  const handelDeleteRow = (params) => {
    setOpenDialogDelete(true);
    setPedido(params.row)
  }

  const columns = [
    {
      field: 'id',
      cellClassName: verificaQuantidadeRecebida,
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'data_recebimento',
      headerName: 'Data Recebimento',
      type: 'date',
      width: 150,
    },
    {
      field: 'lote',
      headerName: 'Lote',
      width: 70,
      valueGetter: (params) =>
        `${params.row.pedidos_fornecedor.lote || ''}`,
    },
    {
      field: 'Produto',
      headerName: 'Produto',
      width: 260,
      valueGetter: (params) =>
        `${params.row.pedidos_fornecedor.produto?.marca || ''} ${params.row.pedidos_fornecedor.produto?.modelo || ''} ${params.row.pedidos_fornecedor.produto?.cor || ''} ${params.row.pedidos_fornecedor.produto?.ram || ''}`,
    },
    {
      field: 'valor_produto',
      headerName: 'Preço Compra',
      width: '120',
      valueGetter: (params) =>
        `R$ ${(params.row.pedidos_fornecedor.valor_produto * params.row.pedidos_fornecedor.dolar_compra).toFixed(2) || ''}`,
    },
    {
      field: 'valor_venda',
      headerName: 'Preço Venda',
      width: 120,
      editable: true,
      valueGetter: (params) =>
        `R$ ${params.row.valor_venda || '0'}`,
    },
    {
      field: 'desconto',
      headerName: 'Desconto',
      width: 120,
      valueGetter: (params) =>
        `R$ ${params.row.desconto || '0'}`,
    },
    {
      field: 'total_produtos_em_estoque',
      headerName: 'Total em estoque',
      width: 120,
      valueGetter: (params) =>
        `${params.row.total_produtos_em_estoque || '0'} uni`,
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
        let estoque = (await client.get("/api/estoque?group=true"));
        estoque = estoque.data
        estoque = estoque.map((estoque => {
          return {
            ...estoque,
            data_recebimento: moment(estoque.data_recebimento?.slice(0, 10)).format("DD-MM-YYYY")
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
              title='Pedido'
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
              title='Pedido'
              text={TICKET_QUNT_2_ERROR}
            />
          );
          return rowOldValues;
        }
        delete rowEdited['data_pedido']

        // let response = (await client.put("/api/pedido/" + rowEdited.id, rowEdited)).data;
        // response = {
        //   ...response,
        //   data_pedido: moment(pedido.data_pedido?.slice(0, 10)).format("DD-MM-YYYY")
        // }
        toast(
          <Toast
            type='success'
            title='Pedido'
            text={TICKET_UPDATE}
          />
        );
        // return response;
        return rowEdited;
      } catch (error) {
        toast(
          <Toast
            type='error'
            title='Pedido'
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
      <div className='list-estoque'>
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
      </div>

      <div className='content'>
        <Dialog
          open={openDialogDelete}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Deseja realmente apagar?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`ID: ${pedido?.id ?? '-'}`}
              <br />
              {`Lote: ${pedido?.lote ?? '-'}`}
              <br />
              {`Fornecedor: ${pedido?.fornecedor?.nome ?? '-'}`}
              <br />
              {`Data: ${pedido?.data_pedido ?? '-'}`}
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
