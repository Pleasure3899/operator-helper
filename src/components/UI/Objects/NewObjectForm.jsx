import React, { useEffect, useState } from 'react';
import '../../../styles/ObjectsPage.css'
import getLastId from '../../common/getLastId';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import FormMap from '../FormMap';

const sucessNotify = () => toast.success("Об'єкт успішно додано!");
const errorNotify = (props) => toast.error("Об'єкт не вдалось додати!\n" + props);

const NewObjectForm = () => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
	const [objects, setObjects] = useState([])
	const [object, setObject] = useState({ street: '', house: '', section: '', floor: '', apartment: '', latitude: '', longitude: '', category: '3', pets: '0', client_id: '' })
	const [clients, setClients] = useState([])
	useEffect(() => {
		const fetchAllObjects = async () => {
			try {
				const response = await axios.get(BECKEND_URL + "/objects");
				setObjects(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		const fetchAllClients = async () => {
				await axios.get(BECKEND_URL + "/clients").then((response) => {
					setClients(response.data)
					setObject(object => ({...object, client_id: response.data[0].id}))
				}).catch((error) => console.log(error))
			};
		fetchAllObjects();
		fetchAllClients();
	}, [BECKEND_URL]);

	const addNewObject = async (e) => {
		e.preventDefault()
		var lastId = getLastId(objects) + 1
		var newObject = { id: lastId, street: object.street, house: object.house, section: object.section, floor: object.floor, apartment: object.apartment, latitude: object.latitude, longitude: object.longitude, category: object.category, pets: object.pets, client_id: object.client_id}
		try {
			const response = await axios.post(BECKEND_URL + "/objects", newObject);
			if (response.data.errno) {
				errorNotify(response.data.sqlMessage);
			} else {
				sucessNotify();
				setObjects([...objects, newObject])
			}
		} catch (error) {
			errorNotify(error);
			console.log(error);
		}
	}

	const setCoordinates = (e) => {
		setObject(object => ({ ...object, latitude: e.latlng.lat, longitude: e.latlng.lng }));
	}

	const resetFields = (e) => {
		e.preventDefault();
		setObject({...object, street: '', house: '', section: '', floor: '', apartment: '', latitude: '', longitude: '', category: '3', pets: '0'});
	}

	return (
		<div className="newobjectcomponent">
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
					onChange={e => setObject({ ...object, latitude: e.target.value }) }
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
				/>
			</div>
			<div>
				<label htmlFor='category'>Категорія:</label>
				<br />
				<select onChange={e => setObject({ ...object, category: e.target.value })} defaultValue={3}>
					<option value={1}>
						Перша
					</option>
					<option value={2}>
						Друга
					</option>
					<option value={3}>
						Третя
					</option>
				</select>
			</div>
			<div>
				<label htmlFor='pets'>Домашні тварини:</label>
				<br />
				<select onChange={e => setObject({ ...object, pets: e.target.value })} defaultValue={0}>
					<option value={0}>
						Ні
					</option>
					<option value={1}>
						Так
					</option>
				</select>
			</div>
			<div>
				<label htmlFor='client_id'>Власник:</label>
				<br />
				<select > 
					{clients.map(client =>
						<option onClick={e => setObject({ ...object, client_id: e.target.value })} key={client.id} value={client.id}>
							{client.id} - {client.surname} {client.name}
						</option>
          			)}
				</select>
			</div>
			<div>
				<button type="submit">Додати</button>
				<button onClick={resetFields}>Очистити</button>
			</div>
		</form>
		<FormMap setCoordinates={setCoordinates}/>
		</div>
	);
};


export default NewObjectForm
