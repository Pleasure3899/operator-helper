import React, { useState, useEffect } from 'react';
import '../../../styles/ObjectsPage.css'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import UpdateObjectForm from './UpdateObjectForm';

const sucessNotify = () => toast.success("Оновлено!");
const sucessDelete = () => toast.success("Видалено!");
const errorNotify = (props) => toast.error("Об'єкт не вдалось видалити!\n" + props);

const ObjectsList = () => {

    const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
    const [objects, setObjects] = useState([])
    const [objectToUpdate, setObjectToUpdate] = useState([])
    const [clients, setClients] = useState([])
    const [modalOpened, setModalOpened] = useState(false)

    const fetchAllObjects = async () => {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
        try {
            const response = await axios.get(BECKEND_URL + "/objects");
            setObjects(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllClients = async () => {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
        await axios.get(BECKEND_URL + "/clients").then((response) => {
            setClients(response.data)
        }).catch((error) => console.log(error))
    };

    const refreshObjects = (e) => {
        e.preventDefault();
        fetchAllObjects();
        fetchAllClients();
        sucessNotify();
    }

    const handleDelete = async (id) => {
		try {
		  const response = await axios.delete(BECKEND_URL +"/objects/"+id);
		  if (response.data.errno) {
            errorNotify(response.data.sqlMessage);
        } else {
            fetchAllObjects();
            sucessDelete();
        }
		} catch (error) {
            errorNotify(error);
		    console.log(error);
		}
	  };

      const handleUpdateOpen = (object) => {
        setObjectToUpdate(object);
        setModalOpened(true);
	  };

      const handleUpdateClose = () => {
        setModalOpened(false);
        setObjectToUpdate([]);
	  };


    useEffect(() => {
        fetchAllObjects();
        fetchAllClients();
    }, [BECKEND_URL]);

    return (
        <div className="objectslist">
            <Toaster toastOptions={{
                style: {
                    background: '#fff6df',
                    color: '#233044',
                },
            }} />
            <button onClick={refreshObjects} className="btn-objects">
                <img className="refresh-icon" alt="" src={require('../../../assets/images/refresh-button-image.png')} />
                Об'єкти
            </button>
            <table id="objectstable">
                <tbody>
                    <tr>
                        <th>Номер</th>
                        <th>Вулиця</th>
                        <th>Будинок</th>
                        <th>Під'їзд</th>
                        <th>Поверх</th>
                        <th>Квартира</th>
                        <th>Широта</th>
                        <th>Довгота</th>
                        <th>Д. тварини</th>
                        <th>Категорія</th>
                        <th>Власник</th>
                        <th>Активний</th>
                        <th>Дії</th>
                    </tr>
                    {objects.map(object =>
                        <tr key={object.id}>
                            <td>{object.id}</td>
                            <td>{object.street}</td>
                            <td>{object.house}</td>
                            <td>{object.section}</td>
                            <td>{object.floor}</td>
                            <td>{object.apartment}</td>
                            <td>{object.latitude}</td>
                            <td>{object.longitude}</td>
                            <td>{object.pets ? 'Так' : 'Ні'}</td>
                            <td>{object.category === 1 ? '1 - Перша' : object.category === 2 ? '2 - Друга' : '3 - Третя'}</td>
                            <td>{clients.map(client => object.client_id === client.id ? `${client.id} - ${client.surname} ${client.name}` : '' ) }</td>
                            <td>{object.object_is_active ? 'Так' : 'Ні'}</td>
                            <td>
                                <button className="update-object" onClick={() => handleUpdateOpen(object)}>Редагувати</button>
                                <button className="delete-object" onClick={() => handleDelete(object.id)}>Видалити</button>
                                </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {objectToUpdate.length !== 0 && <UpdateObjectForm modalOpened={modalOpened} objectToUpdate={objectToUpdate} handleUpdateClose={handleUpdateClose}/> }
                
        </div>

    );
};

export default ObjectsList
