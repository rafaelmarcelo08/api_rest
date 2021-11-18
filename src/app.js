import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import { resolve } from 'path';

import './database';
import tokenRoutes from './routes/tokenRoutes';
import userRoutes from './routes/userRoutes';
import alunoRoutes from './routes/alunoRoutes';
import fotosRoutes from './routes/fotoRoutes';

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
