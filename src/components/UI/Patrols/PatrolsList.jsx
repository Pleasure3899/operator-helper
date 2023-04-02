import React, { useState, useEffect } from 'react';
import '../../../styles/ObjectsPage.css'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import UpdatePatrolForm from './UpdatePatrolForm';

const sucessNotify = () => toast.success("Оновлено!", {id: 'updated'});
const sucessDelete = () => toast.success("Видалено!");
const errorNotify = (props) => toast.error("Об'єкт не вдалось видалити!\n" + props);

const PatrolsList = () => {

    const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
    const [patrols, setPatrols] = useState([])
    const [patrolToUpdate, setPatrolToUpdate] = useState([])
    const [patrolmen, setPatrolmen] = useState([])
    const [modalOpened, setModalOpened] = useState(false)

    const fetchAllPatrols = async () => {
        try {
            const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
            const response = await axios.get(BECKEND_URL + "/patrols");
            setPatrols(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllPatrolmen = async () => {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
        await axios.get(BECKEND_URL + "/patrolmen").then((response) => {
            setPatrolmen(response.data)
        }).catch((error) => console.log(error))
    };

    const refreshPatrols = (e) => {
        e.preventDefault();
        fetchAllPatrols();
        fetchAllPatrolmen();
        sucessNotify();
    }

    const handleDelete = async (id) => {
		try {
		  const response = await axios.delete(BECKEND_URL +"/patrols/"+id);
		  if (response.data.errno) {
            errorNotify(response.data.sqlMessage);
        } else {
            fetchAllPatrols();
            sucessDelete();
        }
		} catch (error) {
            errorNotify(error);
		    console.log(error);
		}
	  };

      const handleUpdateOpen = (patrol) => {
        setPatrolToUpdate(patrol)
        setModalOpened(true)
	  };

      const handleUpdateClose = () => {
        setModalOpened(false);
        setPatrolToUpdate([])
	  };


    useEffect(() => {
        fetchAllPatrols();
        fetchAllPatrolmen();
    }, [BECKEND_URL]);

    return (
        <div className="patrolslist">
            <Toaster toastOptions={{
                style: {
                    background: '#fff6df',
                    color: '#233044',
                },
            }} />
            <button onClick={refreshPatrols} className="btn-patrols">
                <img className="refresh-icon" alt="" src={require('../../../assets/images/refresh-button-image.png')} />
                Бригади
            </button>
            <table id="patrolstable">
                <tbody>
                    <tr>
                        <th>Номер</th>
                        <th>Перший патрульний</th>
                        <th>Другий патрульний</th>
                        <th>Широта</th>
                        <th>Довгота</th>
                        <th>Ефективність нн</th>
                        <th>Ефективність н</th>
                        <th>Ефективність с</th>
                        <th>Ефективність в</th>
                        <th>Активна</th>
                        <th>Дії</th>
                    </tr>
                    {patrols.map(patrol =>
                        <tr key={patrol.id}>
                            <td>{patrol.id}</td>
                            <td>{patrolmen.map(patrolmen => patrol.first_patrolman_id === patrolmen.id ? `${patrolmen.id} - ${patrolmen.full_name}` : '' ) }</td>
                            <td>{patrolmen.map(patrolmen => patrol.second_patrolman_id === patrolmen.id ? `${patrolmen.id} - ${patrolmen.full_name}` : '' ) }</td>
                            <td>{patrol.latitude}</td>
                            <td>{patrol.longitude}</td>
                            <td>{patrol.probability_superlow}</td>
                            <td>{patrol.probability_low}</td>
                            <td>{patrol.probability_medium}</td>
                            <td>{patrol.probability_high}</td>
                            <td>{patrol.patrol_is_active ? 'Так' : 'Ні'}</td>
                            <td>
                                <button className="update-patrol" onClick={() => handleUpdateOpen(patrol)}>Редагувати</button>
                                <button className="delete-patrol" onClick={() => handleDelete(patrol.id)}>Видалити</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            {patrolToUpdate.length !== 0 && <UpdatePatrolForm modalOpened={modalOpened} patrolToUpdate={patrolToUpdate} handleUpdateClose={handleUpdateClose}/> }
                
        </div>

    );
};

export default PatrolsList
