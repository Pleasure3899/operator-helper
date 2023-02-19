import React from 'react'
import { Toaster } from 'react-hot-toast';
import IncidentsList from '../../components/UI/Incidents/IncidentsList';

const IncidentsPage = () => {
    return (
        <div>
            <Toaster ></Toaster>
            <IncidentsList />
        </div>
    );
};

export default IncidentsPage;
