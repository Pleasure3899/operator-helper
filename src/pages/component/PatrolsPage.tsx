import React from 'react'
import NewPatrolForm from '../../components/UI/Patrols/NewPatrolForm';
import PatrolsList from '../../components/UI/Patrols/PatrolsList';

const PatrolsPage = () => {
    return (
        <div className="patrolspage">
            <NewPatrolForm />
            <PatrolsList />
        </div>
    );
};

export default PatrolsPage;
