import { initializeApp } from 'firebase/app';
import { getDatabase, get, set, ref } from 'firebase/database';
import UserModel from './models/UserModel';
import { cyrb53 } from './utils/utils';

const firebaseConfig = {
  apiKey: 'AIzaSyClXV_rfBjaRlXaTqe_sUfgbCFna15T-Ls',
  authDomain: 'friend-matching-itss.firebaseapp.com',
  projectId: 'friend-matching-itss',
  storageBucket: 'friend-matching-itss.appspot.com',
  messagingSenderId: '812414362834',
  appId: '1:812414362834:web:38dcee3e27dd804173f90b',
  measurementId: 'G-97S2THRTWT',
  databaseURL:
    'https://friend-matching-itss-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);

export const addUser = async (user: UserModel): Promise<UserModel | String> => {
  const u = await get(ref(database, `users/${cyrb53(user.email)}`)).then((u) =>
    u.val()
  );
  if (u) {
    return new String('email existed');
  }
  await set(ref(database, `users/${cyrb53(user.email)}`), user);
  return user;
};

export const verifyUser = async ({
  ...user
}: UserModel): Promise<UserModel | null> => {
  const u = await get(ref(database, `users/${cyrb53(user.email)}`)).then((u) =>
    u.val()
  );
  return u?.passwd === user.passwd ? u : null;
};

export default firebaseApp;
