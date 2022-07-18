import React from 'react';
import Header from '../../components/Header';
import Chats from '../../components/Chats';

const ChatListPage: React.FC = () => {
  return (
    <div>
      <Header backButton="/" />
      <Chats />
    </div>
  );
};

export default ChatListPage;
