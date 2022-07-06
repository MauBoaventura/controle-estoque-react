import React from 'react';
import Router from './components/Router/Router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Router />
      </LocalizationProvider>
    </div>
  );
}

export default App;
