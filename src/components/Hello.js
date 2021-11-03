import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { projectFirestore } from '../firebase/config';

// layout of section
const Greeting = styled.aside`
	color: #ffffff;
	height: auto;
	min-width: 90%;
	padding: 20px;
	background: #6b62fd;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > h3 {
		font-size: 2em;
		text-align: center;
		margin: 15px;
	}

	& > section {
		display: flex;
		justify-content: flex-start;
		align-items: space-between;
		gap: 15px;
		width: 100%;
	}
`;

// styling for p tag
const P = styled.p`
	color: #f16484;
`;

// styling for text within unordered list
const List = styled.ul`
	color: #e9e7e8;
`;

/**
 * Hello Component
 * Renders bio data section
 * Has logic to pull data from firestore document and style it for easy reading
 */
const Hello = () => {
	const { currentUser } = useAuth();
	const [name, setName] = useState('');
	const [bio, setBio] = useState({
		allergies: null,
		bloodGroup: null,
		dob: null,
		eyeColor: null,
		gender: null,
		height: null,
		weight: null,
	});
	const [conditions, setConditions] = useState([]);

	// pulls bio data from firestore
	useEffect(() => {
		const collectionId = currentUser.email;

		// asynchronous function to fetch data from firestore
		const fetchData = async () => {
			const userName = await projectFirestore
				.collection(collectionId)
				.doc('user-data')
				.get();
			setName((u) => (u = userName.data().name));
			const bioData = await projectFirestore
				.collection(collectionId)
				.doc('bio-data')
				.get();
			setBio(bioData.data());
			const prexistingConditions = await projectFirestore
				.collection(collectionId)
				.doc('conditions')
				.get();
			const list = prexistingConditions.data().conditionsList;

			setConditions((c) => [...c, ...list]);
		};

		fetchData();
	}, [currentUser]);

	// function to calculate age from date of birth
	const getAge = () => {
		const difference = Date.now() - new Date(bio.dob).getTime();
		const year = new Date(difference).getUTCFullYear();
		const age = Math.abs(year - 1970);
		return age;
	};

	return (
		<div>
			<Greeting>
				<h3>Hello {name}!</h3>
				<section>
					<article>
						<P>Bio Data</P>
						<List>
							<li>Blood Group: {bio.bloodGroup}</li>
							<li>Age: {getAge}</li>
							<li>Eye Color: {bio.eyeColor}</li>
							<li>Gender: {bio.gender}</li>
							<li>Weight: {bio.weight} kg</li>
							<li>Height: {bio.height}</li>
						</List>
					</article>
					<div>
						<article>
							<P>Allergies</P>
							{/*
							commented out because it doesnt detect allergies array
							<List className='ml-4'>
								{bio.allergies.split(', ').map((allergy) => (
									<li className='mb-3'>
										{allergy.charAt(0).toUpperCase() + allergy.slice(1)}
									</li>
								))}
							</List>
								*/}
							<p>{bio.allergies}</p>
						</article>
						<article>
							<P>Conditions</P>
							<List>
								{conditions.map((condition, index) => (
									<li key={index}>
										{condition.charAt(0).toUpperCase() + condition.slice(1)}
									</li>
								))}
							</List>
						</article>
					</div>
				</section>
			</Greeting>
		</div>
	);
};

export default Hello;
