import { Router } from 'express';
import {
  accountController,
  getMeController,
  loginController,
  registerController,
} from '~/controllers/users.controllers';
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares';

const usersRoutes = Router();

usersRoutes.get('/account', accountController);

usersRoutes.get('/getMe', getMeController);

usersRoutes.post('/login', loginValidator, loginController);

usersRoutes.post('/register', registerValidator, registerController);

export default usersRoutes;
