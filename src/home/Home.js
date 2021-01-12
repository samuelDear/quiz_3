import React, { useState, Fragment, useEffect } from 'react'
import NavBar from '../components/NavBar';
import './styles/home.css'
import { useHistory } from "react-router-dom";

const Home = ({ location }) => {

    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [books, setBooks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {

        if(location.params !== undefined && location.params !== null){
            setUserName(location.params.username);
        }else{
            history.push("/");
        }

        callBooks();
        
    }, [])

    const setMistake = msg =>{
        setErrorMsg(msg);
        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
    }

    const callBooks = () => {
        console.log('load');
        var whatEmail = 'contacto@tuten.cl';

        // Armamos la cabecera
        const headerItem = new Headers({ 
            'Content-Type': 'application/json',
            'adminemail': location.params.username,
            'token': localStorage.getItem('tokenId'),
            'email': whatEmail,
            'app': 'APP_BCK',
            'Accept': 'application/json'
        });

        //Llamamos a la api
        fetch(`https://dev.tuten.cl:443/TutenREST/rest/user/${encodeURIComponent(whatEmail)}/bookings?current=true`,{
            method: 'GET',
            headers: headerItem
        }).then(response => {

            // Validamos el status
            switch(response.status){
                case 200:
                    // SI todo salio bien, guardamos el token
                    let data = response.json();
                    data.then(data => {
                        console.log(data);
                        setBooks(data);
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

    const transformDate = (time) => {
        let date = new Date(time);

        console.log(date);

        return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    return (
        <Fragment>
            <NavBar userName={userName}/>
            <main className="homeBox">
                <h3 className="subtitle">Welcome!</h3>

                <div className="grid">
                    <div className="headerGrid">
                        <div className="headerItem">
                            <p>BookingId</p>
                        </div>
                        <div className="headerItem">
                            <p>Cliente</p>
                        </div>
                        <div className="headerItem">
                            <p>Fecha de Creación</p>
                        </div>
                        <div className="headerItem">
                            <p>Dirección</p>
                        </div>
                        <div className="headerItem">
                            <p>Precio</p>
                        </div>
                    </div>
                    {books.length > 0 ? books.map((data, index) => (
                        <div className={index % 2 == 0 ? 'divRow' : 'divRow imparRow'} id={index}>
                            <div className="rowItem">
                                {data.bookingId}
                            </div>
                            <div className="rowItem">
                                {`${data.tutenUserClient.firstName} ${data.tutenUserClient.lastName}`}
                            </div>
                            <div className="rowItem">
                                {transformDate(data.bookingTime)}
                            </div>
                            <div className="rowItem">
                                {data.locationId.streetAddress}
                            </div>
                            <div className="rowItem">
                                {data.bookingPrice}
                            </div>
                        </div>
                    )) : null}
                </div>
            </main>
        </Fragment>
    );
}

export default Home;