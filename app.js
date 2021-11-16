import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

import './src/database';
import tokenRoutes from './src/routes/tokenRoutes';
import userRoutes from './src/routes/userRoutes';
import alunoRoutes from './src/routes/alunoRoutes';

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
  }

  routes() {
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/alunos', alunoRoutes);
  }
}

export default new App().app;
