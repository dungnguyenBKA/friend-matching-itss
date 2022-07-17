import React from "react";
import Header from "../../Header";
import Chats from "../../Chats";

const ChatListPage: React.FC = () => {
  return <div>
    <Header backButton="/"/>
    <Chats/>
  </div>
}

export default ChatListPage
