import './styles.scss';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputPropsType = 
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  & { labelText?: string, extraClassName?: string }

const DefaultInput: React.FC<InputPropsType> = (props) => {
  if (props.labelText) {
    return (
      <label className={`label ${props.extraClassName || ''}`}>
        <span className="label__text">
          {props.labelText}
        </span>
        <input
          className="input-field"
          {...props}
        />
      </label>
    );
  }

  return (
    <input
      className={`input-field ${props.extraClassName || ''}`}
      {...props}
  />
  );
};

export default DefaultInput;
