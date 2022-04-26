import React from 'react';
import { Icon } from '@iconify/react';
import './Header.sass';
import { IconButton } from '../IconButton/IconButton';

export const Header = ({ toggleModal }) => {
  return (
    <header className='header'>
      <div className='header__right'>
        <IconButton
          icon={<Icon icon='ic:baseline-menu' width='24' height='24' />}
        />
        <IconButton
          icon={<Icon icon='ic:baseline-help-outline' width='24' height='24' />}
          // onClick={toggleModal}
        />
      </div>
      <div className='header__title'>Wordle</div>
      <div className='header__left'>
        <IconButton
          icon={<Icon icon='ic:outline-insert-chart' width='24' height='24' />}
        />
        <IconButton
          icon={<Icon icon='ic:outline-settings' width='24' height='24' />}
          // onClick={toggleModal}
        />
      </div>
    </header>
  );
};
