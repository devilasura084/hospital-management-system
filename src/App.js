//App.js
import React from 'react';
import {
	BrowserRouter as Router,
	Routes, Route,
	Link, useNavigate
} from 'react-router-dom';
import Appointments
	from './utils/Appointments';
import Doctors from './utils/Doctors';
import Patients from './utils/Patients';
import {styled} from "styled-components"
const App = () => {
	const isLinkActive =
		(path) =>
			window.location.pathname === path;
	return (
		<Container>
		<Router>
			<div className="container">
				<h1 style={{ color: "purple" }}>
					Hospital Managment System
				</h1>
				<nav>
					<ul>
						<li className={
							isLinkActive('/appointments')
								? 'active' : ''}>
							<Link to="/appointments">
								Appointments
							</Link>
						</li>
						<li className={
							isLinkActive('/doctors') ?
								'active' : ''}>
							<Link to="/doctors">
								Doctors
							</Link>
						</li>
						<li className={
							isLinkActive('/patients') ?
								'active' : ''}>
							<Link to="/patients">
								Patients
							</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path="/appointments"
						element={<Appointments />} />
					<Route path="/"
						element={<Appointments />} />
					<Route path="/doctors"
						element={<Doctors />} />
					<Route path="/patients"
						element={<Patients />} />
				</Routes>
			</div>
		</Router>
		</Container>
	);
}

export default App;
const Container=styled.div`
/* App.css */
.container {
	max-width: 90vw;
	margin: 0 auto;
	padding: 20px 150px;
	background-color:#c0e0f2;

}


nav {
	background-color: #7427ae;
	padding: 10px;
	border-radius: 10px;
}

ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
}

li {
	margin-right: 20px;
}

a {

	text-decoration: none;
	color: white;
	font-weight: bold;
}

a:hover {
	color: #ffd700;
}

.active {

	color: #ffd700;
}

/* FLEX */
.flex-column {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.flex-row {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

`