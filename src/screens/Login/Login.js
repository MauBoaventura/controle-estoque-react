import React from 'react';
import { Container } from '@mui/material';

// import LoginForm from '../../components/LoginForm/LoginForm';
// import Loader from '../../components/Loader/Loader';


import './styles.scss';
// import { BackgroundLogin } from '../../components/styleguide/svg/illustrations/BackgroundLogin';

const LoginScreen = ()=> (
  <div className='screen login'>
    <Container maxWidth='xl'>
      <main>
        <div className='form-content'>
          <div className='login-title'>asadasfagsadfhsgfadgrahetsjrydhfngdfbzvdsfhdsjyd
            {/* <Logo secondary /> */}
          </div>
          <div className='login-form'>
            <div className='login-form-title'>Entrar</div>
            {/* <LoginForm /> */}
            {/* <Loader /> */}
          </div>
        </div>
      </main>

      <div className='login-bg'>
        {/* <BackgroundLogin /> */}
      </div>
    </Container>
  </div>
);

export default LoginScreen;
