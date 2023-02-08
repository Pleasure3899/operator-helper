import React from 'react'
import NewPatrolmanForm from '../../components/UI/Patrolmen/NewPatrolmanForm';
import PatrolmenList from '../../components/UI/Patrolmen/PatrolmenList';

const PatrolmenPage = () => {
    return (
        <div className="patrolmenpage">
            <NewPatrolmanForm />
            <PatrolmenList />
        </div>
    );
};

export default PatrolmenPage;