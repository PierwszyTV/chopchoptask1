import '../styles/global.scss'
import App from 'next/app';
import {NotificationContainer} from 'react-notifications';

class MyApp extends App {

    state = {
        token: "",
        tokenIsSet: false
    }

    componentDidMount = () => {
        this.setState({token: sessionStorage.getItem('token'), tokenIsSet: true});
    }

    checkToken = () => {
        const {token} = this.state;

        return typeof token === "string" && token !== "";
    }

    render() {
        const {Component, pageProps, router} = this.props;
        const {tokenIsSet} = this.state;

        if (tokenIsSet && !this.checkToken() && router.route !== "/login") {
            router.replace("/login", "/login", {shallow: true});
        }

        return (
            <div>
                <NotificationContainer/>
                <Component {...pageProps} />
            </div>
        );
    }
}

export default MyApp
