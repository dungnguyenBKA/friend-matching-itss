import { Person } from '@material-ui/icons';
import React from 'react';

const Avatar = ({ src, size }: { src?: string; size?: number }) => {
  return (
    <div
      style={{
        borderRadius: '50%',
        width: `${size ?? 52}px`,
        height: `${size ?? 52}px`,
        position: 'relative',
        overflow: 'hidden',
        margin: 'auto',
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          style={{
            height: '100%',
            width: 'auto',
            display: 'inline',
            position: 'relative',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        <Person style={{ fontSize: size }} />
      )}
    </div>
  );
};

export default Avatar;
