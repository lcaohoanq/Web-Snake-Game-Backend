import { ObjectId } from 'mongodb';

type AccountType = {
  username: string;
  password: string;
};

export interface IAccount {
  _id?: ObjectId;
  username: string;
  password: string;
  score?: number;
  created?: Date;
  salt: string;
}

export class User {
  _id?: ObjectId;
  username: string;
  password: string;
  score?: number;
  created: Date;
  salt: string;

  constructor(user: IAccount) {
    const date = new Date();
    this._id = user._id ?? new ObjectId();
    this.username = user.username;
    this.password = user.password;
    this.score = user.score;
    this.created = user.created ?? date;
    this.salt = user.salt;
  }

  get account(): AccountType {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
