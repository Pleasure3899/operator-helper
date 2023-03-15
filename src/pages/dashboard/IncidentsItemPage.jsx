import React, { useState, useEffect } from 'react'
//import IncidentsItemPage from '../../components/UI/Incidents/IncidentsList';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet'
import AHP from 'ahp';
import PatrolMarker from '../../components/formap/PatrolMarker';
import toast, { Toaster } from 'react-hot-toast';

const IncidentsItemPage = () => {

    const errorAhpInput = () => toast.error("Помилка. Введіть від 1 до 9, або дробом в форматі 1/[1-9]");
    const sucessNotify = () => toast.success("Оновлено!");

    const VISICOM_API_KEY = process.env.REACT_APP_VISICOM_API_KEY;
    const coordinates = ['50.90068', '34.81324']
    const mapRef = useRef();
    const mapZoom = 12;
    const scrollWheelZoom = true;

    const params = useParams()

    const [incident, setIncidents] = useState([])
    const [patrols, setPatrols] = useState([])
    const [patrol, setPatrol] = useState([])
    const [operation, setOperaton] = useState([])
    const [routes, setRoutes] = useState([])
    const [statuses, setStatuses] = useState([])
    const [status, setStatus] = useState([])
    const [ahpResult, setAhpResult] = useState([])
    const ahpResultArray = [];
    const [disabled, setDisabled] = useState(false);
    var newOperation;
    var newTimestamp;

    const ahpContext = new AHP();
    var outputAHP;

    const fetchOperation = async () => {
        try {
            const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
            const response = await axios.get(BECKEND_URL + "/last-operation/" + incident.incidentid);
            setOperaton(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLastOperation = async () => {
        try {
            const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
            const response = await axios.get(BECKEND_URL + "/operations-lastid");
            newOperation = response.data[0].id + 1;
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchLastTimestamp = async () => {
        try {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
        const response = await axios.get(BECKEND_URL + "/timestamps-lastid");
        newTimestamp = response.data[0].id + 1;
        return response.data;
    } catch (error) {
        console.log(error);
    }
    };

    const addNewTimestamp = async () => {
        try {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
        const response = await axios.post(BECKEND_URL + "/timestamps", {id: newTimestamp});
        return response.data;
    } catch (error) {
        console.log(error);
    }
    };

    const setOperation = async () => {
        try {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
            var newOperationObject = { id: newOperation, incident_id: incident.incidentid, patrol_id: patrol.id, status_id: status.id, timestamp_id: newTimestamp}
            const response = await axios.post(BECKEND_URL + "/operations", newOperationObject);
            sucessNotify();
            fetchOperation();
            return response.data;
    } catch (error) {
        console.log(error);
    }
 
    };





    const setNewStatus = (e) => {
        e.preventDefault();

        fetchLastOperation()
        .then((data) => fetchLastTimestamp())
        .then((data) => addNewTimestamp())
        .then((data) => setOperation());
    }

    const calculateAHP = (routes) => {


        var rankCriteriaTimeProbability = prompt("Введіть від 1 до 9 значення критерію 'Час за який бригада приїде' до 'Ймовірність своєчасного і правильного виконання операції бригадою'")
        var regexp = new RegExp("^[1-9]$")
        var isValid = false;

        if (regexp.test(rankCriteriaTimeProbability)) {
            isValid = true;
        } else {
            if ((regexp.test(rankCriteriaTimeProbability[0])) && (regexp.test(rankCriteriaTimeProbability[2])) && (rankCriteriaTimeProbability[1] === "/") && (rankCriteriaTimeProbability.length === 3)) {
                isValid = true;
                rankCriteriaTimeProbability = rankCriteriaTimeProbability[0] / rankCriteriaTimeProbability[2]
            }
        }

        if (isValid) {

            setDisabled(true)

            for (var i = 0; i < routes.length; i++) {
                ahpContext.addItem("PatrolID " + routes[i].patrolid);
            }

            ahpContext.addCriteria(['Time', 'Probability']);


            var arraySize = 0;
            for (i = 1; i < routes.length; i++) {
                arraySize = arraySize + i;
            }


            var rankCriteriaTime = new Array(arraySize);
            var iterator = 0;
            for (i = 0; i < routes.length; i++) {
                for (var j = i + 1; j < routes.length; j++) {
                    var time1 = Number((routes[i].distance / 22).toFixed());
                    var time2 = Number((routes[j].distance / 22).toFixed());
                    rankCriteriaTime[iterator] = ['PatrolID ' + routes[i].patrolid, 'PatrolID ' + routes[j].patrolid, time2 / time1];
                    iterator++;
                }
            }

            ahpContext.rankCriteriaItem('Time', rankCriteriaTime);


            var rankCriteriaProbability = new Array(arraySize);
            iterator = 0;
            for (i = 0; i < routes.length; i++) {
                for (j = i + 1; j < routes.length; j++) {
                    var prob1 = Number(routes[i].probability);
                    var prob2 = Number(routes[j].probability);
                    rankCriteriaProbability[iterator] = ['PatrolID ' + routes[i].patrolid, 'PatrolID ' + routes[j].patrolid, prob1 / prob2];
                    iterator++;
                }
            }

            ahpContext.rankCriteriaItem('Probability', rankCriteriaProbability);


            ahpContext.rankCriteria(
                [
                    ['Time', 'Probability', rankCriteriaTimeProbability]
                ]
            );

            outputAHP = ahpContext.run();

            for (i = 0; i < outputAHP.rankedScores.length; i++) {
                var newScore = { patrolid: routes[i].patrolid, score: outputAHP.rankedScores[i].toFixed(5), distance: routes[i].distance, probability: routes[i].probability }
                ahpResultArray.push(newScore)
            }

            ahpResultArray.sort(function (a, b) {
                if (a.score < b.score) {
                    return 1;
                }
                if (a.score > b.score) {
                    return -1;
                }
                return 0;
            });

            setAhpResult(ahpResultArray)
        } else {
            errorAhpInput();
        }
    }

    

    const calculateClick = (e) => {
        e.preventDefault();

        calculateAHP(routes)
    }

    useEffect(() => {

        const fetchRoutes = () => {
            try {
                const API_KEY = process.env.REACT_APP_VISICOM_API_KEY;
                const destination = [incident.objectlongitude, incident.objectlatitude]
    
                patrols.map(async patrol => {
                    const origin = [patrol.longitude, patrol.latitude]
                    const response = await axios.get("https://api.visicom.ua/data-api/5.0/core/distance.json?origin=" + origin + "&destination=" + destination + "&geometry=path&mode=driving-shortest&key=" + API_KEY);
                    const newRoute = { patrolid: patrol.id, response: response.data, distance: response.data.properties.distance, probability: patrol.patrolprobability }
                    setRoutes(r => [...r, newRoute])
                    console.log(newRoute)
                })
    
            } catch (error) {
                console.log(error);
            }
        };

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

        const fetchAllPatrols = async () => {
            const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
            const response = await axios.get(BECKEND_URL + "/patrols-name");
            setPatrols(response.data);
            setPatrol(response.data[0])
            return response.data;
        };

        const fetchAllStatuses = async () => {
            try {
                const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
                const response = await axios.get(BECKEND_URL + "/statuses");
                setStatuses(response.data);
                setStatus(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchOperation = async () => {
            try {
                const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
                const response = await axios.get(BECKEND_URL + "/last-operation/" + incident.incidentid);
                setOperaton(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllPatrols()
            .then((data) => { fetchRoutes() });
        fetchOperation();
        fetchIncident();
        fetchAllStatuses();
    }, [params.id, incident.incidentchecked, incident.incidentid, incident.objectlatitude, incident.objectlongitude]);


    return (
        <div className='incident-item-page'>
            <Toaster toastOptions={{
                style: {
                    background: '#fff6df',
                    color: '#233044',
                },
            }} />
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
                {incident.length !== 0 && <div className="incident-actions-div">
                    <form onSubmit={setNewStatus} className="incident-actions-form">
                        <div>
                            <span className="title-span">Поточний статус: </span>
                            {operation && <span>{operation.statustitle}</span>}
                            {!operation && <span>відсутній</span>}
                            <br></br><span className="title-span">Бригада: </span>
                            {operation && <span>{operation.patrolid} - {operation.firstpatrolmanname}, {operation.secondpatrolmanname}</span>}
                            {!operation && <span>відсутня</span>}
                            <br></br><label className="title-span" htmlFor='status-id'>Змінити статус: </label>
                            <select>
                                {statuses.map(status =>
                                    <option onClick={e => setStatus(status)} key={status.id} value={status.id}>
                                        {status.id} - {status.title}
                                    </option>
                                )}
                            </select>
                            <br></br><label className="title-span" htmlFor='patrol-id'>Обрати патруль: </label>
                            <select>
                                {patrols.map(patrol =>
                                    <option onClick={e => setPatrol(patrol)} key={patrol.id} value={patrol.id}>
                                        {patrol.id} - {patrol.firstpatrolmanname}, {patrol.secondpatrolmanname}
                                    </option>
                                )}
                            </select>
                        </div>

                        <div>
                            <button type="submit">Додати</button>
                        </div>
                    </form>
                </div>}
                <div className="ahp-div">
                    <button disabled={disabled} onClick={calculateClick}>Обрати патруль методом аналізу ієрархій</button><br></br>
                    {ahpResult.map(result =>
                        <div key={result.patrolid}>
                            <span className='title-span'>Бригада: </span>
                            <span>{result.patrolid}, </span>
                            <span className='title-span'>Результат: </span>
                            <span>{result.score}, </span>
                            <span className='title-span'>Відстань: </span>
                            <span>{result.distance}м, </span>
                            <span className='title-span'>Ймовірність: </span>
                            <span>{result.probability}</span><br></br>
                        </div>

                    )}
                </div>
            </div>
            <div className='incident-item-map'>

                <MapContainer
                    dragging={scrollWheelZoom}
                    center={coordinates} zoom={mapZoom}
                    ref={mapRef}>
                    <TileLayer
                        attribution='Дані карт © АТ «<a href="https://api.visicom.ua/">Visicom</a>»'
                        url={"https://tms{s}.visicom.ua/2.0.0/ua/base/{z}/{x}/{y}.png?key=" + VISICOM_API_KEY}
                        subdomains={'123'}
                        tms={true}
                    />

                    {routes.map(route =>
                        route.patrolid === patrol.id && <GeoJSON key={route.patrolid} data={route.response} />
                    )}

                    {patrols.map(patrol =>
                        <PatrolMarker patrol={patrol} key={patrol.id} />
                    )}

                    {incident.length !== 0 &&
                        <Marker position={[incident.objectlatitude, incident.objectlongitude]}></Marker>}

                </MapContainer>

            </div>
        </div>
    );
};

export default IncidentsItemPage;