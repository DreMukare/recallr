import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { projectFirestore } from '../firebase/config';

const Greeting = styled.aside`
	color: #ffffff;
	height: 80vh;
	width: 30em;
	margin: 10px;
	background: #6b62fd;
`;

const P = styled.p`
	color: #f16484;
`;

const List = styled.ul`
	color: #e9e7e8;
`;

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

	useEffect(() => {
		const collectionId = currentUser.email;
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

	return (
		<div>
			<Greeting className='box'>
				<h3 className='has-text-centered mb-3 is-size-3'>{name}</h3>
				<section className='block'>
					<article className='mb-6'>
						<P className='mb-3 is-size-5'>Bio Data</P>
						<List className='ml-4'>
							<li className='mb-3'>Blood Group: &emsp; {bio.bloodGroup}</li>
							<li className='mb-3'>Age: &emsp; {bio.dob}</li>
							<li className='mb-3'>Eye Color: &emsp; {bio.eyeColor}</li>
							<li className='mb-3'>Gender: &emsp; {bio.gender}</li>
							<li className='mb-3'>Weight: &emsp; {bio.weight}</li>
							<li className='mb-3'>Height: &emsp; {bio.height}</li>
						</List>
					</article>
					<article className='mb-6'>
						<P className='mb-3 is-size-5'>Allergies</P>
						{/*
							<List className='ml-4'>
								{bio.allergies.split(', ').map((allergy) => (
									<li className='mb-3'>
										{allergy.charAt(0).toUpperCase() + allergy.slice(1)}
									</li>
								))}
							</List>
						*/}

						{console.log(typeof bio.allergies.split(', '))}
					</article>
					<article>
						<P className='mb-3 is-size-5'>Conditions</P>
						<List className='ml-4'>
							{conditions.map((condition) => (
								<li className='mb-3'>
									{condition.charAt(0).toUpperCase() + condition.slice(1)}
								</li>
							))}
						</List>
					</article>
				</section>
			</Greeting>
		</div>
	);
};

export default Hello;
