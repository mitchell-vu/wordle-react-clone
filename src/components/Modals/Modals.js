import React from 'react';
import { IconButton } from '../IconButton/IconButton';
import { Icon } from '@iconify/react';
import './Modals.sass';

export const FullScreenModals = ({ header, content, toggleModal }) => {
  return (
    <div className='overlay'>
      <div className='modal'>
        <header className='modal__header'>
          <h1>{header}</h1>
          <IconButton
            className='modal__close'
            icon={<Icon icon='ic:baseline-close' width='24' height='24' />}
            onClick={toggleModal}
          />
        </header>
        <section className='modal__content'>{content}</section>
      </div>
    </div>
  );
};
