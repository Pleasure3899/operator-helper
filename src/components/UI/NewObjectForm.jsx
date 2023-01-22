import React, {useContext, useState} from 'react';
import './NewObjectForm.css'
import { ObjectsContext } from '../../context';
import getLastValue
 from '../common/getLastId';
const NewObjectForm = () => {
	const [object, setObject] = useState({street:'', house:'', section:'', floor:'', apartment:'', latitude:'', longitude:''})
	const {objects, setObjects} = useContext(ObjectsContext)
	const addNewObject = (e) => {
        e.preventDefault()
		var lastId = getLastValue(objects) + 1
		var newObject = { id: lastId,  "coordinates": [object.latitude,object.longitude]}
		setObjects([...objects, newObject])
        setObject({street:'', house:'', section:'', floor:'', apartment:'', latitude:'', longitude:''})
    }
	
	return(
	<form className="newobjectform">
		<div>
		<label htmlFor='street'>Вулиця:</label>
		<br/>
		<input
			name='street'
			placeholder='Вкажіть назву вулиці'
			value = {object.street}
			onChange={e => setObject({...object, street: e.target.value})}
		/>
		</div>
		<div>
		<label htmlFor='house'>Будинок:</label>
		<br/>
		<input
			name='house'
			placeholder='Вкажіть номер будинку'
			value={object.house}
			onChange={e => setObject({...object, house: e.target.value})}
		/>
		</div>
		<div>
		<label htmlFor='section'>Під'їзд:</label>
		<br/>
		<input
			name='section'
			placeholder="Вкажіть номер під'їзду (може бути порожнім)"
			value={object.section}
			onChange={e => setObject({...object, section: e.target.value})}
		/>
		</div>
		<div>
		<label htmlFor='floor'>Поверх:</label>
		<br/>
		<input
			name='floor'
			placeholder='Вкажіть поверх (може бути порожнім)'
			value={object.floor}
			onChange={e => setObject({...object, floor: e.target.value})}
		/>
		</div>
		<div>
		<label htmlFor='apartment'>Квартира:</label>
		<br/>
		<input
			name='apartment'
			placeholder='Вкажіть номер квартири (може бути порожнім)'
			value={object.apartment}
			onChange={e => setObject({...object, apartment: e.target.value})}
		/>
		</div>
        <div>
		<label htmlFor='latitude'>Широта:</label>
		<br/>
		<input
			name='latitude'
			placeholder='Вкажіть широту'
			value={object.latitude}
			onChange={e => setObject({...object, latitude: e.target.value})}
			//pattern="/^[\d,.]*$/"
		/>
		</div>
        <div>
		<label htmlFor='longitude'>Довгота:</label>
		<br/>
		<input
			name='longitude'
			placeholder='Вкажіть довготу'
			value={object.longitude}
			onChange={e => setObject({...object, longitude: e.target.value})}
			//pattern="/^[\d,.]*$/"
		/>
		</div>
		<div>
		<button onClick={addNewObject}>Додати</button>
		</div>
	</form>
	);
};


export default NewObjectForm
