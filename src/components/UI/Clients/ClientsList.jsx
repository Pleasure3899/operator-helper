import React, { useState, useEffect } from 'react';
import '../../../styles/ClientsPage.css'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import UpdateClientForm from './UpdateClientForm';

const sucessNotify = () => toast.success("Оновлено!");
const sucessDelete = () => toast.success("Видалено!");
const errorNotify = (props) => toast.error("Клієнта не вдалось видалити!\n" + props);

const ClientsList = () => {

    const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
    const [clients, setClients] = useState([])
    const [clientToUpdate, setClientToUpdate] = useState([])
    const [modalOpened, setModalOpened] = useState(false)

    const fetchAllClients = async () => {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
        await axios.get(BECKEND_URL + "/clients").then((response) => {
            setClients(response.data)
        }).catch((error) => console.log(error))
    };

    const refreshClients = (e) => {
        e.preventDefault();
        fetchAllClients();
        sucessNotify();
    }

    const handleDelete = async (id) => {
		try {
		  const response = await axios.delete(BECKEND_URL +"/clients/"+id);
		  if (response.data.errno) {
            errorNotify(response.data.sqlMessage);
        } else {
            fetchAllClients();
            sucessDelete();
        }
		} catch (error) {
            errorNotify(error);
		    console.log(error);
		}
	  };

      const handleUpdateOpen = (client) => {
        setClientToUpdate(client)
        setModalOpened(true)
	  };

      const handleUpdateClose = () => {
        setModalOpened(false);
        setClientToUpdate([])
	  };


    useEffect(() => {
        fetchAllClients();
    }, [BECKEND_URL]);

    return (
        <div className="clientslist">
            <Toaster toastOptions={{
                style: {
                    background: '#fff6df',
                    color: '#233044',
                },
            }} />
            <button onClick={refreshClients} className="btn-clients">
                <img className="refresh-icon" alt="" src={require('../../../assets/images/refresh-button-image.png')} />
                Клієнти
            </button>
            <table id="patrolmentable">
                <tbody>
                    <tr>
                        <th>Номер</th>
                        <th>Прізвище</th>
                        <th>Ім'я</th>
                        <th>Адреса</th>
                        <th>Номер телефону</th>
                        <th>Альт. номер телефону</th>
                        <th>Дії</th>
                    </tr>
                    {clients.map(client =>
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.surname}</td>
                            <td>{client.name}</td>
                            <td>{client.address}</td>
                            <td>{client.phone}</td>
                            <td>{client.alternate_phone}</td>
                            <td>
                                <button className="update-client" onClick={() => handleUpdateOpen(client)}>Редагувати</button>
                                <button className="delete-client" onClick={() => handleDelete(client.id)}>Видалити</button>
                                </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {clientToUpdate.length !== 0 && <UpdateClientForm modalOpened={modalOpened} clientToUpdate={clientToUpdate} handleUpdateClose={handleUpdateClose}/> }
                
        </div>

    );
};

export default ClientsList
