import React, { useEffect, useState } from 'react';
import '../../styles/NewObjectForm.css'
import getLastId from '../common/getLastId';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const sucessNotify = () => toast.success("Об'єкт успішно додано!");
const errorNotify = (props) => toast.error("Об'єкт не вдалось додати!\n" + props);

const NewObjectForm = () => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
	const [objects, setObjects] = useState([])
	const [object, setObject] = useState({ street: '', house: '', section: '', floor: '', apartment: '', latitude: '', longitude: '' })

	useEffect(() => {
		const fetchAllObjects = async () => {
			try {
				const response = await axios.get(BECKEND_URL + "/objects");
				setObjects(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllObjects();
	}, [BECKEND_URL]);

	const addNewObject = async (e) => {
		e.preventDefault()
		var lastId = getLastId(objects) + 1
		var newObject = { id: lastId, latitude: object.latitude, longitude: object.longitude }
		try {
			const response = await axios.post(BECKEND_URL + "/objects", newObject);
			if (response.data.errno) {
				errorNotify(response.data.sqlMessage);
			} else {
				sucessNotify();
				setObjects([...objects, newObject])
			}
		} catch (error) {
			errorNotify();
			console.log(error);
		}
	}

	const resetFields = (e) => {
		e.preventDefault();
		setObject({ street: '', house: '', section: '', floor: '', apartment: '', latitude: '', longitude: '' });
	}

	return (
		<form onSubmit={addNewObject} className="newobjectform">
			<Toaster toastOptions={{
				style: {
					background: '#fff6df',
					color: '#233044',
				},
			}} />
			<div>
				<label htmlFor='street'>Вулиця:</label>
				<br />
				<input
					name='street'
					placeholder='Вкажіть назву вулиці'
					value={object.street}
					onChange={e => setObject({ ...object, street: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor='house'>Будинок:</label>
				<br />
				<input
					name='house'
					placeholder='Вкажіть номер будинку'
					value={object.house}
					onChange={e => setObject({ ...object, house: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor='section'>Під'їзд:</label>
				<br />
				<input
					name='section'
					placeholder="Вкажіть номер під'їзду (може бути порожнім)"
					value={object.section}
					onChange={e => setObject({ ...object, section: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor='floor'>Поверх:</label>
				<br />
				<input
					name='floor'
					placeholder='Вкажіть поверх (може бути порожнім)'
					value={object.floor}
					onChange={e => setObject({ ...object, floor: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor='apartment'>Квартира:</label>
				<br />
				<input
					name='apartment'
					placeholder='Вкажіть номер квартири (може бути порожнім)'
					value={object.apartment}
					onChange={e => setObject({ ...object, apartment: e.target.value })}
				/>
			</div>
			<div>
				<label htmlFor='latitude'>Широта:</label>
				<br />
				<input
					name='latitude'
					placeholder='Вкажіть широту'
					value={object.latitude}
					onChange={e => setObject({ ...object, latitude: e.target.value })}
				//pattern="/^[\d,.]*$/"
				/>
			</div>
			<div>
				<label htmlFor='longitude'>Довгота:</label>
				<br />
				<input
					name='longitude'
					placeholder='Вкажіть довготу'
					value={object.longitude}
					onChange={e => setObject({ ...object, longitude: e.target.value })}
				//pattern="/^[\d,.]*$/"
				/>
			</div>
			<div>
				<button type="submit">Додати</button>
				<button onClick={resetFields}>Очистити</button>
			</div>
		</form>
	);
};


export default NewObjectForm
