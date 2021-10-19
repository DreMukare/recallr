import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import Hello from '../components/Hello';

const Dash = styled.div`
	width: 100%;
	height: 100%;
`;

const UserDash = () => {
	return (
		<Dash>
			<NavBar firstLink='/settings' firstLinkText='Settings' />
			<Hello />

			<p>You can't see me</p>
			<Footer />
		</Dash>
	);
};

export default UserDash;
