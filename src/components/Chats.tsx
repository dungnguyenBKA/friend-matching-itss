import React, { useEffect, useState } from 'react';
import './Chats.css';
import Chat from './Chat';
import useAuth from '../hooks/useAuth';
import { getUser } from '../firebase';
import UserModel from '../models/UserModel';
import unknownAvatar from '../assets/unknown-avatar.png';
import { cyrb53 } from '../utils/utils';

const Chats = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    Promise.all((user?.bookmarks ?? []).map((uid) => getUser(uid))).then(
      setUsers
    );
  }, [user]);

  return (
    <div className="chats">
      {users.map((u) => (
        <Chat
          key={cyrb53(u.email)}
          name={u.name}
          message="..."
          timestamp="..."
          profilePic={u.image ?? unknownAvatar}
        />
      ))}
    </div>
  );
};

export default Chats;
