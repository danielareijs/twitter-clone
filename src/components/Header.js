import React from "react";
import { Link } from 'react-router-dom';


class Header extends React.Component{

    componentDidMount(){
        const token = localStorage.getItem('twitter_clone_token');
        this.setState({token});
    }

    render(){
        return (
            <header>
                <Link to="/">
                <img src="https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg" />
                </Link>
                </header>
        )
    }
}



export default Header;