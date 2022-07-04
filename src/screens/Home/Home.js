import React from 'react';
import { Container } from '@mui/material';

import './styles.scss';
import Dashboard from '../../components/Dashboard/Dashboar';

const Home = ()=> (
  <div className='screen login'>
    <Container maxWidth='xl'>
      <Dashboard></Dashboard>
    </Container>
  </div>
);

export default Home;
