import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import { client } from "../../services";

import Row from '../Row/Row';
import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar';
import { useEffect } from 'react';


function descendingComparator(a, b, orderBy) {
  if (b[0][orderBy] < a[0][orderBy]) {
    return -1;
  }
  if (b[0][orderBy] > a[0][orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  console.log(array)
  console.log(stabilizedThis)
  // console.log(groupBy([...stabilizedThis].reduce((acc, item) => ({
  //   ...acc,
  //   [item[0]]: [...(acc[item[0]] ?? []), item],
  // }), {}), 'nota'))
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'nota',
    numeric: false,
    disablePadding: true,
    label: 'Nota',
  },
  {
    id: 'data_pedido',
    numeric: false,
    disablePadding: true,
    label: 'Data',
  },
  {
    id: 'fornecedor_id',
    numeric: false,
    disablePadding: true,
    label: 'Fornecedor',
  },
  {
    id: 'freteiro_id',
    numeric: false,
    disablePadding: true,
    label: 'Freteiro',
  },
  {
    id: 'dolar_compra',
    numeric: true,
    disablePadding: true,
    label: 'Dolar ($)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: true,
    label: 'Total (R$)',
  },
];


export default function EnhancedTable(props) {
  const history = useNavigate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense,] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadAll() {
      try {
        let pedidos = (await client.get("/api/pedidobynota"));
        pedidos = pedidos.data
        setRows(Object.keys(pedidos).map(key => {
          return pedidos[key];
        }))
      } catch (error) {
        console.error(error)
      }
      // finally {
      //   setRequesting(false)
      // }
    }
    loadAll()
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} title={'Pedido'} onClickAdd={() => { history("/pedidos/criar") }} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <Row rows={[...row]} labelId={labelId} />
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
