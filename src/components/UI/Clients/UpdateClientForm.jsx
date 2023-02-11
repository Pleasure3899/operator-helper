import React, { useState, useEffect } from 'react'
import { Dialog } from "@mui/material"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import '../../../styles/ClientsPage.css'

const sucessNotify = () => toast.success("Оновлено!");
const errorNotify = (props) => toast.error("Клієнта не вдалось оновити!\n" + props);

const UpdateClientForm = (props) => {

	const BECKEND_URL = process.env.REACT_APP_BECKEND_URL;

	const [client, setClient] = useState({ id: '', surname: '', name: '', address: '', phone: '', alternate_phone: '' })

	useEffect(() => {
		const fetchClient = async () => {
			await axios.get(BECKEND_URL + "/clients/" + props.clientToUpdate.id).then((response) => {
				setClient(response.data[0])
			}).catch((error) => console.log(error))
		};
		fetchClient();
	}, [props.clientToUpdate.id, BECKEND_URL]);

	const cancelUpdate = (e) => {
		e.preventDefault();
		props.handleUpdateClose();
	}

	const updateClient = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(BECKEND_URL + "/clients/" + client.id, client);
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

			<form onSubmit={updateClient} className="updateclientform">
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
						value={client.id}
						onChange={e => setClient({ ...client, id: e.target.value })}
					/>
				</div>
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
					<button type="submit">Оновити</button>
					<button onClick={cancelUpdate}>Скасувати</button>
				</div>
			</form>
		</Dialog>
	);
};

export default UpdateClientForm;