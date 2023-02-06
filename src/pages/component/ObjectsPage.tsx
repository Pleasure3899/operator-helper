import NewObjectForm from '../../components/UI/Objects/NewObjectForm';
import ObjectsList from '../../components/UI/Objects/ObjectsList';

const ObjectPage = () => {

    return (
        <div className="objectspage">
            <NewObjectForm />
            <ObjectsList />
        </div>
    );
};

export default ObjectPage;
