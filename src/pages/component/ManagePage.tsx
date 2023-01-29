import NewObjectForm from '../../components/UI/NewObjectForm';
import ObjectsList from '../../components/UI/ObjectsList';

const ManagePage = () => {

    return (
        <div className="objectspage">
            <NewObjectForm />
            <ObjectsList />
        </div>
    );
};

export default ManagePage;
