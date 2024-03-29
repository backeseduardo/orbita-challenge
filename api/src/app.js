import './bootstrap';

import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import Youch from 'youch';

import 'express-async-errors';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.expectionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());

    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'uploads', 'files'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  expectionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
