import React, { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import './styles.scss';
import VendasDetalhes from '../../components/VendasDetalhes/VendasDetalhes.js';

import AppBar from '../../components/AppBar/AppBar';
import Drawer from '../../components/Drawer/Drawer';

const mdTheme = createTheme();
const drawerWidth = 240;

const Vendas = () => {
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
        <VendasDetalhes />
      </Box>
    </ThemeProvider>
  )
}

export default Vendas;


