export const REQUEST_MESSAGE = {
  INVALID_ATTRIBUTE: 'Invalid attribute',
} as const;

export const USERS_MESSAGE = {
  LOGIN_SUCCESS: 'Login successfully',
  INVALID_USERNAME_OR_PASSWORD: 'Invalid username or password',
  REGISTER_SUCCESS: 'Register successfully',
  ACCOUNT_EXISTS: 'Account already exists',
  PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH: 'Password and Confirm Password are not match',
  USERNAME_RULE: 'Username must from 1 to 20 character and do not contain special character',
  PASSWORD_RULE:
    'Password must from 8 to 20 character and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character',
  USER_NOT_FOUND: 'User not found',
  WRONG_USERNAME_OR_PASSWORD: 'Wrong username or password',
} as const;

export const DATABASE_MESSAGE = {
  CONNECT_SUCCESS: 'Pinged your deployment. You successfully connected to MongoDB!',
  CONNECT_FAILED: 'Failed to connect to the database',
} as const;

export const ERROR_MESSAGE = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const;
