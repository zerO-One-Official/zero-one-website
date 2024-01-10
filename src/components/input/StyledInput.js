"use client"
import { useEffect, useRef, useState } from 'react';
import Styles from './styled-input.module.css';

function StyledInput({ type = "text", label, name = '', className = '', value = '', ...otherProps }) {
  const ref = useRef();
  const [transform, setTransform] = useState(value !== '');

  useEffect(() => {
    setTransform(value !== '')
  }, [value])

  const handleEnter = (e) => {
    if (e.code === "Enter") {
      const br = document.createElement("br");
      e.target.appendChild(br);
    }
  }

  return (
    <div className={`${Styles.inputContainer}`}>
      {
        type === 'desc'
          ?
          <textarea
            autoComplete="off"
            value={value}
            onFocus={() => setTransform(true)}
            onBlur={(e) => e.target.value === '' && setTransform(false)}
            className={`${Styles.textarea} ${className} rounded-sm`}
            name={name}
            inputMode="text"
            onKeyDown={handleEnter}
            {...otherProps}
          />
          :
          <input
            type={type}
            autoComplete="off"
            value={value}
            onFocus={() => setTransform(true)}
            onBlur={(e) => e.target.value === '' && setTransform(false)}
            className={`${Styles.input} ${className} rounded-sm`}
            name={name}
            onWheel={(e) => e.target.blur()}
            {...otherProps}
          />
      }
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
