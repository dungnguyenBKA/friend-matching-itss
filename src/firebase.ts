import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
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
    // eslint-disable-next-line
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

export const updateUser = async (
  email: string,
  { ...user }: UserModel
): Promise<UserModel> => {
  const oldUser = await get(ref(database, `users/${cyrb53(email)}`)).then((u) =>
    u.val()
  );
  const newUser = { ...oldUser, ...user };
  await remove(ref(database, `users/${cyrb53(email)}`));
  await set(ref(database, `users/${cyrb53(newUser.email)}`), newUser);
  return newUser;
};

export const getFavs = async () => {
  return await get(ref(database, 'favourites')).then((res) => res.val());
};

export const getAllUsers = async (): Promise<UserModel[]> => {
  const userModels = (await get(ref(database, 'users'))).val();
  return Object.keys(userModels).map((k) => userModels[k]);
};

export const getUser = async (id: string): Promise<UserModel> => {
  return (await get(ref(database, `users/${id}`))).val();
};

export const addBookmark = async (
  id: string,
  to: string
): Promise<UserModel | null> => {
  const user = await getUser(id);
  if (!user) {
    return null;
  }

  const oldBookmarks = (user.bookmarks || []).filter((i) => i !== to);

  const res = await updateUser(user.email, {
    ...user,
    bookmarks: [...oldBookmarks, to],
  });

  return res;
};

export const removeBookmark = async (
  id: string,
  to: string
): Promise<UserModel | null> => {
  const user = await getUser(id);
  if (!user) {
    return null;
  }

  const oldBookmarks = user.bookmarks || [];

  const res = await updateUser(user.email, {
    ...user,
    bookmarks: oldBookmarks.filter((uid) => uid !== to),
  });

  return res;
};

export default firebaseApp;
