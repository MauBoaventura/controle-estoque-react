import React from 'react';
import Router from './components/Router/Router';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router />
        <ToastContainer hideProgressBar/>
      </LocalizationProvider>
    </div>
  );
}

export default App;
