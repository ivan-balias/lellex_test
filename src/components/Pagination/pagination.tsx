import React from 'react';
import styles from './pagination.module.scss'

type PaginationProps = {
    current: number,
    total: number,
    per_page: number,
    cb: (page: number) => void
}
const Pagination = ({total, per_page, current, cb}: PaginationProps) => {
    const pageCount = Math.ceil(total / per_page)
    if (total < per_page || pageCount <= 0 || isNaN(pageCount))
        return null;

    return (
        <div className={styles.root}>
            {new Array(pageCount).fill('').map((page, _i) => (
                <div key={_i} className={[styles.selector, current === _i + 1 ? styles.active : ''].join(' ')}
                     onClick={() => cb(_i + 1)}>{_i + 1}</div>
            ))}
        </div>
    );
};

export default Pagination;
