import React, {Component} from 'react';
import axios from '../Functions/axios';
import {NotificationManager} from 'react-notifications';
import Post from "./Post";
import styles from './Posts.module.scss';
import Pagination from "./Pagination";
import Router from "next/router";
import Link from "next/Link";

class Posts extends Component {

    state = {
        page: undefined,
        isNextPageExist: false,
        nextPageLoaded: false,
        order: undefined,
        orderBy: undefined,
        posts: [],
        postsFetchInProgress: false,
        view: undefined
    }

    componentDidMount = () => {
        setTimeout(() => {
            const {page, order, orderBy, view} = Router.router.query;

            this.setState({
                page: page ? parseInt(page) : 1,
                order: order || 'asc',
                orderBy: orderBy || 'title',
                view: view || 'list'
            });
        }, 0);
    }

    getPosts = () => {
        const {page, order, orderBy, postsFetchInProgress} = this.state;

        if (postsFetchInProgress) return;

        this.setState({postsFetchInProgress: true});

        const path = `/posts?page=${page}&order=${order}&orderBy=${orderBy}`;
        axios('get', path)
            .then(resp => {
                this.setState({posts: [...resp.data.data], postsFetchInProgress: false});
                this.isNextPageExist();
            })
            .catch(error => {
                NotificationManager.error('Something went wrong! Cannot load posts.');
            })
    }

    isNextPageExist = () => {
        const {page, order, orderBy} = this.state;

        const path = `/posts?page=${page + 1}&order=${order}&orderBy=${orderBy}`;
        axios('get', path)
            .then(resp => {
                this.setState({isNextPageExist: resp.data.data.length > 0, nextPageLoaded: true});
            })
            .catch(error => {
                this.setState({nextPageLoaded: true})
            })
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {order: prevOrder, orderBy: prevOrderBy, page: prevPage} = prevState;
        const {order, orderBy, page, view} = this.state;

        if (typeof page !== "undefined") {
            if (order !== prevOrder || orderBy !== prevOrderBy || page !== prevPage) {
                this.getPosts();
            }

            const url = `/?page=${page}&order=${order}&orderBy=${orderBy}&view=${view}`;

            window.history.pushState("", "", url);
        }
    }

    handleSelectChange = (what, event) => {
        const value = event.currentTarget.value;
        this.setState(prevState => ({[what]: value, page: what === "view" ? prevState.page : 1}));
    }

    handlePageChange = page => this.setState({page, isNextPageExist: false});

    render() {

        const {posts, view, page, isNextPageExist, nextPageLoaded} = this.state;
        const postsComponents = [];

        posts.forEach(post => {

            const {title, thumbnail, excerpt, date, id, authorId} = post;

            const PostComponent = (
                <Post
                    id={id}
                    title={title}
                    thumbnail={thumbnail}
                    excerpt={excerpt}
                    date={date}
                    view={view}
                    authorId={authorId}
                    key={`post_${id}`}
                />
            );

            if (view === "grid")
            {
                postsComponents.push(
                    <Link
                        href={`/post/${id}`}
                        as={`/post/${id}`}
                        shallow={true}
                    >
                        <a href={`/post/${id}`}>
                            {PostComponent}
                        </a>
                    </Link>
                )
            } else {
                postsComponents.push(PostComponent)
            }

        });

        return (
            <div>
                <section className={styles.container}>
                    <div className={styles.navigation}>
                        <div>
                            <select
                                className={styles.sortOrderSelect}
                                onChange={event => this.handleSelectChange('order', event)}
                                defaultValue="asc"
                            >
                                <option
                                    value="asc"
                                >
                                    Sort A-Z
                                </option>
                                <option
                                    value="desc"
                                >
                                    Sort Z-A
                                </option>
                            </select>
                            <select
                                className={styles.sortOrderSelect}
                                onChange={event => this.handleSelectChange('orderBy', event)}
                                defaultValue="title"
                            >
                                <option
                                    value="title"
                                >
                                    Title
                                </option>
                                <option
                                    value="date"
                                >
                                    Date
                                </option>
                            </select>
                        </div>
                        <div className={styles.view}>
                            <select
                                className={styles.viewSelect}
                                onChange={event => this.handleSelectChange('view', event)}
                                defaultValue="list"
                            >
                                <option
                                    value="list"
                                >
                                    List
                                </option>
                                <option
                                    value="grid"
                                >
                                    Grid
                                </option>
                            </select>
                        </div>
                    </div>
                    {postsComponents}
                </section>
                {nextPageLoaded && typeof page !== "undefined" && typeof isNextPageExist !== "undefined" &&  (
                    <Pagination
                        page={page}
                        isNextPageExist={isNextPageExist}
                        changePage={this.handlePageChange}
                    />
                )}
            </div>
        )
    }
}

export default Posts;