//Appointments.js
import React,
{
	useState,
	useEffect
} from 'react';
import axios from 'axios';
import AppointmentCard
	from '../components/AppointmentCard';
	import {styled} from "styled-components"
const Appointments = () => {
	const [appointments, setAppointments] = useState([]);
	const [newAppointment, setNewAppointment] =
		useState(
			{
				patientName: '',
				doctorName: '', date: ''
			});
	const [selectedAppointment, setSelectedAppointment] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);


	useEffect(() => {
		axios
			.get(
'http://localhost:5000/appointments')
			.then(
				response =>
					setAppointments(response.data))
			.catch(
				error =>
					console.error('Error fetching appointments:', error)
			);
	}, []);

	const handleAddAppointment =
		(e) => {
			e.preventDefault();

			axios
				.post(
'http://localhost:5000/appointments/add', newAppointment)
				.then(response => {
					console.log(response.data);
					setAppointments(
						[
							...appointments,
							response.data]);
					setNewAppointment(
						{
							patientName: '',
							doctorName: '', date: ''
						});
				})
				.catch(error =>
					console.error('Error adding appointment:', error));
		};

	const handleUpdateAppointment =
		(id, e) => {
			e.preventDefault();
			axios
				.post(
`http://localhost:5000/appointments/update/${id}`, selectedAppointment)
				.then(response => {
					console.log(response.data);
					const updateApp = {
						...selectedAppointment,
						_id: id
					};
					setAppointments(
						appointments.map(
							appointment =>
							(appointment._id === id
								? updateApp :
								appointment)
						));
					setSelectedAppointment(null);
					setIsEditMode(false); // Switch back to Add mode
				})
				.catch(
					error =>
						console.error('Error updating appointment:', error));
		};

	const handleDeleteAppointment =
		(id) => {
			axios
				.delete(
`http://localhost:5000/appointments/delete/${id}`)
				.then(response => {
					console.log(response.data);
					setAppointments(
						appointments.filter(
							appointment =>
								appointment._id !== id)
					);
				})
				.catch(error =>
					console.error('Error deleting appointment:', error));
		};

	const handleEditAppointment =
		(appointment) => {
			setSelectedAppointment(appointment);
			setIsEditMode(true); // Switch to Edit mode
		};

	return (
		<Container>
		<div className='flex-row' style={{ width: "100%" }}>
			<div className='flex-column'>
				<div className='add-form'>
					<h4>
						{
							isEditMode ?
								'Edit Appointment' :
								'Add New Appointment'
						}
					</h4>
					<form className="appointment-form"
						onSubmit={
							isEditMode ?
								(e) =>
									handleUpdateAppointment(selectedAppointment._id, e) :
								handleAddAppointment
						}>
						<label>Patient Name:</label>
						<input type="text"
							value={
								isEditMode ?
									selectedAppointment.patientName :
									newAppointment.patientName
							}
							onChange={
								(e) =>
									isEditMode ?
										setSelectedAppointment(
											{
												...selectedAppointment,
												patientName: e.target.value
											}) :
										setNewAppointment(
											{
												...newAppointment,
												patientName: e.target.value
											})} />
						<label>Doctor Name:</label>
						<input type="text"
							value={
								isEditMode ?
									selectedAppointment.doctorName :
									newAppointment.doctorName
							}
							onChange={
								(e) =>
									isEditMode ?
										setSelectedAppointment(
											{
												...selectedAppointment,
												doctorName: e.target.value
											}) :
										setNewAppointment(
											{
												...newAppointment,
												doctorName: e.target.value
											})} />
						<label>Date:</label>
						<input type="date"
							value={
								isEditMode ?
									selectedAppointment.date :
									newAppointment.date
							}
							onChange={
								(e) =>
									isEditMode ?
										setSelectedAppointment(
											{
												...selectedAppointment,
												date: e.target.value
											}) :
										setNewAppointment(
											{
												...newAppointment,
												date: e.target.value
											})} />
						<button type="submit">
							{
								isEditMode ?
									'Update Appointment' :
									'Add Appointment'
							}
						</button>
					</form>
				</div>
			</div>
			<div className='appointments'>
				<h3>Appointments
					(
					{
						appointments.length
					})
				</h3>
				<div className="appointment-list">
					{appointments.map(appointment => (
						<AppointmentCard
							key={appointment._id}
							appointment={appointment}
							onEdit={handleEditAppointment}
							onDelete={handleDeleteAppointment}
						/>
					))}
				</div>
			</div>
		</div>
		</Container>
	);
};

export default Appointments;


const Container=styled.div`
/* /src/components/App */
/* Appointment card */
.appointment-card {
	border: 1px solid #ddd;
	border-radius: 8px;
	width: 300px;
	padding: 16px;
	margin: 16px 0;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
	}

	p {
		font-size: 16px;
		margin-bottom: 10px;
	}

	p {
		span {
			font-weight: 900;
		}
	}

	button {
		background-color: #007bff;
		color: #fff;
		border: none;
		padding: 8px 16px;
		margin-right: 8px;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: #002e5f;
		}
	}
}
/* Add this to a new CSS file, e.g., AppointmentForm.css */
.appointment-form {
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ddd;
	border-radius: 8px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.appointment-form h4 {
	font-size: 24px;
	margin-bottom: 20px;
}

.appointment-form label {
	display: block;
	margin-bottom: 8px;
}

.appointment-form input {
	width: 100%;
	padding: 8px;
	margin-bottom: 16px;
	border: 1px solid #ddd;
	border-radius: 4px;
}

.appointment-form button {
	background-color: #007bff;
	color: #fff;
	border: none;
	padding: 10px 20px;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #0056b3;
	}
}


.appointments {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	width: 30vw;

}

.add-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 250px;
}

`