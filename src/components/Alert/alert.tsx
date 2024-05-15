import React from 'react';
import styles from './alert.module.scss'
type AlertProps = {
    message: string,
    close: () => void
}
const Alert = ({message, close} : AlertProps) => {
    return (
        <div className={styles.root}>
            <span className={styles.closebtn} onClick={close} >&times;</span>
            <span><strong>CHANGES!</strong> {message}</span>
        </div>
    );
};

export default Alert;
