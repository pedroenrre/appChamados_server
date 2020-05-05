import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/user/new_user', UserController.storeNewUser);

export default routes;
