import axios from "axios";

export const client = axios.create({
  baseURL: process.env.NODE_ENV !== 'production'?'http://192.168.0.12:3001':'https://controlevendas.mauboa.com.br',
  headers: {
    "Content-Type": "application/json"
  }
});