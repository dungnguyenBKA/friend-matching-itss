import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import TinderCards from '../../components/TinderCards/TinderCards';
import UserModel from '../../models/UserModel';

import { getAllUsers } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import { cyrb53, findMaxLength } from '../../utils/utils';

const HomePage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    getAllUsers().then((us) => {
      const selectedUsers = us.filter(
        (u) =>
          u.email !== user?.email &&
          u.email !== 'admin@finder.com' &&
          !(user?.bookmarks ?? []).includes(cyrb53(u.email))
      );

      const fitUsers = selectedUsers.map((u) => {
        const score = findMaxLength(u.fav ?? [], user?.fav ?? []) as any;
        return { score, u };
      });

      const sorted = fitUsers.sort((a, b) => a.score - b.score).map((i) => i.u);

      setUsers(sorted);
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
