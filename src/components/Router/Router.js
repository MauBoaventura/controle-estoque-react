import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';// import { observer } from 'mobx-react';

// import Campaign from '../../screens/Campaign/Campaign';
// import CampaignDetail from '../../screens/CampaignDetail/CampaignDetail';
// import Register from '../../screens/Register/Register';
// import Recovery from '../../screens/Recovery/Recovery';
// import ConfirmRecovery from '../../screens/ConfirmRecovery/ConfirmRecovery';
// import CreateCampaign from '../../screens/CreateCampaign/CreateCampaign';
// import EditCampaign from '../../screens/EditCampaign/EditCampaign';
// import UserInfo from '../../screens/UserInfo/UserInfo';
// import InfluencerDetail from '../../screens/InfluencerDetail/InfluencerDetail';
// import EditUserInfo from '../../screens/EditUserInfo/EditUserInfo';
// import Influencers from '../../screens/Influencers';
// import CreateInfluencer from '../../screens/CreateInfluencer/CreateInfluencer';
// import EditInfluencer from '../../screens/EditInfluencer/EditInfluencer';
// import FormCampaign from '../../screens/FormCampaign';
// import CampaignMonitoring from '../../screens/CampaignMonitoring/CampaignMonitoring';
import Login from '../../screens/Login/Login';
import Home from '../../screens/Home/Home';
// import Screen404 from '../../screens/Screen404/Screen404';

// import { useStore } from '../../hooks';

// import { Header } from '../styleguide';
// import Invite from '../../screens/Invite/Invite';
// import InstagramCallback from '../../screens/InstagramCallback';

const Routerr = () => {
  // const store = useStore();

  // if (store.authStore.fetchingUser) return null;

  return (
    <BrowserRouter>
      <div className='App'>
        {/* <ul>
          <li> <Link to='/'>Home</Link> </li>
          <li> <Link to='/about'>Pedido</Link> </li>
          <li> <Link to='/user/meunome'>Fornecedor</Link> </li>
        </ul> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<h1>Not Found</h1>} />
          <Route path='user/:name' element={<Login />} >
            <Route path='edit' element={<h1>Editar perfil</h1>} />
            <Route path='Order' element={<h1>Meus Pedidos</h1>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default (Routerr);
// export default observer(Router);
