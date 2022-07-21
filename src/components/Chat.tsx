import React from 'react';
import './Chat.css';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { Close } from '@material-ui/icons';

const Chat = ({ name, message, profilePic, timestamp, onRemove }) => {
  return (
    <div className="chat">
      <Link to={`/chat/${name}`}>
        <Avatar className="chat__image" src={profilePic} />
      </Link>
      <div className="chat__details">
        <h2>{name}</h2>
        <p>{message}</p>
      </div>
      <p className="chat__timestamp">{timestamp}</p>
      <Close onClick={onRemove} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default Chat;
