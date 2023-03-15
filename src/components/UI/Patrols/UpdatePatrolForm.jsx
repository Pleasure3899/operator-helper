import React, { useState, useEffect } from 'react'
import { Dialog } from "@mui/material"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import '../../../styles/ObjectsPage.css'

const sucessNotify = () => toast.success("Оновлено!");
const errorNotify = (props) => toast.error("Об'єкт не вдалось оновити!\n" + props);

const UpdatePatrolForm = (props) => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

	const [patrol, setPatrol] = useState({ id: '', first_patrolman_id: '', second_patrolman_id: '', latitude: '', longitude: '', patrol_is_active: '', probability: ''})
	const [patrolmen, setPatrolmen] = useState([])

	useEffect(() => {
		const fetchPatrol = async () => {
			await axios.get(BECKEND_URL + "/patrols/" + props.patrolToUpdate.id).then((response) => {
				setPatrol(response.data[0])
			}).catch((error) => console.log(error))
		};
		const fetchAllPatrolmen = async () => {
			await axios.get(BECKEND_URL + "/patrolmen").then((response) => {
				setPatrolmen(response.data)
			}).catch((error) => console.log(error))
		};
		fetchPatrol();
		fetchAllPatrolmen();
	}, [props.patrolToUpdate.id, BECKEND_URL]);

	const cancelUpdate = (e) => {
		e.preventDefault();
		props.handleUpdateClose();
	}

	const updatePatrol = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(BECKEND_URL + "/patrols/" + patrol.id, patrol);
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

			<form onSubmit={updatePatrol} className="updatepatrolform">
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
						value={patrol.id}
						onChange={e => setPatrol({ ...patrol, id: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='first_patrolman_id'>Перший патрульний:</label>
					<br />
					<select onChange={e => setPatrol({ ...patrol, first_patrolman_id: e.target.value })} value={patrol.first_patrolman_id}> 
					{patrolmen.map(patrolman =>
						<option key={patrolman.id} value={patrolman.id}>
							{patrolman.id} - {patrolman.full_name}
						</option>
          			)}
				</select>
				</div>
                <div>
					<label htmlFor='second_patrolman_id'>Другий патрульний:</label>
					<br />
					<select onChange={e => setPatrol({ ...patrol, second_patrolman_id: e.target.value })} value={patrol.second_patrolman_id}> 
					{patrolmen.map(patrolman =>
						<option key={patrolman.id} value={patrolman.id}>
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
						value={patrol.latitude}
						placeholder='Вкажіть широту'
						onChange={e => setPatrol({ ...patrol, latitude: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='longitude'>Довгота:</label>
					<br />
					<input
						name='longitude'
						value={patrol.longitude}
						placeholder='Вкажіть довготу'
						onChange={e => setPatrol({ ...patrol, longitude: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='probability'>Ймовірність:</label>
					<br />
					<input
						name='probability'
						type='number'
						min='1'
						max='100'
						value={patrol.probability}
						placeholder='Вкажіть ймовірність'
						onChange={e => setPatrol({ ...patrol, probability: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='patrol_is_active'>Зробити бригаду активною?</label>
					<br />
					<select onChange={e => setPatrol({ ...patrol, patrol_is_active: e.target.value })} value={patrol.patrol_is_active}>
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

export default UpdatePatrolForm;