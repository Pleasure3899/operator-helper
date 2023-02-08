import React, { useState, useEffect } from 'react';
import '../../../styles/PatrolmenPage.css'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import UpdatePatrolmanForm from './UpdatePatrolmanForm';

const sucessNotify = () => toast.success("Оновлено!");
const sucessDelete = () => toast.success("Видалено!");
const errorNotify = (props) => toast.error("Патрульного не вдалось видалити!\n" + props);

const PatrolmenList = () => {

    const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
    const [patrolmen, setPatrolmen] = useState([])
    const [patrolmanToUpdate, setPatrolmanToUpdate] = useState([])
    const [modalOpened, setModalOpened] = useState(false)

    const fetchAllPatrolmen = async () => {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
        await axios.get(BECKEND_URL + "/patrolmen").then((response) => {
            setPatrolmen(response.data)
        }).catch((error) => console.log(error))
    };

    const refreshPatrolmen = (e) => {
        e.preventDefault();
        fetchAllPatrolmen();
        sucessNotify();
    }

    const handleDelete = async (id) => {
		try {
		  const response = await axios.delete(BECKEND_URL +"/patrolmen/"+id);
		  if (response.data.errno) {
            errorNotify(response.data.sqlMessage);
        } else {
            fetchAllPatrolmen();
            sucessDelete();
        }
		} catch (error) {
            errorNotify(error);
		    console.log(error);
		}
	  };

      const handleUpdateOpen = (patrolman) => {
        setPatrolmanToUpdate(patrolman)
        setModalOpened(true)
	  };

      const handleUpdateClose = () => {
        setModalOpened(false);
        setPatrolmanToUpdate([])
	  };


    useEffect(() => {
        fetchAllPatrolmen();
    }, [BECKEND_URL]);

    return (
        <div className="patrolmenlist">
            <Toaster toastOptions={{
                style: {
                    background: '#fff6df',
                    color: '#233044',
                },
            }} />
            <button onClick={refreshPatrolmen} className="btn-patrolmen">
                <img className="refresh-icon" alt="" src={require('../../../assets/images/refresh-button-image.png')} />
                Бригади
            </button>
            <table id="patrolmentable">
                <tbody>
                    <tr>
                        <th>Номер</th>
                        <th>ПІБ</th>
                        <th>Вік</th>
                        <th>Стаж</th>
                        <th>Дії</th>
                    </tr>
                    {patrolmen.map(patrolman =>
                        <tr key={patrolman.id}>
                            <td>{patrolman.id}</td>
                            <td>{patrolman.full_name}</td>
                            <td>{patrolman.age}</td>
                            <td>{patrolman.experience}</td>
                            <td>
                                <button className="update-patrolman" onClick={() => handleUpdateOpen(patrolman)}>Редагувати</button>
                                <button className="delete-patrolman" onClick={() => handleDelete(patrolman.id)}>Видалити</button>
                                </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {patrolmanToUpdate.length !== 0 && <UpdatePatrolmanForm modalOpened={modalOpened} patrolmanToUpdate={patrolmanToUpdate} handleUpdateClose={handleUpdateClose}/> }
                
        </div>

    );
};

export default PatrolmenList
