import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { CircularProgress } from '@mui/material';

import { toast } from 'react-toastify';

import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar';

import { client } from "../../services";
import Toast from "../Toast/Toast";

import {
  TICKET_DELETED, 
  TICKET_ERROR, 
} from '../../constants/Messages'

import './styles.scss';

const moment = require('moment')

export default function ListVenda({id}) {
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
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'data_venda',
      headerName: 'Data Pedido',
      type: 'date',
      width: 130,
    },
    {
      field: 'fornecedor_nome', headerName: 'Fornecedor', width: 130,
      valueGetter: (params) =>
        `${params.row.cliente_final?.nome || ''}`
    },
    {
      field: 'Produto',
      headerName: 'Produto',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 360,
      valueGetter: (params) =>
        `${params.row.produto?.marca || ''} ${params.row.produto?.modelo || ''} ${params.row.produto?.capacidade || ''} ${params.row.produto?.cor || ''} ${params.row.produto?.ram || ''}`,
    },
    {
      field: 'valor_venda',
      headerName: 'Preço venda',
      width: '120',
      valueGetter: (params) =>
        `R$ ${(params.row.estoque.valor_venda) || '0'}`,
    },
    {
      field: 'valor_desconto',
      headerName: 'Desconto',
      width: '120',
      valueGetter: (params) =>
        `R$ ${(params.row.valor_desconto) || '0'}`,
    },
    {
      headerName: 'Total',
      width: '120',
      valueGetter: (params) =>
        `R$ ${(params.row.estoque.valor_venda - params.row.valor_desconto) || '0'}`,
    },
    // {
    //   field: 'valor_compra',
    //   headerName: 'Preço compra',
    //   width: 120,
    //   valueGetter: (params) =>
    //     `R$ ${(params.row.dolar_compra * params.row.valor_produto).toFixed(2) || ''}`,
    // },
    // {
    //   field: 'total_nota',
    //   headerName: 'Total em reais',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 120,
    //   valueGetter: (params) =>
    //     `R$ ${parseFloat(params.row.valor_produto * params.row.dolar_compra * params.row.quantidade_solicitada).toFixed(2) || ''}`,
    // },
    // {
    //   field: 'total_frete',
    //   headerName: 'Frete',
    //   sortable: false,
    //   width: 100,
    //   valueGetter: (params) =>
    //     `R$ ${parseFloat(20).toFixed(2) || ''}`,
    // },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   width: 80,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={<DeleteIcon />}
    //       label="Delete"
    //       onClick={() => { handelDeleteRow(params) }}
    //     />,
    //     // <GridActionsCellItem
    //     //   icon={<SecurityIcon />}
    //     //   label="Toggle Admin"
    //     //   onClick={() => { }}
    //     //   showInMenu
    //     // />,
    //     // <GridActionsCellItem
    //     //   icon={<FileCopyIcon />}
    //     //   label="Duplicate User"
    //     //   onClick={() => { }}
    //     //   showInMenu
    //     // />,
    //   ],
    // },
  ];


  useEffect(() => {
    async function loadAll() {
      try {
        console.log(id)
        let cliente = (await client.get(`/api/venda/?cliente_final_id=${id}`));
        cliente = cliente.data
        cliente = cliente.map((cliente => {
          return {
            ...cliente,
            data_venda: moment(cliente.data_recebimento?.slice(0, 10)).format("DD-MM-YYYY")
          }
        }))
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
        <EnhancedTableToolbar title={'Pedido'} onClickAdd={() => { history("/vendas/criar") }} />

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
              {`ID: ${clienteRow?.id ?? '-'}`}
              <br />
              {`${clienteRow?.pedidos_fornecedor?.produto?.marca || ''} ${clienteRow?.pedidos_fornecedor?.produto?.modelo || ''} ${clienteRow?.pedidos_fornecedor?.produto?.cor || ''} ${clienteRow?.pedidos_fornecedor?.produto?.ram || ''}`} 
              <br />
              {`Data: ${clienteRow?.data_recebimento ?? '-'}`}
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
              rows={cliente}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableMultipleSelection={true}
              disableSelectionOnClick
              // rowHeight={30}
              experimentalFeatures={{ newEditingApi: true }}
              // processRowUpdate={processRowUpdate}
            />
          </div>
        }
      </div>
    </React.Fragment>
  );
}
