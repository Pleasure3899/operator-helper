import React, { useEffect, useState } from 'react';
import '../../../styles/PatrolmenPage.css'
import getLastId from '../../common/getLastId';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const sucessNotify = () => toast.success("Патрульного успішно додано!");
const errorNotify = (props) => toast.error("Патрульного не вдалось додати!\n" + props);

const NewPatrolmanForm = () => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
	const [patrolmen, setPatrolmen] = useState([])
	const [patrolman, setPatrolman] = useState({ full_name: '', age: '', experience: ''})
	useEffect(() => {
		const fetchAllPatrolmen = async () => {
			try {
				const response = await axios.get(BECKEND_URL + "/patrolmen");
				setPatrolmen(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllPatrolmen();
	}, [BECKEND_URL]);

	const addNewPatrolman = async (e) => {
		e.preventDefault()
		var lastId = getLastId(patrolmen) + 1
		var newPatrolman = { id: lastId, full_name: patrolman.full_name, age: patrolman.age, experience: patrolman.experience}
		try {
			const response = await axios.post(BECKEND_URL + "/patrolmen", newPatrolman);
			if (response.data.errno) {
				errorNotify(response.data.sqlMessage);
			} else {
				sucessNotify();
				setPatrolmen([...patrolmen, newPatrolman])
			}
		} catch (error) {
			errorNotify(error);
			console.log(error);
		}
	}

	const resetFields = (e) => {
		e.preventDefault();
		setPatrolman({ ...patrolman, full_name: '', age: '', experience: '' });
	}

	return (
		<div className="newpatrolmancomponent">
			<form onSubmit={addNewPatrolman} className="newpatrolmanform">
				<Toaster toastOptions={{
					style: {
						background: '#fff6df',
						color: '#233044',
					},
				}} />
				<div>
					<label htmlFor='full_name'>ПІБ:</label>
					<br />
					<input
						name='full_name'
						placeholder='Вкажіть ПІБ'
						value={patrolman.full_name}
						onChange={e => setPatrolman({ ...patrolman, full_name: e.target.value })}
					/>
				</div>
                <div>
					<label htmlFor='age'>Вік:</label>
					<br />
					<input
						name='age'
						placeholder='Вкажіть вік'
						value={patrolman.age}
						onChange={e => setPatrolman({ ...patrolman, age: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='experience'>Стаж:</label>
					<br />
					<input
						name='experience'
						placeholder='Вкажіть стаж'
						value={patrolman.experience}
						onChange={e => setPatrolman({ ...patrolman, experience: e.target.value })}
					/>
				</div>
				<div>
					<button type="submit">Додати</button>
					<button onClick={resetFields}>Очистити</button>
				</div>
			</form>
		</div>
	);
};

export default NewPatrolmanForm
