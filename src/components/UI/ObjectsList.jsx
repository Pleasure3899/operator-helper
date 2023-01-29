import React, { useState, useEffect } from 'react';
import '../../styles/ObjectsList.css'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const sucessNotify = () => toast.success("Оновлено!");

const ObjectsList = () => {

    const fetchAllObjects = async () => {
        try {
            const response = await axios.get(BECKEND_URL + "/objects");
            setObjects(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
    const [objects, setObjects] = useState([])

    const refreshObjects = (e) => {
        e.preventDefault();
        fetchAllObjects();
        sucessNotify();
    }

    useEffect(() => {
        fetchAllObjects();
    }, []);

    return (
        <div className="objectslist">
            <Toaster toastOptions={{
                style: {
                    background: '#fff6df',
                    color: '#233044',
                },
            }} />
            <button onClick={refreshObjects} className="btn-objects">
                <img className="refresh-icon" src={require('../../assets/images/refresh-button-image.png')} />
                Об'єкти
            </button>
            <table id="objectstable">
                <tbody>
                    <tr>
                        <th>Номер</th>
                        <th>Широта</th>
                        <th>Довгота</th>
                        <th>Дії</th>
                    </tr>
                    {objects.map(object =>
                        <tr key={object.id}>
                            <td>{object.id}</td>
                            <td>{object.latitude}</td>
                            <td>{object.longitude}</td>
                            <td><button>update</button>
                                <button>delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );
};


export default ObjectsList
