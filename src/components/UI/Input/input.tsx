import React, {InputHTMLAttributes} from 'react';
import styles from './input.module.scss'
type InputProps = {
    title: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({title, ...props}: InputProps) => {
    return (
        <div className={styles.root}>
            <label>{title}</label>
            <input {...props}/>
        </div>
    );
};

export default Input;
