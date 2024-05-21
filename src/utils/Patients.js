// src/components/Patients.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientCard from '../components/PatientCard';
import {styled} from "styled-components"
const Patients = () => {
	const [patients, setPatients] = useState([]);
	const [newPatient, setNewPatient] =
		useState({ name: '', age: '', gender: '' });
	const [selectedPatient, setSelectedPatient] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);


	useEffect(
		() => {
			axios.get('http://localhost:5000/patients')
				.then(response => setPatients(response.data))
				.catch(error =>
					console.error('Error fetching patients:', error));
		}, []);


	const handleAddPatient =
		(e) => {
			e.preventDefault();

			axios.post(
'http://localhost:5000/patients/add', newPatient)
				.then(response => {
					console.log(response.data);
					setPatients([...patients, response.data]);
					setNewPatient({ name: '', age: '', gender: '' });
				})
				.catch(error =>
					console.error('Error adding patient:', error));
		};

	const handleUpdatePatient =
		(id, e) => {
			e.preventDefault();

			axios.post(
`http://localhost:5000/patients/update/${id}`, selectedPatient)
				.then(response => {
					const updatePat = {
						...selectedPatient,
						_id: id
					};

					console.log('update patient', updatePat);

					setPatients(
						patients.map(
							patient =>
							(patient._id === id
								? updatePat : patient)));

					setSelectedPatient(null);
					setIsEditMode(false); // Switch back to Add mode
				})
				.catch(
					error =>
						console.error('Error updating patient:', error));
		};

	const handleDeletePatient =
		(id) => {
			axios.delete(
`http://localhost:5000/patients/delete/${id}`)
				.then(response => {
					console.log(response.data);
					setSelectedPatient(null);
					setPatients(
						patients.filter(
							patient => patient._id !== id));
				})
				.catch(
					error =>
						console.error('Error deleting patient:', error));
		};

	const handleEditPatient =
		(patient) => {
			setSelectedPatient(patient);
			setIsEditMode(true); // Switch to Edit mode
		};

	return (
		<Container>
		<div style={{display:'flex'}} className='patient-main '>
			<div style={{width:45,marginRight:20,height:400}} className='form-sections '>
				<h4>
					{
						isEditMode ?
							'Edit Patient' :
							'Add New Patient'
					}
				</h4>
				<form onSubmit=
					{
						isEditMode ?
							(e) =>
								handleUpdatePatient(selectedPatient._id, e) :
							handleAddPatient}>
					<label>Name: </label>
					<input type="text"
						value={
							isEditMode ?
								selectedPatient.name :
								newPatient.name
						}
						onChange={
							(e) =>
								isEditMode
									? setSelectedPatient(
										{
											...selectedPatient,
											name: e.target.value
										}) :
									setNewPatient(
										{
											...newPatient,
											name: e.target.value
										}
									)} />
					<br />
					<label>Age: </label>
					<input type="text"
						value=
						{
							isEditMode ?
								selectedPatient.age : newPatient.age
						}
						onChange={
							(e) =>
								isEditMode ?
									setSelectedPatient(
										{
											...selectedPatient,
											age: e.target.value
										}) :
									setNewPatient(
										{
											...newPatient,
											age: e.target.value
										}
									)} />
					<br />
					<label>Gender: </label>
					<input type="text"
						value=
						{
							isEditMode ?
								selectedPatient.gender :
								newPatient.gender
						} onChange={
							(e) =>
								isEditMode ?
									setSelectedPatient(
										{
											...selectedPatient,
											gender: e.target.value
										}) :
									setNewPatient(
										{
											...newPatient,
											gender: e.target.value
										})} />
					<br />
					<button type="submit">
						{
							isEditMode ?
								'Update Patient' :
								'Add Patient'
						}
					</button>
				</form>
			</div>

			<div style={{width:45}} className='patients-section '>
				<h3 style={{ textAlign: "center" }}>
					Patients
					({patients.length})
				</h3>

				<div className="patient-list">
					{patients.map(patient => (
						<PatientCard
							key={patient._id}
							patient={patient}
							onEdit={handleEditPatient}
							onDelete={handleDeletePatient}
						/>
					))}
				</div>
			</div>
		</div>
		</Container>
	);
};

export default Patients;


const Container=styled.div`
.patient-main {
    display: flex;
 
}
 
.form-sections {
    width: 45%;
	height: 100vh;
	text-align: center;
	margin-left: 16px;
 
}
 
.patients-section {
    width: 45%;
	height: 100vh;
	text-align: center;
	margin-left: 16px;
}
 
.patient-card {
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
 
    h4 {
        margin-bottom: 8px;
    }
 
    p {
        margin: 8px 0;
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
}


`