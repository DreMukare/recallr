import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { projectFirestore } from '../firebase/config';

const Greeting = styled.h1`
	font-size: 3em;
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
			<Greeting>Hello there, {name}</Greeting>
		</div>
	);
};

export default Hello;
