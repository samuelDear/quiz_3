import React from 'react'
import logo from '../images/logo.svg';
import './styles/navBar.css';
import logOut from '../images/logout.svg';
import { useHistory } from "react-router-dom";

const NavBar = ({ userName }) => {

    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('tokenId');
        history.push("/");
    }

    return (
        <header className="header">
            <img src={logo} 
                alt="Tuten library" 
                className="iconHeader"
                title="Tuten library"/>
            <div className="userBox">
                <p className="userTxt">{userName}</p>
                <img src={logOut} 
                    onClick={logout}
                    alt="Logout"
                    className="logoutIc"
                    title="Logout"/>
            </div>
        </header>
    );
}

export default NavBar;