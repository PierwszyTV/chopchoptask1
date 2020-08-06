import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = props => {

    const {changePage, isNextPageExist, page} = props;

    const PgButton = page => (
        <button
            type="button"
            onClick={event => changePage(page)}
            className={`${styles.page} ${page === props.page ? styles.active : ''}`}
            key={`pagination_button_${page}`}
        >
            {page}
        </button>
    );

    const pgButtons = [];

    for (let i = 1; isNextPageExist ? i <= page + 1 : i <= page; i++) {

        if (page > 2 && i > 1 && i < page - 1) {
            if (i === 2) {
                pgButtons.push(
                    <button
                        type="button"
                        disabled={true}
                        className={styles.page}
                        key="pagination_button_between"
                    >
                        ...
                    </button>
                );
                continue;
            } else {
                continue;
            }
        }

        pgButtons.push(PgButton(i));
    }

    return (
        <div className={styles.container}>
            {pgButtons}
        </div>
    )
}

export default Pagination;