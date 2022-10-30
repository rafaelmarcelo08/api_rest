import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { resolve } from 'path';

import './src/database';
import cors from 'cors';

import tokenRoutes from './src/routes/tokenRoutes';
import userRoutes from './src/routes/userRoutes';
import alunoRoutes from './src/routes/alunoRoutes';
import fotosRoutes from './src/routes/fotoRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({
      extended: true,
    }));

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/fotos', fotosRoutes);
  }
}

export default new App().app;
