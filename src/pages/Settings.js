import React from 'react';
import { Footer } from '../components/Footer';
import Hello from '../components/Hello';
import { NavBar } from '../components/NavBar';
import { ResetPassword } from '../components/ResetPassword';
import { SettingsForm } from '../components/SettingsForm';

const Settings = () => {
	return (
		<>
			<NavBar firstLink='/dashboard' firstLinkText='User Dashboard' />
			<main className='is-flex'>
				<Hello />
				<aside className='is-flex is-flex-direction-column is-align-items-center'>
					<SettingsForm />
					<ResetPassword />
				</aside>
			</main>
			<Footer />
		</>
	);
};

export default Settings;
