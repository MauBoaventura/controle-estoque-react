import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';// import { observer } from 'mobx-react';

import Login from '../../screens/Login/Login';
import Home from '../../screens/Home/Home';
import Produto from '../../screens/Produto/Produto';
import Pedido from '../../screens/Pedido/Pedido';
import PedidoCreate from '../../screens/PedidoCreate/PedidoCreate';
import Fornecedor from '../../screens/Fornecedor/Fornecedor';
import Freteiro from '../../screens/Freteiro/Freteiro';
import Taxa from '../../screens/Taxa/Taxa';
import Estoque from '../../screens/Estoque/Estoque.js';
import EstoqueResumido from '../../screens/EstoqueResumido/EstoqueResumido.js';

const Routerr = () => {

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/produtos' element={<Produto />} />
          <Route path='pedidos'  >
            <Route path='' element={<Pedido />} />
            <Route path='criar' element={<PedidoCreate />} />
            <Route path=':id/editar' element={<Pedido />} />
          </Route>
          <Route path='/fornecedores' element={<Fornecedor />} />
          <Route path='/freteiros' element={<Freteiro />} />
          <Route path='/taxas' element={<Taxa />} />
          <Route path='/estoque' element={<Estoque />} />
          <Route path='/estoqueresumido' element={<EstoqueResumido />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default (Routerr);
// export default observer(Router);
