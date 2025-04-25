import React from 'react';
import ModalComponent from 'react-responsive-modal';
import type { ModalProps } from 'react-responsive-modal';

export const Modal: React.FC<ModalProps> = (props) => {
  return <ModalComponent {...props} />;
};
