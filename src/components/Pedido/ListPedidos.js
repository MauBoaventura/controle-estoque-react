import React, { useEffect, useState } from 'react';
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
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { toast } from 'react-toastify';

import Title from './Title';

import { CircularProgress } from '@mui/material';
import { client } from "../../services";
import Toast from "../Toast/Toast";

import { TICKET_DELETED, TICKET_ERROR } from '../../constants/Messages'

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

export default function ListPedidos() {
  const history = useNavigate();
  const [pedidos, setPedidos] = useState([])
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
        toast.error(
          <Toast
            type='error'
            title='Pedido'
            text={TICKET_ERROR}
          />
        );
      }
      setPedidos((r) => r.filter((x) => pedido.id !== x.id));
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
        `${params.row.fornecedor?.nome || ''}`
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
      field: 'quantidade_recebida',
      cellClassName: verificaQuantidadeRecebida,
      headerName: 'Quantidade Recebida',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 170,
      valueGetter: (params) =>
        `${params.row.quantidade_recebida || '0'}`,
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
    {
      field: 'comissao',
      cellClassName: verificaQuantidadeRecebida,
      headerName: 'Comissão',
      sortable: false,
      width: 170,
      valueGetter: (params) =>
        `R$ ${parseFloat(params.row.valor_produto * params.row.dolar_compra * params.row.quantidade_solicitada * (params.row?.taxa_transporte_produto?.taxa??0.05)).toFixed(2) || ''}`,
    },
    {
      field: 'total_frete',
      cellClassName: verificaQuantidadeRecebida,
      headerName: 'Frete',
      sortable: false,
      width: 170,
      valueGetter: (params) =>
        `R$ ${parseFloat(20).toFixed(2) || ''}`,
    },
    {
      field: 'actions',
      cellClassName: verificaQuantidadeRecebida,
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
        let pedidos = (await client.get("/api/pedido"));
        pedidos = pedidos.data
        pedidos = pedidos.map((pedido => {
          return {
            ...pedido,
            data_pedido: moment(pedido.data_pedido.slice(0, 10)).format("DD-MM-YYYY")
          }
        }))
        setPedidos(pedidos);
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
    history("/pedidos/criar");

  };
  const handleCloseAndEdit = () => {
    history("/");

  };
  const handleCloseAndDelete = () => {
    history("/pedidos");
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
          <MenuItem onClick={handleCloseAndNew}>Novo</MenuItem>
          <MenuItem onClick={handleCloseAndEdit}>Editar</MenuItem>
          <MenuItem onClick={handleCloseAndDelete}>Deletar</MenuItem>
        </Menu>
      </div>
      <Title>
      </Title>
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
              rows={pedidos}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        }
      </div>
    </React.Fragment>
  );
}
