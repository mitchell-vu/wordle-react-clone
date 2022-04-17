import React from 'react';
import './IconButton.sass';

export const IconButton = ({ chilren, icon, onClick = () => {}, className }) => {
  return (
    <button className={`button-icon ${className}`} onClick={onClick}>
      {icon}
    </button>
  );
};
