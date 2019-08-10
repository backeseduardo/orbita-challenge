import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import validateSessionStore from './app/validations/SessionStore';
import validateUserStore from './app/validations/UserStore';
import validateUserUpdate from './app/validations/UserUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

/**
 * Every route bellow will need auth token
 */
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', validateUserUpdate, UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
