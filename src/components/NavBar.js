import React from 'react'
import logo from '../images/logo.svg';
import './styles/navBar.css';
import logout from '../images/logout.svg';

const NavBar = ({ userName }) => {

    return (
        <header className="header">
            <img src={logo} 
                alt="Tuten library" 
                className="iconHeader"
                title="Tuten library"/>
            <div className="userBox">
                <p className="userTxt">{userName}</p>
                <img src={logout} 
                    alt="Logout"
                    className="logoutIc"
                    title="Logout"/>
            </div>
        </header>
    );
}

export default NavBar;