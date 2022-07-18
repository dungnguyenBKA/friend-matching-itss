import React from 'react';
import BaseHTMLProps from '../../models/BaseHTMLProps';

interface ColumnProps extends BaseHTMLProps<HTMLDivElement> {}

const Column: React.FC<ColumnProps> = (props) => {
  const { style, children } = props;
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Column;
