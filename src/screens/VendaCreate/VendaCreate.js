import React, { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import './styles.scss';
import VendaScrean from '../../components/Venda/CreateVendas';

import AppBar from '../../components/AppBar/AppBar';
import Drawer from '../../components/Drawer/Drawer';

const mdTheme = createTheme();
const drawerWidth = 240;

const VendaCreate = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar title='Vendas' toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} open={open} />
        <Drawer toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} open={open} />
        <VendaScrean />
      </Box>
    </ThemeProvider>
  )
}

export default VendaCreate;


