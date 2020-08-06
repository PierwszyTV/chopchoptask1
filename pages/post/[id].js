import React, {Component} from 'react';
import Header from "../../src/Components/Header";
import Router from 'next/router';
import axios from "../../src/Functions/axios";
import {NotificationManager} from "react-notifications";
import styles from '../../styles/Post.module.scss';
import AuthorModal from "../../src/Components/AuthorModal";
import CommentModal from "../../src/Components/CommentModal";
import Comment from "../../src/Components/Comment";

class Post extends Component
{
    state = {
        postId: undefined,
        title: '',
        thumbnail: '',
        date: '',
        content: '',
        authorId: undefined,
        infoOpen: false,
        addCommentOpen: false,
        comments: []
    }

    componentDidMount = () => {
        setTimeout(() => {
            const postId = Router.router.query.id;
            this.setState({postId});
            this.getData(postId);
        }, 0);

        this.timer = new Date();
    }

    componentWillUnmount = () => {
        const {postId} = this.state;
        axios('put', `/time/${postId}`, {time: this.getTimePassed()})
            .then(resp => {

            })
            .catch(error => {

            });
    }

    getTimePassed = () => {
        const now = new Date();
        const diffTime = Math.round((now - this.timer)/1000);

        return diffTime;
    }

    handleAddComment = (name, comment) => {
        this.toggleComment();

        this.setState(prevState => {
            const comments = prevState.comments;
            const date = new Date();
            const stringDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

            comments.push({
                name, comment, date: stringDate
            })
        })
    }

    toggleInfo = () => this.setState(prevState => ({infoOpen: !prevState.infoOpen}));
    toggleComment = () => this.setState(prevState => ({addCommentOpen: !prevState.addCommentOpen}));

    getData = postId => {
        const path = `/posts/${postId}`;
        axios('get', path)
            .then(resp => {
                this.setState({...resp.data.data});
            })
            .catch(error => {
                NotificationManager.error('Something went wrong! Cannot load this post.');
            })
    }

    render()
    {
        const commentsComps = [];
        const {title, content, date, thumbnail, infoOpen, authorId, addCommentOpen, postId, comments} = this.state;

        comments.forEach(comment => {
            const {name, comment: commentContent, date} = comment;
            commentsComps.push(
                <Comment
                    name={name}
                    comment={commentContent}
                    date={date}
                />
            )
        })
        return (
            <section>
                <Header/>
                <article className={styles.container}>
                    <h1>{title}</h1>
                    <img
                        src={thumbnail}
                        alt="post-thumbnail"
                    />
                    <div className={styles.nav}>
                        <small>{date}</small>
                        <div>
                            <button
                                type="button"
                                className="btn btn-dark btn-sm py-2 px-4"
                                onClick={this.toggleInfo}
                            >
                                i
                            </button>
                        </div>
                    </div>
                    <p>
                        {content}
                    </p>
                    <button
                        type="button"
                        onClick={this.toggleComment}
                        className="btn btn-outline-dark py-2 px-5 mt-3"
                    >
                        Comment!
                    </button>
                </article>

                <section className={styles.commentContainer}>
                    <h2>Comments</h2>

                    {commentsComps.length ? commentsComps : "No comments"}
                </section>

                {infoOpen && <AuthorModal authorId={authorId} close={this.toggleInfo}/>}
                {addCommentOpen && <CommentModal close={this.toggleComment} addComment={this.handleAddComment}/>}
            </section>
        )
    }
}

export default Post;