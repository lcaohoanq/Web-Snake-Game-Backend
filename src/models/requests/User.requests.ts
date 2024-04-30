export interface RegisterReqBody {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginReqBody {
  username: string;
  password: string;
}

export interface GetMeReqQuery {
  username: string;
}
