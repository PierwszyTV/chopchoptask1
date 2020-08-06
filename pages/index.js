import React, {Component} from 'react';
import Header from "../src/Components/Header";
import Posts from "../src/Components/Posts";

class Index extends Component {

    handleLogout = () => logout();

    render() {
        return (
            <div>
                <Header/>
                <Posts/>
            </div>
        )
    }
}

export default Index;