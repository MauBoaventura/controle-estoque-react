import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { client } from "../../services";

import Row from '../Row/Row';
import EnhancedTableHead from '../EnhancedTableHead/EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar/EnhancedTableToolbar';
import { useEffect } from 'react';

const moment = require('moment');

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    pedido: [
      {
        produto: 'IPhone 13',
        valor_unitario: '1000,00',
        quantidade_solicitada: 3,
        frete: 0.15,
        transporte: 20,
        total: 300,
      },
      {
        produto: 'IPhone 12',
        valor_unitario: '100,00',
        quantidade_solicitada: 30,
        frete: 0.15,
        transporte: 20,
        total: 30000,
      },
      {
        produto: 'IPhone 11',
        valor_unitario: '1000,00',
        quantidade_solicitada: 3,
        frete: 555,
        transporte: 200,
        total: 300,
      },
    ],
  };
}

// const rows = [
//   createData('01/07/2022', 1 , 'Hoeliton', '5,56', '124320,26'),
//   createData('02/07/2022', 2 , 'Hoeliton', '5,56', '124320,26'),
//   createData('03/07/2022', 3 , 'Hoeliton', '5,56', '124320,26'),
//   createData('04/07/2022', 4 , 'Hoeliton', '5,56', '124320,26'),
//   createData('05/07/2022', 5 , 'Hoeliton', '5,56', '124320,26'),
//   createData('06/07/2022', 6 , 'Hoeliton', '5,56', '124320,26'),
//   createData('07/07/2022', 7 , 'Hoeliton', '5,56', '124320,26'),
//   createData('08/07/2022', 8 , 'Hoeliton', '5,56', '124320,26'),
//   createData('09/07/2022', 9 , 'Hoeliton', '5,56', '124320,26'),
//   createData('10/07/2022', 10 , 'Hoeliton', '5,56', '124320,26'),
//   createData('11/07/2022', 11 , 'Hoeliton', '5,56', '124320,26'),
//   createData('12/07/2022', 12 , 'Hoeliton', '5,56', '124320,26'),
//   createData('13/07/2022', 13 , 'Hoeliton', '5,56', '124320,26'),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'calories',
    numeric: false,
    disablePadding: true,
    label: 'Nota',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Data',
  },
  {
    id: 'fornecedor',
    numeric: false,
    disablePadding: true,
    label: 'Fornecedor',
  },
  {
    id: 'fat',
    numeric: false,
    disablePadding: true,
    label: 'Freteiro',
  },
  {
    id: 'carbs',
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
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadAll() {
      try {
        let pedidos = (await client.get("/api/pedidobynota"));
        pedidos = pedidos.data
        setRows(Object.keys(pedidos).map(key => {
          return pedidos[key];
        }))
        // setRows(pedidos);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} title={'Pedido'}  onClickAdd={()=>{history("/pedidos/criar")}}/>
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
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Row key={row.name} row={row} labelId={labelId} />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
