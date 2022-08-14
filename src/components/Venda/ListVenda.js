import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import { CircularProgress } from '@mui/material';


import { client } from "../../services";
import Toast from "../Toast/Toast";

import {
  TICKET_DELETED,
  TICKET_ERROR,
} from '../../constants/Messages'

import './styles.scss';

export default function ListVenda() {
  const history = useNavigate();
  const [cliente, setEstoque] = useState([])
  const [requesting, setRequesting] = useState(true)
  
  useEffect(() => {
    async function loadAll() {
      try {
        let cliente = (await client.get("/api/cliente"));
        cliente = cliente.data
        setEstoque(cliente);
      } catch (error) {
        console.error(error)
      }
      finally {
        setRequesting(false)
      }
    }
    loadAll()
  }, [])

  return (
    <React.Fragment>
      <div className='content'>
        {requesting ? <CircularProgress /> :
          <div style={{
            height: 400, 
            width: '100%', 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignContent: 'flex-start',
            marginTop:'20px',
          }}>
            {cliente.map((item) => {
              return <Paper
              elevation={3} 
                sx={{
                  p: 2,
                  marginRight: '20px',
                  maxWidth: '180px',
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
                onClick={() => {
                  history(`/vendas/${item.id}`);
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <IconButton color="success" >
                      <LocalMallSharpIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={4} sm container>
                    <Grid item xs container direction="column">
                      <Grid item xs>
                        <Typography variant="overline" component="div">
                          {item.nome}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            })}
          </div>

        }
      </div>
    </React.Fragment>
  );
}
