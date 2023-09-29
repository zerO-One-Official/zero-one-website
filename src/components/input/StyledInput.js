"use client"
import { useRef, useState } from 'react';
import Styles from './styled-input.module.css';

function StyledInput({ label, name = '', className = '', value = '', ...otherProps }) {
  const ref = useRef();
  const [transform, setTransform] = useState(value !== '');
  return (
    <div className={Styles.inputContainer}>
      <label
        ref={ref}
        className={`${Styles.label} ${transform ? Styles.transform : ''}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        autoComplete="off"
        onFocus={() => setTransform(true)}
        onBlur={(e) => e.target.value === '' && setTransform(false)}
        className={`${Styles.input} ${className} rounded-sm`}
        name={name}
        {...otherProps}
      />
    </div>
  );
}

export default StyledInput;
