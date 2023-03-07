import axios from "axios";
import React, { useState, useEffect } from 'react';
import '../../../styles/IncidentsPage.css'

const IncidentsActions = (props) => {

    const [patrols, setPatrols] = useState([])
    const [patrol, setPatrol] = useState([])
    const [operation, setOperaton] = useState([])

    const setNewStatus = (e) => {
		e.preventDefault();
        console.log(patrol)		
	}

    useEffect(() => {
        
        const fetchAllPatrols = async () => {
            try {
                const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
                const response = await axios.get(BECKEND_URL + "/patrols-name");
                setPatrols(response.data);
            } catch (error) {
                console.log(error);
            }
        };
    
        const fetchOperation = async () => {
            try {
                const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
                const response = await axios.get(BECKEND_URL + "/last-operation/"+props.incident.incidentid);
                setOperaton(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchAllPatrols();
        fetchOperation();
    }, [props.incident.incidentid]);

  return (

    <div className="incident-actions-div">

    <form onSubmit={setNewStatus} className="incident-actions-form">
				<div>
                    {operation && <span>Поточний статус: </span>}
                    {operation && <span>{operation.statustitle}</span>}
                    <br></br><label htmlFor='patrol-id'>Обрати патруль: </label>
					<select>
						{patrols.map(patrol =>
							<option onClick={e => setPatrol(patrol)} key={patrol.patrolid} value={patrol.patrolid}>
								{patrol.patrolid} - {patrol.firstpatrolmanname}, {patrol.secondpatrolmanname}
							</option>
						)}
					</select>
				</div>
				
				<div>
					<button type="submit">Додати</button>
				</div>
			</form>


    </div>
  );
};

export default IncidentsActions
