import Router from 'next/router';
import {NotificationManager} from 'react-notifications';

const logout = () => {
    if (typeof sessionStorage !== "undefined") sessionStorage.removeItem('token');

    NotificationManager.success('Successfully logout!');
    Router.push("/login", "/login", {shallow: true});
}


export default logout;