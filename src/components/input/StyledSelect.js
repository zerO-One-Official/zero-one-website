"use client"
import { useEffect, useRef, useState } from 'react';
import Styles from './styled-input.module.css';
import { BiChevronDown } from 'react-icons/bi';

function StyledSelect({ label, name = '', className = '', options, onChange, ...otherProps }) {

    const ref = useRef();
    const [transform, setTransform] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        setTransform(selected >= 0)
    }, [selected])

    const selectBoxRef = useRef(null);

    useEffect(() => {
        const handleOutClick = (e) => {
            if (!selectBoxRef?.current?.contains(e.target)) {
                setShowOption(false);
            }
        }

        document.addEventListener('click', handleOutClick);
        return () => document.removeEventListener('click', handleOutClick);
    })

    const handleSelect = (index) => {
        setSelected(index);
        setShowOption(false);

        onChange({
            target: {
                name,
                value: options[index].value
            }

        })
    }

    return (
        <div className={Styles.inputContainer}>
            <label
                ref={ref}
                className={`${Styles.label} ${transform ? Styles.transform : ''} flex justify-between items-center w-full pointer-events-none`}
                htmlFor={name}
            >
                {label}
                <BiChevronDown className={transform ? 'hidden' : ''} />
            </label>
            <div>
                <input
                    readOnly
                    autoComplete="off"
                    className={`${Styles.input} ${className} rounded-sm cursor-pointer w-full`}
                    name={name}
                    value={selected === -1 ? '' : options[selected].label}
                    tabIndex={0}
                    onClick={() => setShowOption(prev => !prev)}
                    {...otherProps}
                />
                <div ref={selectBoxRef} className={`flex flex-col  p-1 absolute w-full bg-transparent backdrop-blur-md border translate-y-2 border-stone-50/25 z-50 rounded-sm ${showOption ? 'visible' : 'hidden'} max-h-80`}>
                    {
                        options.map((option, index) => {
                            return <li
                                className={`${index === selected ? 'bg-accent hover:bg-primary-light hover:text-primary' : ' hover:bg-stone-100/20'} list-none px-3 py-2 flex cursor-pointer transition-all rounded-sm backdrop-blur-md`}
                                key={index}
                                onClick={() => handleSelect(index)}
                            >
                                {option.label}
                            </li>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default StyledSelect;