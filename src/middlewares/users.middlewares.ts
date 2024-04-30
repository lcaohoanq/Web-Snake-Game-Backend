import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatus';
import { REQUEST_MESSAGE, USERS_MESSAGE } from '~/constants/messages';
import { isMatchPasswordAndConfirmPassword } from '~/controllers/users.controllers';
import { LoginReqBody, RegisterReqBody } from '~/models/requests/User.requests';

import { REGEX_PASSWORD, REGEX_USERNAME } from '~/utils/regex';
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as LoginReqBody;
  if (!username || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: REQUEST_MESSAGE.INVALID_ATTRIBUTE,
    });
  }
  next();
};

export const registerValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username, password, confirmPassword } = req.body as RegisterReqBody;
  if (!username || !password || !confirmPassword) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: REQUEST_MESSAGE.INVALID_ATTRIBUTE,
    });
  }

  if (!isMatchPasswordAndConfirmPassword(password, confirmPassword)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: USERS_MESSAGE.PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH,
    });
  }

  // validate register account
  if (!REGEX_USERNAME.test(username)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: USERS_MESSAGE.USERNAME_RULE,
    });
  }

  if (!REGEX_PASSWORD.test(password)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).send({
      message: USERS_MESSAGE.PASSWORD_RULE,
    });
  }

  // if success
  next();
};
