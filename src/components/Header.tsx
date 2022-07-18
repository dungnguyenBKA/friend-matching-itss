import React from 'react';
import './Header.css';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Avatar from './Avatar';
import { ExitToApp } from '@material-ui/icons';

function Header({ backButton }) {
  const history = useHistory();
  const { user, signOut } = useAuth();

  return (
    <div className="header">
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {backButton ? (
          <IconButton onClick={() => history.replace(backButton)}>
            <ArrowBackIosIcon className="header__icon" fontSize="large" />
          </IconButton>
        ) : (
          <Link to="/profile">
            <IconButton>
              {user?.image ? (
                <Avatar src={user?.image} />
              ) : (
                <PersonIcon className="header__icon" fontSize="large" />
              )}
            </IconButton>
          </Link>
        )}
        <div style={{ cursor: 'pointer' }} onClick={signOut}>
          <ExitToApp fontSize="large" />
        </div>
      </div>
      <Link to="/">
        <img
          className="header__logo"
          src="https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png"
          alt="tinder logo"
        />
      </Link>
      <Link to="/chat">
        <IconButton>
          <ForumIcon className="header__icon" fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
}

export default Header;
