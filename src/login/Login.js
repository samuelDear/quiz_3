import React, { useState, useEffect } from 'react'
import './styles/login.css'
import logo from '../images/logo.svg';
import showEye from '../images/showEye.svg';
import noShowEye from '../images/noShowEye.svg';
import { useHistory } from "react-router-dom";
import Loading from '../components/Loading';

const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [showPwd, setShowPwd] = useState(true);
    const [loading, setLoading] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        localStorage.removeItem('tokenId');
    }, [])

    const setMistake = msg =>{
        setErrorMsg(msg);
        setLoading(false);
        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
    }

    const handleShow = () => {
        setShowPwd(previousState => !previousState)

        if(showPwd){
            document.getElementById('pwd').type= "text";
        }else{
            document.getElementById('pwd').type= "password";
        }
    }

    const handleSubmit = (e) => {

        //Validamos que los campos no esten vacios
        if(email === '' || pwd === ''){
            setMistake('Campos vacíos');
            return null;
        }

        // Armamos la cabecera
        const headerItem = new Headers({ 
            'Content-Type': 'application/json',
            'email': email,
            'password': pwd,
            'app': 'APP_BCK',
            'Accept': 'application/json'
        });

        setLoading(true);
        //Llamamos a la api
        fetch(`https://dev.tuten.cl/TutenREST/rest/user/${encodeURIComponent(email)}`,{
            method: 'PUT',
            headers: headerItem,
        }).then(response => {

            // Validamos el status
            switch(response.status){
                case 200:
                    // SI todo salio bien, guardamos el token
                    let data = response.json();
                    data.then(data => {
                        localStorage.setItem('tokenId',data.sessionTokenBck);
                        localStorage.setItem('userName', data.email)
                        setLoading(false);
                        history.push("/home");
                    })
                    break;
                case 400:
                    setMistake('Invalid something');
                    break;
                default:
                    setMistake('Error interno');
                    break;
            }
            
        }).catch(e => {
            setMistake('Error interno');
        });
    }

    return (
        <main className="mainBox">
            { loading ? <Loading /> : null}
            <div className="loginBox">
                <img src={logo} className="libraryIc" title="Tuten Library" alt="Tuten Library Icon"/>
                <h1 className="title">Tuten Library</h1>

                <form className="formBox">

                    { errorMsg !== '' ? (
                        <p className="errorForm">{ errorMsg }</p>
                    ) : null}

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
                                onChange={e => setPwd(e.target.value)}/>
                            <img src={( showPwd ? noShowEye : showEye)} 
                                className="eyeStyle"
                                alt="Eye"
                                title="Eye"
                                onClick={handleShow}/>
                        </div>
                    </div>
                    <div className="buttonForm">
                        <button type="button" 
                            className="btnLogin"
                            onClick={handleSubmit}>
                            Iniciar sesión
                        </button>
                    </div>
                    
                </form>
            </div>
        </main>
    );
}

export default Login;