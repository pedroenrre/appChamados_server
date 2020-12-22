import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import DepartmentController from './app/controllers/DepartmentController';
import ServiceController from './app/controllers/ServiceController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/user/new_user', UserController.storeNewUser);
routes.post('/user/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/user/update', UserController.update);
routes.get('/user/list', UserController.index);

// Rotas para cada departamento
routes.post('/department/store', DepartmentController.store);
routes.get('/department/index', DepartmentController.index);

// Rotas para serviços
routes.post('/service/store', ServiceController.store);

export default routes;
