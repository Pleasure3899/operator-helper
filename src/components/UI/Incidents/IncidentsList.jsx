import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../../styles/IncidentsPage.css'
import IncidentsListMap from "./IncidentsListMap";

const IncidentsList = () => {

  const updateDanger = async (id, danger) => {
    try {
      const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
      await axios.put(BECKEND_URL + "/incident-danger/" + id, { danger: danger });
    } catch (error) {
      console.log(error);
    }
  }

  const [openedIncidents, setOpenedIncidents] = useState([])

  useEffect(() => {

    const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

    const setDanger = (openedIncidents) => {
      for (var i = 0; i < openedIncidents.length; i++) {
        if (!(openedIncidents[i].incidentdanger)) {
          if (openedIncidents[i].incidentzones >= 3.5) {
            let danger = "Високий"
            updateDanger(openedIncidents[i].incidentid, danger)
            openedIncidents[i].incidentdanger = danger
          } else {
            if (openedIncidents[i].objectpets === 0) {
              if (openedIncidents[i].objectcategory < 1.5) {
                let danger = "Високий"
                updateDanger(openedIncidents[i].incidentid, danger)
                openedIncidents[i].incidentdanger = danger
              } else {
                if (openedIncidents[i].objectcategory >= 1.5) {
                  let danger = "Середній"
                  updateDanger(openedIncidents[i].incidentid, danger)
                  openedIncidents[i].incidentdanger = danger
                }
              }
            } else {
              if (openedIncidents[i].objectpets === 1) {
                if (openedIncidents[i].incidentiterations < 0.5) {
                  let danger = "Фейк"
                  updateDanger(openedIncidents[i].incidentid, danger)
                  openedIncidents[i].incidentdanger = danger
                } else {
                  if (openedIncidents[i].incidentiterations >= 0.5) {
                    let danger = "Низький"
                    updateDanger(openedIncidents[i].incidentid, danger)
                    openedIncidents[i].incidentdanger = danger
                  }
                }
              }
            }
          }
        }
        setOpenedIncidents(openedIncidents);
      }
    }

    const fetchAllIncidents = async () => {
      try {
        const response = await axios.get(BECKEND_URL + "/opened-incidents");
        setDanger(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    function noDelaySetInterval(func, interval) {
      func();
      return setInterval(func, interval);
    }

    noDelaySetInterval(fetchAllIncidents, 2000);

  }, []);

  return (

    <div className="IncidentsList">
      {openedIncidents.map(incident =>
        <Link key={incident.incidentid} className="incident-link" to={`/dashboard/incidents/${incident.incidentid}`}>
          <div className="incident-div">
            <div className="incident-text">
              <div className="incident-info">
                {incident.incidentchecked !== 1 && <div id="incident-unchecked">Новий</div>}
                {incident.incidentchecked !== 0 && <div id="incident-checked">В процесі</div>}
                <span id="incident-id-title">Інцидент</span>
                <span id="incident-id"> | Номер {incident.incidentid} | </span>
                <span id="incident-datetime">{incident.date} {incident.time} | </span>
                <span id="incident-zones">Зони {incident.incidentzones} | </span>
                <span id="incident-iterations">Повторень {incident.incidentiterations} | </span>
                <span id="incident-category">Категорія {incident.objectcategory}</span>
                <span id="incident-coordinates"> | Координати ({Number(incident.objectlatitude).toFixed(2)}, {Number(incident.objectlongitude).toFixed(2)})</span>
              </div>
              <div className="object-info">
                <span id="object-id-title">Об'єкт</span>
                <span id="object-id"> | Номер {incident.objectid} | </span>
                <span id="object-address">{incident.objectstreet} {incident.objecthouse}</span>
                {incident.objectsection && <span id="object-section">, під'їзд {incident.objectsection}</span>}
                {incident.objectfloor && <span id="object-floor">, поверх {incident.objectfloor}</span>}
                {incident.objectapartment && <span id="object-apartment">, квартира {incident.objectapartment}</span>}
                {incident.objectpets !== 0 && <span id="object-pets"> | Є тварини</span>}
              </div>
              <div className="client-info">
                <span id="client-id-title">Клієнт</span>
                <span id="client-id"> | Номер {incident.clientid} | </span>
                <span id="client-name">{incident.clientname} | </span>
                <span id="client-address">{incident.clientaddress} | </span>
                <span id="client-phone">{incident.clientphone}</span>
                {incident.clientalternatephone && <span id="client-alternatephone"> | {incident.clientalternatephone}</span>}
              </div>
              <div className="danger-info">
                <span id="danger-info-title">Рівень загрози</span>
                <span id="danger-info"> - {incident.incidentdanger}</span>
              </div>
            </div>
            <div id="incident-map">
              <IncidentsListMap latitude={incident.objectlatitude} longitude={incident.objectlongitude} />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default IncidentsList
