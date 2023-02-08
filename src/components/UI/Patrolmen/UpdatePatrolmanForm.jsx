import React, { useState, useEffect } from 'react'
import { Dialog } from "@mui/material"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import '../../../styles/PatrolmenPage.css'

const sucessNotify = () => toast.success("Оновлено!");
const errorNotify = (props) => toast.error("Патрульного не вдалось оновити!\n" + props);

const UpdatePatrolmanForm = (props) => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

	const [patrolman, setPatrolman] = useState({ id: '', full_name: '', age: '', experience: '', })

	useEffect(() => {
		const fetchPatrolman = async () => {
			await axios.get(BECKEND_URL + "/patrolmen/" + props.patrolmanToUpdate.id).then((response) => {
				setPatrolman(response.data[0])
			}).catch((error) => console.log(error))
		};
		fetchPatrolman();
	}, [props.patrolmanToUpdate.id, BECKEND_URL]);

	const cancelUpdate = (e) => {
		e.preventDefault();
		props.handleUpdateClose();
	}

	const updatePatrolman = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(BECKEND_URL + "/patrolmen/" + patrolman.id, patrolman);
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

			<form onSubmit={updatePatrolman} className="updatepatrolmanform">
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
						value={patrolman.id}
						onChange={e => setPatrolman({ ...patrolman, id: e.target.value })}
					/>
				</div>
                <div>
					<label htmlFor='full_name'>ПІБ:</label>
					<br />
					<input
						name='full_name'
						value={patrolman.full_name}
						onChange={e => setPatrolman({ ...patrolman, full_name: e.target.value })}
					/>
				</div>
                <div>
					<label htmlFor='age'>Вік:</label>
					<br />
					<input
						name='age'
						value={patrolman.age}
						onChange={e => setPatrolman({ ...patrolman, age: e.target.value })}
					/>
				</div>
                <div>
					<label htmlFor='experience'>Стаж:</label>
					<br />
					<input
						name='experience'
						value={patrolman.experience}
						onChange={e => setPatrolman({ ...patrolman, experience: e.target.value })}
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

export default UpdatePatrolmanForm;