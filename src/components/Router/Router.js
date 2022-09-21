import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';// import { observer } from 'mobx-react';

import Login from '../../screens/Login/Login';
import Home from '../../screens/Home/Home';
import Produto from '../../screens/Produto/Produto';
import ProdutoCreate from '../../screens/ProdutoCreate/ProdutoCreate';
import Pedido from '../../screens/Pedido/Pedido';
import PedidoCreate from '../../screens/PedidoCreate/PedidoCreate';
import Fornecedor from '../../screens/Fornecedor/Fornecedor';
import Freteiro from '../../screens/Freteiro/Freteiro';
import Taxa from '../../screens/Taxa/Taxa';
import Estoque from '../../screens/Estoque/Estoque.js';
import EstoqueResumido from '../../screens/EstoqueResumido/EstoqueResumido.js';
import Clientes from '../../screens/Cliente/Cliente.js';
import Vendas from '../../screens/Vendas/Vendas.js';
import VendasDetalhes from '../../screens/VendasDetalhes/VendasDetalhes.js';
import VendaCreate from '../../screens/VendaCreate/VendaCreate.js';
import LancamentoPreco from '../../screens/LancamentoPreco/LancamentoPreco.js';

const Routerr = () => {

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='pedidos'  >
            <Route path='' element={<Pedido />} />
            <Route path='criar' element={<PedidoCreate />} />
            <Route path=':id/editar' element={<Pedido />} />
          </Route>
          <Route path='produtos'  >
            <Route path='' element={<Produto />} />
            <Route path='criar' element={<ProdutoCreate />} />
            <Route path=':id/editar' element={<Produto />} />
          </Route>
          <Route path='/fornecedores' element={<Fornecedor />} />
          <Route path='/freteiros' element={<Freteiro />} />
          <Route path='/taxas' element={<Taxa />} />
          <Route path='/estoque' element={<Estoque />} />
          <Route path='/estoqueresumido' element={<EstoqueResumido />} />
          <Route path='/lancamentopreco' element={<LancamentoPreco />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='vendas'  >
            <Route path='' element={<Vendas />} />
            <Route path=':id/criar' element={<VendaCreate />} />
            <Route path=':id' element={<VendasDetalhes />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default (Routerr);
// export default observer(Router);
