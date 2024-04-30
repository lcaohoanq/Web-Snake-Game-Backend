import { config } from 'dotenv';
import { Db, Document, InsertOneResult, MongoClient, WithId } from 'mongodb';
import { IAccount, User } from '~/models/schemas/User.schema';

config({ path: __dirname + '/../../.env' });

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@snake-game.t2nmru9.mongodb.net/?retryWrites=true&w=majority&appName=Snake-Game`;

const dbCollection = process.env.DB_COLLECTION!;

class DatabaseServices {
  private client: MongoClient;
  private db: Db;
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }

  async connect(): Promise<void> {
    try {
      await this.db.command({ ping: 1 });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createAccount(
    username: string,
    password: string,
  ): Promise<InsertOneResult<Document> | undefined> {
    try {
      const account = await this.db.collection(dbCollection).insertOne({ username, password });
      return account;
    } catch (error) {
      console.log(error);
    }
  }

  async getAccount(username: string): Promise<User | null | undefined> {
    try {
      const accountDocument = (await this.db
        .collection(dbCollection)
        .findOne({ username })) as IAccount;
      if (accountDocument) {
        const account = new User(accountDocument);
        return account;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      const accountDocument = (await this.db
        .collection(dbCollection)
        .findOne({ username })) as IAccount;
      if (accountDocument) {
        return new User(accountDocument);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async login(account: IAccount): Promise<boolean> {
    try {
      const { username, password } = account;
      const accountDocument = (await this.db
        .collection(dbCollection)
        .findOne({ username, password })) as IAccount;
      if (accountDocument) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  async register(account: IAccount): Promise<User | undefined> {
    try {
      const { username, password, salt } = account;

      // Check if the account already exists
      const existingAccount = await this.db.collection(dbCollection).findOne({ username });
      if (existingAccount) {
        throw new Error('Account already exists');
      }

      // If the account does not exist, insert it into the database
      const insertResult = await this.db
        .collection(dbCollection)
        .insertOne({ username, password, salt });

      // Retrieve the inserted document using the insertedId
      const accountDocument = await this.db
        .collection(dbCollection)
        .findOne({ _id: insertResult.insertedId });

      if (accountDocument) {
        return new User(accountDocument as IAccount);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllAccounts(): Promise<WithId<Document>[] | undefined> {
    try {
      return this.db.collection(dbCollection).find().toArray();
    } catch (error) {
      console.log(error);
    }
  }
}

const databaseServices = new DatabaseServices();
export default databaseServices;
