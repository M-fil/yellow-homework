import './styles.scss';
import React, { MouseEvent } from 'react';

export type HTMLButtonTypeAttr = 'button' | 'submit' | 'reset' | undefined;

interface DefaultButtonProps {
  type?: HTMLButtonTypeAttr,
  text: string,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void,
  extraClassName?: string,
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  text, type = 'submit', onClick, extraClassName = '',
}) => {
  return (
    <button
      type={type as HTMLButtonTypeAttr}
      onClick={onClick}
      className={`default-button ${extraClassName}`}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
