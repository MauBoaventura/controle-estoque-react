import React, { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import './styles.scss';
import ClienteScrean from '../../components/Cliente/Cliente';

import AppBar from '../../components/AppBar/AppBar';
import Drawer from '../../components/Drawer/Drawer';

const mdTheme = createTheme();
const drawerWidth = 240;

const Cliente = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar title='Clientes' toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} open={open} />
        <Drawer toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} open={open} />
        <ClienteScrean />
      </Box>
    </ThemeProvider>
  )
}

export default Cliente;


