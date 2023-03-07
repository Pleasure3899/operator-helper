import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
//import IncidentsItemPage from '../../components/UI/Incidents/IncidentsList';
import { useParams } from 'react-router-dom';
import axios from "axios";
import IncidentsActions from '../../components/UI/Incidents/IncidentActions';

const IncidentsItemPage = () => {

    const params = useParams()

    const [incident, setIncidents] = useState([])


    useEffect(() => {
        const updateCheckSwitch = async (id) => {
            try {
              const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
              await axios.put(BECKEND_URL + "/incident-ischeck/" + id);
            } catch (error) {
              console.log(error);
            }
          }
		const fetchIncident = async (e) => {
            const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
            try {
                const response = await axios.get(BECKEND_URL + "/incidents/" + params.id);
                setIncidents(response.data[0])
                if (incident.incidentchecked === 0) {
                    updateCheckSwitch(incident.incidentid)
                }
            } catch (error) {
                console.log(error);
            }
        }
		fetchIncident();
	}, [params.id, incident.incidentchecked, incident.incidentid]);


    return (
        <div className='incident-item-page'>
            <Toaster ></Toaster>
            <div className='incident-item-info'>
                <div className='incident-item-div'>
                <span id="incident-id-title">Номер інциденту: </span>
                <span id="incident-id">{params.id}</span><br></br>
                <span id="incident-datetime-title">Дата й час інциденту: </span>
                <span id="incident-datetime">{incident.date} {incident.time}</span><br></br>
                <span id="incident-zones-title">Зони спрацювання: </span>
                <span id="incident-zones">{incident.incidentzones}</span><br></br>
                <span id="incident-iterations-title">Кількість повторних: </span>
                <span id="incident-iterations">{incident.incidentiterations}</span><br></br>
                <span id="incident-danger-title">Рівень загрози: </span>
                <span id="incident-danger">{incident.incidentdanger}</span><br></br>
                </div>
                <div className='object-item-div'>
                <span id="object-id-title">Номер об'єкту: </span>
                <span id="object-id">{incident.objectid}</span><br></br>
                <span id="incident-category-title">Категорія об'єкту: </span>
                <span id="incident-category">{incident.objectcategory}</span><br></br>
                <span id="incident-coordinates-title">Координати об'єкту: </span>
                <span id="incident-coordinates">({Number(incident.objectlatitude).toFixed(2)}, {Number(incident.objectlongitude).toFixed(2)})</span><br></br>
                <span id="object-address-title">Адреса об'єкту: </span>
                <span id="object-address">{incident.objectstreet} {incident.objecthouse}</span>
                {incident.objectsection && <span id="object-section">, під'їзд {incident.objectsection}</span>}
                {incident.objectfloor && <span id="object-floor">, поверх {incident.objectfloor}</span>}
                {incident.objectapartment && <span id="object-apartment">, квартира {incident.objectapartment}</span>}
                </div>
                <div className='client-item-div'>
                <span id="client-id-title">Номер власника: </span>
                <span id="client-id">{incident.clientid}</span><br></br>
                <span id="client-name-title">ПІБ власника: </span>
                <span id="client-name">{incident.clientname}</span><br></br>
                <span id="client-address-title">Адреса власника: </span>
                <span id="client-address">{incident.clientaddress}</span><br></br>
                <span id="client-phone-title">Телефон власника: </span>
                <span id="client-phone">{incident.clientphone}</span><br></br>
                {incident.clientalternatephone && <span id="client-alternatephone-title">Альтернативний телефон власника: </span>}
                {incident.clientalternatephone && <span id="client-alternatephone">{incident.clientalternatephone}</span>}
                </div>                              
            </div>
            <div className='incident-item-actions'>
            {incident.length !== 0 && <IncidentsActions incident={incident}/> }
            </div>
            <div className='incident-item-map'>
                map
            </div>
        </div>
    );
};

export default IncidentsItemPage;