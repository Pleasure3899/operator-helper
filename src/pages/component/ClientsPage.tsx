import React from 'react'
import NewClientForm from '../../components/UI/Clients/NewClientForm';
import ClientsList from '../../components/UI/Clients/ClientsList';

const PatrolmenPage = () => {
    return (
        <div className="clientspage">
            <NewClientForm />
            <ClientsList />
        </div>
    );
};

export default PatrolmenPage;