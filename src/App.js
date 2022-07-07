import React from 'react';
import Router from './components/Router/Router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from "@mui/lab/AdapterDateFns";


function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router />
      </LocalizationProvider>
    </div>
  );
}

export default App;
