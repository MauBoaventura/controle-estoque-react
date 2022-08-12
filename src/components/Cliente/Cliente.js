import * as React from 'react';
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ListCliente from './ListCliente';
import EditClientes from './EditClientes';


function ClienteContent(props) {
  const { id } = useParams();

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Recent ListCliente */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {id ? <EditClientes id={id} /> : <ListCliente />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function Cliente(props) {
  return <ClienteContent {...props} />;
}