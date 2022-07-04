import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NODE_ENV !== 'production'?'http://localhost:3001':'https://controlevendas.mauboa.com.br',
  headers: {
    "Content-Type": "application/json"
  }
});