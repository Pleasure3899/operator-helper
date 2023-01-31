import NewObjectForm from '../../components/UI/NewObjectForm';
import ObjectsList from '../../components/UI/ObjectsList';

const ObjectPage = () => {

    return (
        <div className="objectspage">
            <NewObjectForm />
            <ObjectsList />
        </div>
    );
};

export default ObjectPage;
