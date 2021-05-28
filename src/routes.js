import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import DepartmentController from './app/controllers/DepartmentController';
import ServiceController from './app/controllers/ServiceController';
import MaterialController from './app/controllers/MaterialController';
import MaterialItemController from './app/controllers/MaterialItemController';

import authMiddleware from './app/middlewares/auth';
import managerAuthMiddleware from './app/middlewares/managerAuth';

const routes = new Router();

routes.post('/user/new_user', UserController.storeNewUser);
routes.post('/user/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/user/update', UserController.update);
routes.get('/user/list', UserController.index);

// Rotas para cada departamento
routes.post('/department/store', DepartmentController.store);
routes.get(
  '/department/index',
  managerAuthMiddleware,
  DepartmentController.index
);

// Rotas para serviços
routes.post('/service/store', ServiceController.store);
routes.get('/service/index', ServiceController.index);
routes.post('/service/listUserServices', ServiceController.listUserServices);

// Rotas para materiais
// routes.use(managerAuthMiddleware);
routes.get('/material/index', MaterialController.index);
routes.post('/material/store', MaterialController.store);

routes.get('/material_item/index', MaterialItemController.index);
routes.post('/material_item/store', MaterialItemController.store);

export default routes;
