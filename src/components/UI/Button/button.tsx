import React, {ReactNode} from 'react';
import styles from './button.module.scss'

type ButtonProps  = {
    cb: () => void,
    children: ReactNode,
    type: 'primary' | 'secondary'
}
const Button = ({cb, children, type = 'primary'}: ButtonProps) => {
    return (
        <button onClick={cb} className={[styles.root, styles[type]].join(' ')}>
            {children}
        </button>
    );
};

export default Button;
