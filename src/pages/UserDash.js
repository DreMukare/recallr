import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';

const Dash = styled.div`
	width: 100%;
	height: 100%;
`;

const UserDash = () => {
	return (
		<Dash>
			<NavBar firstLink='/settings' firstLinkText='Settings' />
			<p>You can't see me</p>
			<Footer />
		</Dash>
	);
};

export default UserDash;
