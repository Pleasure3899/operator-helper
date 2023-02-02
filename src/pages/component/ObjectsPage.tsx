import NewObjectForm from '../../components/UI/NewObjectForm';
import NewObjectFormMap from '../../components/UI/NewObjectFormMap';
import ObjectsList from '../../components/UI/ObjectsList';

const ObjectPage = () => {

    return (
        <div className="objectspage">
            <div className="newobjectcomponent">
                <NewObjectForm />
                <NewObjectFormMap />
            </div>
            <ObjectsList />
        </div>
    );
};

export default ObjectPage;
