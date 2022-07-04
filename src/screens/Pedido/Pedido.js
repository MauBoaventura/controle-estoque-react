import React from 'react';
import { Container } from '@mui/material';

import './styles.scss';
import PedidoScrean from '../../components/Pedido/Pedido';

const Pedido = ()=> (
  <div className='screen login'>
    <Container maxWidth='xl'>
      <PedidoScrean/>
    </Container>
  </div>
);

export default Pedido;
