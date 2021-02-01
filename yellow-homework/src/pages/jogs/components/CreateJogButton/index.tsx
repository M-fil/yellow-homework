import './styles.scss';
import React from 'react';

import CreateIcon from '../../../../assets/images/main/create.svg';

interface CreateJogButtonProps {
  src?: string,
  onClick: () => void,
}

const CreateJogButton: React.FC<CreateJogButtonProps> = ({
  src = CreateIcon, onClick,
}) => {
  return (
    <button
      type="button"
      className="create-jog-btn"
      onClick={onClick}
    >
      <img
        src={src}
        alt="create-btn"
        className="create-jog-icon"
      />
    </button>
  )
};

export default CreateJogButton;
