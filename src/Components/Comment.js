import React from 'react';
import styles from './Comment.module.scss'

const Comment = (props) => {
    const {name, comment, date} = props;

    return(
        <div className={styles.container}>
            <small>{date}</small>
            <h3>{name}</h3>
            <p>
                {comment}
            </p>
        </div>
    )
};

export default Comment;