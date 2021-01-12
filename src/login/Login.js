import React, { useState } from 'react'
import './styles/login.css'
import logo from '../images/logo.svg';
import showEye from '../images/showEye.svg';
import noShowEye from '../images/noShowEye.svg';

const Login = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);


    const handleShow = () => {
        setShowPwd(previousState => !previousState)

        if(showPwd){
            document.getElementById('pwd').type= "text";
        }else{
            document.getElementById('pwd').type= "password";
        }
    }

    const handleSubmit = (e) => {
        
    }

    return (
        <main className="mainBox">
            <div className="loginBox">
                <img src={logo} className="libraryIc" title="Tuten Library" alt="Tuten Library Icon"/>
                <h1 className="title">Tuten Library</h1>

                <form className="formBox">
                    <div className="inputLabelCol">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input type="email" 
                            name="user"
                            placeholder="Correo..."
                            id="email"
                            className="inputGlobal"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="inputLabelCol">
                        <label htmlFor="pwd">Contraseña:</label>
                        <div className="boxPwd">
                            <input type="password" 
                                name="pass"
                                placeholder="Contraseña..."
                                id="pwd"
                                value={pwd}
                                onChange={e => setPwd(e.target.pwd)}/>
                            <img src={( showPwd ? noShowEye : showEye)} 
                                className="eyeStyle"
                                onClick={handleShow}/>
                        </div>
                    </div>
                    <div className="buttonForm">
                        <button type="button" className="btnLogin">Iniciar sesión</button>
                    </div>
                    
                </form>
            </div>
        </main>
    );
}

export default Login;