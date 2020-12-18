import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import DepartmentController from './app/controllers/DepartmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/user/new_user', UserController.storeNewUser);
routes.post('/user/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/user/update', UserController.update);

// Rotas para cada departamento
routes.post('/department/store', DepartmentController.store);

export default routes;
