import React from "react";
import Header from "../../Header";
import ChatScreen from "../../ChatScreen";

const ChatDetailPage: React.FC = () => {
  return <div>
    <Header backButton="/chat"/>
    <ChatScreen/>
  </div>
}

export default ChatDetailPage
