import React from 'react';
import { Container } from '@mui/material';

import './styles.scss';
import ProdutoScrean from '../../components/Produto/Produto';

const Produto = ()=> (
  <div className='screen login'>
    <Container maxWidth='xl'>
      <ProdutoScrean/>
    </Container>
  </div>
);

export default Produto;
