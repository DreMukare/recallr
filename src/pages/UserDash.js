import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import Hello from '../components/Hello';
import { Drugs } from '../components/Drugs';
import Records from '../components/Records';

const Dash = styled.div`
	width: 100%;
	height: 100%;
`;

const UserDash = () => {
	return (
		<Dash>
			<NavBar firstLink='/settings' firstLinkText='Settings' />
			<main className='is-flex'>
				<Hello />
				<aside className='is-flex is-flex-direction-column'>
					<Drugs />
					<Records />
				</aside>
			</main>
			<Footer />
		</Dash>
	);
};

export default UserDash;
