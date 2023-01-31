import React, { useState, useEffect } from 'react'
import { Dialog } from "@mui/material"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import '../../styles/UpdateObjectForm.css'

const sucessNotify = () => toast.success("Оновлено!");
const errorNotify = (props) => toast.error("Об'єкт не вдалось оновити!\n" + props);

const UpdateObjectForm = (props) => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

	const [object, setObject] = useState({ id: '', street: '', house: '', section: '', floor: '', apartment: '', latitude: '', longitude: '' })

	useEffect(() => {
		const fetchObject = async () => {
			await axios.get(BECKEND_URL + "/objects/" + props.objectToUpdate.id).then((response) => {
				setObject({ ...object, id: response.data[0].id, latitude: response.data[0].latitude, longitude: response.data[0].longitude })
			}).catch((error) => console.log(error))
		};
		fetchObject();
	}, [props.objectToUpdate.id, BECKEND_URL]);


	const cancelUpdate = (e) => {
		e.preventDefault();
		props.handleUpdateClose();
	}

	const updateObject = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(BECKEND_URL + "/objects/" + object.id, object);
			if (response.data.errno) {
				errorNotify(response.data.sqlMessage);
			} else {
				sucessNotify();
				props.handleUpdateClose();
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Dialog open={props.modalOpened} onClose={props.handleUpdateClose}>

			<form onSubmit={updateObject} className="updateobjectform">
				<Toaster toastOptions={{
					style: {
						background: '#fff6df',
						color: '#233044',
					},
				}} />
				<div>
					<label htmlFor='id'>Номер:</label>
					<br />
					<input
						name='id'
						disabled={true}
						value={object.id}
						onChange={e => setObject({ ...object, id: e.target.value })}
					/>
				</div>
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
						value={object.latitude}
						placeholder='Вкажіть широту'
						onChange={e => setObject({ ...object, latitude: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='longitude'>Довгота:</label>
					<br />
					<input
						name='longitude'
						value={object.longitude}
						placeholder='Вкажіть довготу'
						onChange={e => setObject({ ...object, longitude: e.target.value })}
					/>
				</div>
				<div>
					<button type="submit">Оновити</button>
					<button onClick={cancelUpdate}>Скасувати</button>
				</div>
			</form>
		</Dialog>
	);
};

export default UpdateObjectForm;