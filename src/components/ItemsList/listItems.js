import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href='/pedidos'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Pedidos" />
    </ListItemButton>
    <ListItemButton href='/vendas'>
      <ListItemIcon>
        <StoreSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Venda" />
    </ListItemButton>
    <ListItemButton href='/produtos'>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Produtos" />
    </ListItemButton>
    <ListItemButton href='/lancamentopreco'>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Lançamento" />
    </ListItemButton>
    <ListItemButton href='/freteiros'>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Freteiros" />
    </ListItemButton>
    <ListItemButton href='/fornecedores'>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Fornecedores" />
    </ListItemButton>
    <ListItemButton href='/taxas'>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Taxas" />
    </ListItemButton>
    <ListItemButton href='/estoque'>
      <ListItemIcon>
        <SettingsCellIcon />
      </ListItemIcon>
      <ListItemText primary="Estoque" />
    </ListItemButton>
    <ListItemButton href='/estoqueresumido'>
      <ListItemIcon>
        <SystemSecurityUpdateGoodIcon />
      </ListItemIcon>
      <ListItemText primary="Estoque Resumido" />
    </ListItemButton>
    <ListItemButton href='/clientes'>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Relátorio Detalhado
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Último mês" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Última semana" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Sei lá" />
    </ListItemButton>
  </React.Fragment>
);