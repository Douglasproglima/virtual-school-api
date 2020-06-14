//import dotenv from 'dotenv';
import { resolve } from 'path';

import './database';
//dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
//import delay from 'express-delay';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import studentRoutes from './routes/studentRoutes';
import photoRoutes from './routes/PhotoRoutes';

const whiteList = [
    'http://api-escola-virtual.douglasproglima.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002'
];

const corsOptions = {
  origin: function (origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors(corsOptions));
    //this.app.use(cors());
    this.app.use(helmet());
    //this.app.use(delay(1000)); //Apenas para teste. remover em produção
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    //this.app.use(express.static(resolve(__dirname, 'uploads')));
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/students/', studentRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

export default new App().app;
