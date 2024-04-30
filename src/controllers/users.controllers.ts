import { config } from 'dotenv';
import { Request, Response } from 'express';
import HTTP_STATUS from '~/constants/httpStatus';
import { ERROR_MESSAGE, USERS_MESSAGE } from '~/constants/messages';
import { GetMeReqQuery, LoginReqBody, RegisterReqBody } from '~/models/requests/User.requests';
import { User } from '~/models/schemas/User.schema';
import databaseServices from '~/services/database.services';
import { generateHash, generateSalt } from '~/utils/encrypt';

config();

export const accountController = async (req: Request, res: Response) => {
  try {
    const account = await databaseServices.getAllAccounts();
    return res.status(HTTP_STATUS.OK).send(account);
  } catch (err) {
    console.error(err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};

export const getMeController = async (req: Request, res: Response) => {
  try {
    const { username } = req.query as any as GetMeReqQuery;
    console.log(username);
    const user = await databaseServices.findUserByUsername(username);

    if (!user) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: USERS_MESSAGE.USER_NOT_FOUND });
    }

    return res.status(HTTP_STATUS.OK).json({
      data: user,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
    }
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as LoginReqBody;
    const user = await databaseServices.findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: USERS_MESSAGE.USER_NOT_FOUND });
    }

    const question = isUserHaveSalt(user);
    if (question) {
      const hashedPassword = generateHash(password, user.salt);
      if (user.password !== hashedPassword) {
        return res.status(400).json({ message: USERS_MESSAGE.WRONG_USERNAME_OR_PASSWORD });
      }
    } else {
      if (user.password !== password) {
        return res.status(400).json({ message: USERS_MESSAGE.WRONG_USERNAME_OR_PASSWORD });
      }
    }

    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGE.LOGIN_SUCCESS,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).json({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
    }
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as RegisterReqBody;
    const salt = generateSalt();
    const hashedPassword = generateHash(password, salt);
    console.log(`username ${username}`);
    console.log(`password ${password}`);
    const account = await databaseServices.register({ username, password: hashedPassword, salt });

    return res.json({
      message: USERS_MESSAGE.REGISTER_SUCCESS,
      data: account,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message); // Now you can access err.message safely

      if (err.message === USERS_MESSAGE.ACCOUNT_EXISTS) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: USERS_MESSAGE.ACCOUNT_EXISTS,
        });
      }
    }

    // For any other error, send a 500 response
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const isMatchPasswordAndConfirmPassword = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};

const isUserHaveSalt = (user: User): boolean => {
  return user.salt !== undefined;
};
