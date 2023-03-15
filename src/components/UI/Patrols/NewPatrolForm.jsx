import React, { useEffect, useState } from 'react';
import '../../../styles/PatrolsPage.css'
import getLastId from '../../common/getLastId';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import FormMap from '../FormMap';

const sucessNotify = () => toast.success("Бригаду успішно додано!");
const errorNotify = (props) => toast.error("Бригаду не вдалось додати!\n" + props);

const NewPatrolForm = () => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
	const [patrols, setPatrols] = useState([])
	const [patrol, setPatrol] = useState({ first_patrolman_id: '', second_patrolman_id: '', latitude: '', longitude: '', patrol_is_active: '0', probability: '' })
	const [patrolmen, setPatrolmen] = useState([])
	useEffect(() => {
		const fetchAllPatrols = async () => {
			try {
				const response = await axios.get(BECKEND_URL + "/patrols");
				setPatrols(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		const fetchAllPatrolmen = async () => {
			await axios.get(BECKEND_URL + "/patrolmen").then((response) => {
				setPatrolmen(response.data)
				setPatrol(patrol => ({ ...patrol, first_patrolman_id: response.data[0].id, second_patrolman_id: response.data[0].id }))
			}).catch((error) => console.log(error))
		};
		fetchAllPatrols();
		fetchAllPatrolmen();
	}, [BECKEND_URL]);

	const addNewPatrol = async (e) => {
		e.preventDefault()
		var lastId = getLastId(patrols) + 1
		var newPatrol = { id: lastId, first_patrolman_id: patrol.first_patrolman_id, second_patrolman_id: patrol.second_patrolman_id, latitude: patrol.latitude, longitude: patrol.longitude, patrol_is_active: patrol.patrol_is_active, probability: patrol.probability }
		try {
			if (patrol.first_patrolman_id === patrol.second_patrolman_id) {
				throw new Error('Оберіть різних патральних!');
			}
			if ((Number(patrol.probability) <= 0) || (Number(patrol.probability) > 100)) {
				throw new Error('Ймовірність може бути від 1 до 100');
			}
			const response = await axios.post(BECKEND_URL + "/patrols", newPatrol);
			if (response.data.errno) {
				errorNotify(response.data.sqlMessage);
			} else {
				sucessNotify();
				setPatrols([...patrols, newPatrol])
			}
		} catch (error) {
			errorNotify(error);
			console.log(error);
		}
	}

	const setCoordinates = (e) => {
		setPatrol(patrol => ({ ...patrol, latitude: e.latlng.lat, longitude: e.latlng.lng }));
	}

	const resetFields = (e) => {
		e.preventDefault();
		setPatrol({ ...patrol, latitude: '', longitude: '', patrol_is_active: '0' });
	}

	return (
		<div className="newpatrolcomponent">

			<form onSubmit={addNewPatrol} className="newpatrolform">
				<Toaster toastOptions={{
					style: {
						background: '#fff6df',
						color: '#233044',
					},
				}} />
				<div>
					<label htmlFor='first_patrolman_id'>Перший патрульний:</label>
					<br />
					<select>
						{patrolmen.map(patrolman =>
							<option onClick={e => setPatrol({ ...patrol, first_patrolman_id: e.target.value })} key={patrolman.id} value={patrolman.id}>
								{patrolman.id} - {patrolman.full_name}
							</option>
						)}
					</select>
				</div>
				<div>
					<label htmlFor='second_patrolman_id'>Другий патрульний:</label>
					<br />
					<select>
						{patrolmen.map(patrolman =>
							<option onClick={e => setPatrol({ ...patrol, second_patrolman_id: e.target.value })} key={patrolman.id} value={patrolman.id}>
								{patrolman.id} - {patrolman.full_name}
							</option>
						)}
					</select>
				</div>
				<div>
					<label htmlFor='latitude'>Широта:</label>
					<br />
					<input
						name='latitude'
						placeholder='Вкажіть широту'
						value={patrol.latitude}
						onChange={e => setPatrol({ ...patrol, latitude: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='longitude'>Довгота:</label>
					<br />
					<input
						name='longitude'
						placeholder='Вкажіть довготу'
						value={patrol.longitude}
						onChange={e => setPatrol({ ...patrol, longitude: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='probability'>Ймовірність правильного і своєчасного виконання операції:</label>
					<br />
					<input
						name='probability'
						type="number"
						min="1" 
						max="100"
						placeholder='Вкажіть ймовірність'
						value={patrol.probability}
						onChange={e => setPatrol({ ...patrol, probability: Number(e.target.value) })}
					/>
				</div>
				<div>
					<label htmlFor='patrol_is_active'>Зробити бригаду активною?</label>
					<br />
					<select onChange={e => setPatrol({ ...patrol, patrol_is_active: e.target.value })} defaultValue={0}>
						<option value={0}>
							Ні
						</option>
						<option value={1}>
							Так
						</option>
					</select>
				</div>
				<div>
					<button type="submit">Додати</button>
					<button onClick={resetFields}>Очистити</button>
				</div>
			</form>
			<FormMap setCoordinates={setCoordinates} />
		</div>
	);
};


export default NewPatrolForm
