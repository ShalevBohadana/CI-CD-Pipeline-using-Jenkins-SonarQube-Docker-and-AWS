import { ReactNode } from 'react';
import { Modal as ReactModal } from 'react-responsive-modal';

interface CustomModalProps {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  showCloseIcon?: boolean;
  closeOnOverlayClick?: boolean;
  classNames?: {
    overlay?: string;
    modalContainer?: string;
    modal?: string;
    modalAnimationIn?: string;
    modalAnimationOut?: string;
  };
}

export const Modal = ({ children, ...props }: CustomModalProps) => (
  <ReactModal {...props}>{children}</ReactModal>
);
