import databaseServices from '~/services/database.services';

async function getAllData(): Promise<void> {
  try {
    const data = await databaseServices.getAllAccounts();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getAllData().catch((e) => console.log(e));
