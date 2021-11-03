import React from 'react';
import Hello from '../components/Hello';
import { NavBar } from '../components/NavBar';
import { ResetPassword } from '../components/ResetPassword';
import { SettingsForm } from '../components/SettingsForm';
import styled from 'styled-components';

const Page = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
	width: 100%;
`;

// Component that renders settings page
const Settings = () => {
	return (
		<Page>
			<NavBar firstLink='/dashboard' firstLinkText='User Dashboard' />
			<main>
				<Hello />
				<aside>
					<SettingsForm />
					<ResetPassword />
				</aside>
			</main>
		</Page>
	);
};

export default Settings;
