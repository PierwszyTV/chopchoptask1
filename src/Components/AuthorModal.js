import React, {Component} from 'react';
import styles from './AuthorModal.module.scss';
import axios from '../Functions/axios';
import {NotificationManager} from 'react-notifications';

class AuthorModal extends Component {

    state = {
        author: {}
    }

    componentDidMount = () => {
        this.getAuthorData();
    }

    getAuthorData = () => {
        axios('get', `/author/${this.props.authorId}`)
            .then(resp => {
                const data = resp.data.data;

                console.log(data);

                this.setState({author: {...data}});
            })
            .catch(e => {
                NotificationManager.error('Something went wrong during load author data');
            })
    }

    render() {
        const {authorId, close} = this.props;
        const {avatar, description, name} = this.state.author;

        return (
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.headerAuthor}>
                        <h1>
                            {name}
                        </h1>
                        <img
                            src={avatar}
                            alt="Authors avatar"
                        />
                    </div>
                    <p>
                        {description}
                    </p>

                    <button
                        type="button"
                        className="ml-auto btn btn-dark"
                        onClick={close}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }
}

export default AuthorModal;