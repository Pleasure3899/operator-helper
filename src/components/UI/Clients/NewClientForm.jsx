import React, { useEffect, useState } from 'react';
import '../../../styles/ClientsPage.css'
import getLastId from '../../common/getLastId';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const sucessNotify = () => toast.success("Клієнта успішно додано!");
const errorNotify = (props) => toast.error("Клієнта не вдалось додати!\n" + props);

const NewClientForm = () => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;
	const [clients, setClients] = useState([])
	const [client, setClient] = useState({ surname: '', name: '', address: '', phone: '', alternate_phone: ''})
	useEffect(() => {
		const fetchAllClients = async () => {
			try {
				const response = await axios.get(BECKEND_URL + "/clients");
				setClients(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllClients();
	}, [BECKEND_URL]);

	const addNewClient = async (e) => {
		e.preventDefault()
		var lastId = getLastId(clients) + 1
		var newClient = { id: lastId, surname: client.surname, name: client.name, address: client.address, phone: client.phone, alternate_phone: client.alternate_phone }
		try {
			const response = await axios.post(BECKEND_URL + "/clients", newClient);
			if (response.data.errno) {
				errorNotify(response.data.sqlMessage);
			} else {
				sucessNotify();
				setClients([...clients, newClient])
			}
		} catch (error) {
			errorNotify(error);
			console.log(error);
		}
	}

	const resetFields = (e) => {
		e.preventDefault();
		setClient({ ...client, surname: '', name: '', address: '', phone: '', alternate_phone: ''});
	}

	return (
		<div className="newclientcomponent">
			<form onSubmit={addNewClient} className="newclientform">
				<Toaster toastOptions={{
					style: {
						background: '#fff6df',
						color: '#233044',
					},
				}} />
				<div>
					<label htmlFor='surname'>Прізвище:</label>
					<br />
					<input
						name='surname'
						placeholder="Вкажіть прізвище"
						value={client.surname}
						onChange={e => setClient({ ...client, surname: e.target.value })}
					/>
				</div>
                <div>
					<label htmlFor='name'>Ім'я:</label>
					<br />
					<input
						name='name'
						placeholder="Вкажіть ім'я"
						value={client.name}
						onChange={e => setClient({ ...client, name: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='address'>Адреса:</label>
					<br />
					<input
						name='address'
						placeholder='Вкажіть адресу'
						value={client.address}
						onChange={e => setClient({ ...client, address: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='phone'>Номер телефону:</label>
					<br />
					<input
						name='phone'
						placeholder='Вкажіть номер телефону'
						value={client.phone}
						onChange={e => setClient({ ...client, phone: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='alternate_phone'>Альтернативний номер телефону:</label>
					<br />
					<input
						name='alternate_phone'
						placeholder='Вкажіть альтернативний номер телефону'
						value={client.alternate_phone}
						onChange={e => setClient({ ...client, alternate_phone: e.target.value })}
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

export default NewClientForm
