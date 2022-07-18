import React from 'react';
import Header from '../../components/Header';
import ChatScreen from '../../components/ChatScreen';

const ChatDetailPage: React.FC = () => {
  return (
    <div>
      <Header backButton="/chat" />
      <ChatScreen />
    </div>
  );
};

export default ChatDetailPage;
