import React from 'react';
import { Container } from '@mui/material';

import './styles.scss';
import FornecedorScrean from '../../components/Fornecedor/Fornecedor';

const Fornecedor = ()=> (
  <div className='screen login'>
    <Container maxWidth='xl'>
      <FornecedorScrean/>
    </Container>
  </div>
);

export default Fornecedor;
