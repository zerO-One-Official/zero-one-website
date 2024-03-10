"use client"
import { useState } from 'react';
import Styles from './styled-input.module.css';

const StyledRadio = ({ label, radioGroup, name, onChange, required }) => {


    const [selected, setSelected] = useState(null)


    const handleSelect = (label) => {
        setSelected(label);
        onChange({
            target: {
                name,
                value: label
            }
        })
    }


    return (
        <div className={`${Styles.inputContainer}`}>
            <label
                htmlFor='male'
                className={`text-2xl font-extralight absolute left-[1%] ${selected !== null ? 'text-sm opacity-80' : ''}`}
            >
                {label}
            </label>
            <div className="border-b border-white/25 flex gap-4 py-4 pl-1 mt-8">
                {
                    radioGroup.map((radio, index) => {
                        return (
                            <label htmlFor={radio.id} className={`text-xl flex gap-1 items-center p-1 px-2 rounded-xl cursor-pointer transition-all ${selected === radio.label ? 'bg-primary-light text-primary fill-primary' : 'fill-primary-light'}`} key={index} tabIndex={0} onKeyUp={e => (e.code === "Enter" || e.code === "Space") && handleSelect(radio.label)}>
                                {radio.icon}
                                <p className='text-inherit'>
                                    {radio.label}
                                </p>
                                <input className='appearance-none' type="radio" id={radio.id} name={name} checked={selected === radio.label} onChange={() => handleSelect(radio.label)} required={required} tabIndex={1} />
                            </label>
                        )
                    })
                }
            </div >
        </div >
    )
}

export default StyledRadio