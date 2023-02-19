import React from 'react'
import { Toaster } from 'react-hot-toast';
//import IncidentsItemPage from '../../components/UI/Incidents/IncidentsList';
import { useParams } from 'react-router-dom';
import axios from "axios";

const IncidentsItemPage = () => {

    const params = useParams()

    const checkIncident = async (e) => {
        const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
        try {
            await axios.put(BECKEND_URL + "/check-incident/" + params.id);
        } catch (error) {
            console.log(error);
        }
    }

    checkIncident()

    return (
        <div>
            <Toaster ></Toaster>
            {params.id}
        </div>
    );
};

export default IncidentsItemPage;