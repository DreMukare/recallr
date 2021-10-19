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
		const collectionId = currentUser.uid.toString();
		const fetchData = async () => {
			const userName = await projectFirestore
				.collection(collectionId)
				.doc('user-data')
				.get();
			userName.exists()
				? console.log(userName.data())
				: console.log(collectionId);
			setName('test');
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
