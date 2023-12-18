"use client"
import { useEffect, useRef, useState } from 'react';
import Styles from './styled-input.module.css';

function StyledInput({ label, name = '', className = '', value = '', ...otherProps }) {
  const ref = useRef();
  const [transform, setTransform] = useState(value !== '');

  useEffect(() => {
    setTransform(value !== '')
  }, [value])

  return (
    <div className={`${Styles.inputContainer}`}>
      <input
        autoComplete="off"
        value={value}
        onFocus={() => setTransform(true)}
        onBlur={(e) => e.target.value === '' && setTransform(false)}
        className={`${Styles.input} ${className} rounded-sm`}
        name={name}
        onWheel={(e) => e.target.blur()}
        {...otherProps}
      />
      <label
        ref={ref}
        className={`${Styles.label} ${transform ? Styles.transform : ''}`}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}

export default StyledInput;
