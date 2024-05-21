//Doctors.js
import React,
{
	useState,
	useEffect
} from 'react';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import {styled} from "styled-components"
const Doctors = () => {
	const [doctors, setDoctors] = useState([]);
	const [newDoctor, setNewDoctor] =
		useState(
			{
				name: '',
				specialty: ''
			});
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);


	useEffect(
		() => {
			axios
				.get('http://localhost:5000/doctors')
				.then(
					response =>
						setDoctors(response.data))
				.catch(
					error =>
						console.error('Error fetching doctors:', error)
				);
		}, []);

	const handleAddDoctor =
		(e) => {
			e.preventDefault();
			axios
				.post(
'http://localhost:5000/doctors/add', newDoctor)
				.then(
					response => {
						console.log("doc", response.data);
						setDoctors(
							[
								...doctors,
								response.data
							]
						);
						setNewDoctor(
							{
								name: '',
								specialty: ''
							});
					})
				.catch(
					error =>
						console.error('Error adding doctor:', error));
		};

	const handleUpdateDoctor =
		(id, e) => {
			e.preventDefault();
			axios
				.post(
`http://localhost:5000/doctors/update/${id}`, selectedDoctor)
				.then(response => {
					const updateDoc = {
						...selectedDoctor,
						_id: id
					};

					console.log('update doc', updateDoc);

					setDoctors(
						doctors.map(
							doctor =>
								(doctor._id === id ? updateDoc : doctor)));

					setSelectedDoctor(null);
					setIsEditMode(false); // Switch back to Add mode
				})
				.catch(
					error =>
						console.error('Error updating doctor:', error));
		};

	const handleDeleteDoctor = (id) => {
		axios.delete(
`http://localhost:5000/doctors/delete/${id}`)
			.then(response => {
				console.log(response.data);
				setDoctors(
					doctors
						.filter(doctor => doctor._id !== id)
				);
			})
			.catch(
				error =>
					console.error('Error deleting doctor:', error));
	};

	const handleEditDoctor =
		(doctor) => {
			setSelectedDoctor(doctor);
			setIsEditMode(true); // Switch to Edit mode
		};

	return (
		<Container>
		<div className='main-doc-container '>
			<div className='form-sections '>
				<h4>
					{
						isEditMode ?
							'Edit Doctor' :
							'Add New Doctor'
					}
				</h4>
				<form
					onSubmit={
						isEditMode ?
							(e) =>
								handleUpdateDoctor(selectedDoctor._id, e) :
							handleAddDoctor}>
					<label>Name: </label>
					<input
						type="text"
						value={
							isEditMode ?
								selectedDoctor.name :
								newDoctor.name
						}
						onChange={
							(e) =>
								isEditMode ?
									setSelectedDoctor(
										{
											...selectedDoctor,
											name: e.target.value
										}) :
									setNewDoctor(
										{
											...newDoctor,
											name: e.target.value
										})} />
					<br />
					<label>Specialty: </label>
					<input type="text"
						value=
						{
							isEditMode ?
								selectedDoctor.specialty :
								newDoctor.specialty
						}
						onChange={
							(e) =>
								isEditMode ?
									setSelectedDoctor(
										{
											...selectedDoctor,
											specialty: e.target.value
										}
									) :
									setNewDoctor(
										{
											...newDoctor,
											specialty: e.target.value
										}
									)} />
					<br />
					<button type="submit">
						{
							isEditMode ?
								'Update Doctor' :
								'Add Doctor'
						}</button>
				</form>
			</div>
			<div className='doctors-section '>
				<h3>Doctors({doctors.length}) </h3>
				<div className="doctor-list">
					{doctors.map(doctor => (
						<DoctorCard
							key={doctor._id}
							doctor={doctor}
							onEdit={handleEditDoctor}
							onDelete={handleDeleteDoctor}
						/>
					))}
				</div>
			</div>

		</div>
		</Container>
	);
};

export default Doctors;


const Container=styled.div`
/* /src/components/Doctors.css */

.main-doc-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
}

.doctors-section {
	width: 45%;
	height: 100vh;
	text-align: center;
	margin-left: 16px;
	/* Added margin for spacing */
}

/* Add the doctor card styles */
.doctor-card {
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 16px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease-in-out;

	&:hover {
		transform: scale(1.02);
	}

	p {
		margin: 0;
	}

	button {
		margin-top: 8px;
		cursor: pointer;
	}
}

/* Add the form section styles */

.form-sections {
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 16px;
	width: 45%;
	margin-bottom: 306px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	h4 {
		margin-bottom: 16px;
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;

		label {
			margin-bottom: 8px;
		}

		input {
			padding: 8px;
			margin-bottom: 16px;
		}

		button {
			align-self: flex-start;
			padding: 8px;
			background-color: #007bff;
			color: #fff;
			border: none;
			border-radius: 4px;
			cursor: pointer;

			&:hover {
				background-color: #0056b3;
			}
		}
	}
}

button {
	margin-top: 8px;
	cursor: pointer;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	padding: 8px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
}

.btn-container {
	display: flex;
	justify-content: space-between;
	width: 100%;
}

`