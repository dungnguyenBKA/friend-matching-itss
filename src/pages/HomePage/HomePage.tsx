import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import TinderCards from '../../components/TinderCards/TinderCards';
import UserModel from '../../models/UserModel';

import { getAllUsers } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import { cyrb53 } from '../../utils/utils';

const HomePage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    getAllUsers().then((us) => {
      setUsers(
        us.filter(
          (u) =>
            u.email !== user?.email &&
            u.email !== 'admin@finder.com' &&
            !(user?.bookmarks ?? []).includes(cyrb53(u.email))
        )
      );
    });
  }, [user]);

  return (
    <div>
      <Header backButton="" />
      <TinderCards people={users} />
    </div>
  );
};

export default HomePage;
