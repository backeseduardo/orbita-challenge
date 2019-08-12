import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import InstallationController from './app/controllers/InstallationController';
import StateController from './app/controllers/StateController';

import validateSessionStore from './app/validations/SessionStore';
import validateUserStore from './app/validations/UserStore';
import validateUserUpdate from './app/validations/UserUpdate';
import validateInstallationIndex from './app/validations/InstallationIndex';

import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);
routes.get('/states', StateController.index);

/**
 * Every route bellow will need auth token
 */
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', validateUserUpdate, UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get(
  '/installations',
  validateInstallationIndex,
  InstallationController.index
);
routes.get('/installations/count', InstallationController.indexCount);
routes.get(
  '/installations/most-expensive',
  InstallationController.indexMostExpensive
);
routes.get('/installations/top-months', InstallationController.indexTopMonths);
routes.get(
  '/installations/installed-capacity',
  InstallationController.indexInstalledCapacity
);

export default routes;
