import React, { useState, Fragment, useEffect } from 'react'
import NavBar from '../components/NavBar';
import './styles/home.css'
import { useHistory } from "react-router-dom";
import Loading from '../components/Loading';

const Home = ({ location }) => {

    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [books, setBooks] = useState([]);
    const [booksView, setBooksView] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const [optionFilter, setOptionFilter] = useState('');
    const [searchTxt, setSearchTxt] = useState('');

    useEffect(() => {

        if(location.params !== undefined && location.params !== null){
            setUserName(location.params.username);
            callBooks();
        }else{
            history.push("/");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    useEffect(() => {
        /*Funcion para filtrar los books */
        const filterItems = () => {
            var booksTmp;

            switch(optionFilter){
                case "like":
                    booksTmp = books.filter(data => (
                        data.bookingId.toString().indexOf(searchTxt) > -1 || 
                        data.bookingPrice.toString().indexOf(searchTxt) > -1 ? data.bookingId : null) );
                    break;
                case ">":
                    booksTmp = books.filter(data => (
                        data.bookingId < searchTxt || 
                        data.bookingPrice > searchTxt ? data.bookingId : null) );
                    break;
                case "<":
                    booksTmp = books.filter(data => (
                        data.bookingId < searchTxt || 
                        data.bookingPrice < searchTxt ? data.bookingId : null) );
                    break;
                case ">=":
                    booksTmp = books.filter(data => (
                        data.bookingId >= searchTxt || 
                        data.bookingPrice >= searchTxt ? data.bookingId : null) );
                    break;
                case "<=":
                    booksTmp = books.filter(data => (
                        data.bookingId <= searchTxt || 
                        data.bookingPrice <= searchTxt ? data.bookingId : null) );
                    break;
                default:
                    booksTmp = books;
            }

            setBooksView(booksTmp);
        }

        filterItems();
    }, [searchTxt,optionFilter,books]);

    const setMistake = msg =>{
        setErrorMsg(msg);
        setLoading(false);
        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
    }

    const callBooks = () => {
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

        setLoading(true);
        //Llamamos a la api
        fetch(`https://dev.tuten.cl:443/TutenREST/rest/user/${encodeURIComponent(whatEmail)}/bookings?current=true`,{
            method: 'GET',
            headers: headerItem
        }).then(response => {

            // Validamos el status
            switch(response.status){
                case 200:
                    setLoading(false);
                    // SI todo salio bien, guardamos la data
                    let data = response.json();
                    data.then(data => {
                        setBooks(data);
                        setBooksView(data);
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

    /*Funcion para retornar una fecha visible para el usuario */
    const transformDate = time => {
        let date = new Date(time);
        return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    return (
        <Fragment>
            { loading ? <Loading /> : null}
            <NavBar userName={userName}/>
            <main className="homeBox">
                <h3 className="subtitle">Welcome!</h3>

                { errorMsg !== '' ? (
                    <p className="errorForm">{ errorMsg }</p>
                ) : null}

                <div className="grid">

                    <div className="searchBox">
                        <input type="text" 
                            value={searchTxt}
                            onChange={e => setSearchTxt(e.target.value)}
                            placeholder="Buscar..."
                            className="searchInput"/>

                        <select className="optionFilter"
                            onChange={async e => setOptionFilter(e.target.value)}
                            value={optionFilter}>
                            <option value="">Seleccione</option>
                            <option value="like">Like</option>
                            <option value="<">&lt;</option>
                            <option value=">">&gt;</option>
                            <option value="<=">&lt;=</option>
                            <option value=">=">&gt;=</option>
                        </select>

                    </div>

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
                    {booksView.length > 0 ? booksView.map((data, index) => (
                        <div key={index} className={index % 2 === 0 ? 'divRow' : 'divRow imparRow'} id={index}>
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