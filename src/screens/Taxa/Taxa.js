import React from 'react';
import { Container } from '@mui/material';

import './styles.scss';
import ProdutoScrean from '../../components/Taxa/Taxa';

const Taxa = ()=> (
  <div className='screen login'>
    <Container maxWidth='xl'>
      <ProdutoScrean/>
    </Container>
  </div>
);

export default Taxa;
