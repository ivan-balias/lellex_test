import React, { ReactNode} from 'react';
import styles from './table.module.scss'

type TableProps = {
    children: ReactNode,
    headings: string[]
}
const Table = ({children, headings}: TableProps) => {
    return (
        <table className={styles.root}>
            <thead>
            <tr>
                {headings.map((heading) => (
                    <th key={heading}>{heading}</th>
                ))}
            </tr>
            </thead>
            <tbody >
                {children}
            </tbody>
        </table>
    );
};

export default Table;
