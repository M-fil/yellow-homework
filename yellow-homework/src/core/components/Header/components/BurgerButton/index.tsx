import './styles.scss';
import React, { MouseEvent, useCallback, useMemo, useState } from 'react';

interface BurgerButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>, isActive: boolean) => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
  onClick,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const activeClassName = useMemo(() => isActive ? 'burger-button_active' : '', [isActive]);

  const ocnButtonClickHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setIsActive((prevIsActive) => !prevIsActive);
    onClick(event, isActive);
  }, [isActive]);

  return (
    <button
      type="button"
      onClick={ocnButtonClickHandler}
      className={`burger-button ${activeClassName}`}
    >
      <div className="burger-button__line" />
      <div className="burger-button__line" />
      <div className="burger-button__line" />
    </button>
  );
}

export default BurgerButton;
