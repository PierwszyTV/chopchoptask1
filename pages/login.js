import React, {Component} from 'react';
import axios from '../src/Functions/axios';
import Router from 'next/router';
import styles from '../styles/login.module.scss';
import {NotificationManager} from 'react-notifications';

class Login extends Component {

    state = {
        login: "",
        password: ""
    }

    handleInputChange(what, value)
    {
        this.setState({[what]: value})
    }

    handleSubmit = event => {
        event.preventDefault();

        const {login, password} = this.state;

        this.loginAction(login, password);
    }

    loginAction = (username, password) => {
        axios('post', '/auth', {username, password})
            .then(resp => {
                const token = resp.data.data.token;

                sessionStorage.setItem('token', token);

                this.redirectToHome();
            })
            .catch(error => {
                NotificationManager.error('Incorrect data! Try again.')
            })
    }

    redirectToHome = () => {
        Router.push('/index', '/', {shallow: true})
            .then(resp => {});
    }


    render() {
        const {login, password} = this.state;

        return (
            <div className="container text-center mt-5">
                <h1>
                    Simple Web App
                </h1>

                <div className={styles.loginContainer}>
                    <form
                        onSubmit={this.handleSubmit}
                        className="border p-5 mt-5"
                    >
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                value={login}
                                placeholder="Login"
                                onChange={event => this.handleInputChange("login", event.currentTarget.value)}
                                autoComplete="on"
                            />
                        </div>
                        <div className="form-gorup">
                            <input
                                className="form-control"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={event => this.handleInputChange("password", event.currentTarget.value)}
                                autoComplete="on"
                            />
                        </div>

                        <button
                            className="btn btn-sm btn-dark mt-4 py-2 px-4"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;