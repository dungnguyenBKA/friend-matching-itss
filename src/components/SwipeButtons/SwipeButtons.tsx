import React from 'react';
import './SwipeButtons.css';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';

const SwipeButtons = ({ onRefresh }: { onRefresh: () => void }) => {
  return (
    <div className="swipeButtons">
      <IconButton onClick={onRefresh} className="swipeButtons__repeat">
        <ReplayIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwipeButtons;
