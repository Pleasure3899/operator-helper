import React, { useState, useEffect } from 'react'
import { Dialog } from "@mui/material"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import '../../../styles/ObjectsPage.css'

const sucessNotify = () => toast.success("Оновлено!");
const errorNotify = (props) => toast.error("Об'єкт не вдалось оновити!\n" + props);

const UpdateObjectForm = (props) => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

	const [object, setObject] = useState({ id: '', street: '', house: '', section: '', floor: '', apartment: '', latitude: '', longitude: '', category: props.objectToUpdate.category, pets: props.objectToUpdate.pets, client_id: props.objectToUpdate.client_id, object_is_active: props.objectToUpdate.object_is_active})
	const [clients, setClients] = useState([])

	useEffect(() => {
		const fetchObject = async () => {
			await axios.get(BECKEND_URL + "/objects/" + props.objectToUpdate.id).then((response) => {
				setObject(response.data[0])
			}).catch((error) => console.log(error))
		};
		const fetchAllClients = async () => {
			await axios.get(BECKEND_URL + "/clients").then((response) => {
				setClients(response.data)
			}).catch((error) => console.log(error))
		};
		fetchObject();
		fetchAllClients();
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
						value={object.section == null ? '' : object.section}
						onChange={e => setObject({ ...object, section: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='floor'>Поверх:</label>
					<br />
					<input
						name='floor'
						placeholder='Вкажіть поверх (може бути порожнім)'
						value={object.floor == null ? '' : object.floor}
						onChange={e => setObject({ ...object, floor: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='apartment'>Квартира:</label>
					<br />
					<input
						name='apartment'
						placeholder='Вкажіть номер квартири (може бути порожнім)'
						value={object.apartment == null ? '' : object.apartment}
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
					<label htmlFor='category'>Категорія:</label>
					<br />
					<select onChange={e => setObject({ ...object, category: e.target.value })} value={object.category}>
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
					<select onChange={e => setObject({ ...object, pets: e.target.value })} value={object.pets}>
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
					<select onChange={e => setObject({ ...object, client_id: e.target.value })} value={object.client_id}> 
					{clients.map(client =>
						<option key={client.id} value={client.id}>
							{client.id} - {client.surname} {client.name}
						</option>
          			)}
				</select>
				</div>
				<div>
					<label htmlFor='object_is_active'>Зробити бригаду активною?</label>
					<br />
					<select onChange={e => setObject({ ...object, object_is_active: e.target.value })} value={object.object_is_active}>
					<option value={0}>
						Ні
					</option>
					<option value={1}>
						Так
					</option>
				</select>
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