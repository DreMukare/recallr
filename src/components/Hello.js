import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { projectFirestore } from '../firebase/config';

const Greeting = styled.h1`
	font-size: 3em;
	margin: 30px;
	background: rgb(107, 98, 253);
	background: linear-gradient(
		90deg,
		rgba(107, 98, 253, 1) 0%,
		rgba(241, 100, 132, 1) 40%,
		rgba(177, 173, 253, 1) 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const Hello = () => {
	const { currentUser } = useAuth();
	const [name, setName] = useState('');

	useEffect(() => {
		const collectionId = currentUser.email;
		const fetchData = async () => {
			const userName = await projectFirestore
				.collection(collectionId)
				.doc('user-data')
				.get();
			setName(userName.data().name);
		};

		fetchData();
	}, [name, currentUser]);

	return (
		<div>
			<Greeting>Hello there, {name}!</Greeting>
		</div>
	);
};

export default Hello;
