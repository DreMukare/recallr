import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';
import Hello from '../components/Hello';
import { Drugs } from '../components/Drugs';
import Records from '../components/Records';

// layout styling
const Dash = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > main > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		width: 90%;
	}
`;

/**
 * UserDash component
 * renders user dashboard
 * arranges the different components that make up user dashboard in layout
 */
const UserDash = () => {
	return (
		<Dash>
			<NavBar firstLink='/settings' firstLinkText='Settings' />
			<main>
				<div>
					<Hello />
					<Drugs />
				</div>
				<Records />
			</main>
		</Dash>
	);
};

export default UserDash;
