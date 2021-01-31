import React from 'react';
import CloseIcon from '../../../assets/images/header/close.svg';

interface CloseButtonProps<F = () => void> {
  closeFn: F,
  icon?: string,
  extraClassName?: string,
}

const CloseButton: React.FC<CloseButtonProps> = ({
  closeFn, icon = CloseIcon, extraClassName = '',
}) => {
  return (
    <button
      type="button"
      className={`close-button ${extraClassName}`}
      onClick={closeFn}
    >
      <img
        src={icon}
        alt="close-icon"
        className="burger-menu__close-icon"
      />
    </button>
  );
}

export default CloseButton;
