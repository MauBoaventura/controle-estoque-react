// import React from 'react';
// import { Container } from '@mui/material';

// import './styles.scss';
// import ProdutoScrean from '../../components/Produto/Produto';

// const Produto = ()=> (
//   <div className='screen login'>
//     <Container maxWidth='xl'>
//       <ProdutoScrean/>
//     </Container>
//   </div>
// );

// export default Produto;

import React, { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import './styles.scss';
import ProdutoScrean from '../../components/Produto/Produto';

import AppBar from '../../components/AppBar/AppBar';
import Drawer from '../../components/Drawer/Drawer';

const mdTheme = createTheme();
const drawerWidth = 240;

const Produto = () => {
      const [open, setOpen] = useState(false);
      const toggleDrawer = () => {
            setOpen(!open);
      };
      return (
            <ThemeProvider theme={mdTheme}>
                  <Box className='pedido' >
                        <CssBaseline />
                        <AppBar title='Produtos' toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} open={open} />
                        <Drawer toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} open={open} />
                        <ProdutoScrean />
                  </Box>
            </ThemeProvider>
      )
}

export default Produto;
