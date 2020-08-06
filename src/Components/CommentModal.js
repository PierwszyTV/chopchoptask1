import React, {Component} from 'react';
import styles from './CommentModal.module.scss';
import {NotificationManager} from 'react-notifications';

class AuthorModal extends Component {

    state = {
        name: "",
        comment: "",
        accept: false
    }

    handleChange = (what, value) => this.setState({[what]: value});

    handleSubmit = event => {

        event.preventDefault();

        const {name, comment, accept} = this.state;

        if (name === "") {
            NotificationManager.error('Name is too short!');
            return;
        }

        if (comment === "") {
            NotificationManager.error('Comment is too short!');
            return;
        }

        if (accept === false) {
            NotificationManager.error('You need to accept the terms');
            return;
        }

        this.props.addComment(name, comment);
    }

    render() {

        return (
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1 className="mb-2">Add comment</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-gorup my-2">
                            <input
                                type="text"
                                placeholder="Your name"
                                className="form-control"
                                value={this.state.name}
                                onChange={event => this.handleChange('name', event.currentTarget.value)}
                            />
                        </div>
                        <div className="form-gorup">
                            <textarea
                                className="form-control"
                                rows={5}
                                placeholder="Your comment"
                                onChange={event => this.handleChange('comment', event.currentTarget.value)}
                            >
                                {this.state.comment}
                            </textarea>
                        </div>
                        <div className="form-check my-2">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={this.state.accept}
                                    onChange={event => this.handleChange('accept', !this.state.accept)}
                                />
                                I Accept
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-dark my-2"
                        >
                            Submit
                        </button>

                    </form>
                    <div className="text-right">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={this.props.close}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthorModal;