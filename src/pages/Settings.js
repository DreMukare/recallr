import React from 'react';
import { Footer } from '../components/Footer';
import Hello from '../components/Hello';
import { NavBar } from '../components/NavBar';
import { SettingsForm } from '../components/SettingsForm';

const Settings = () => {
	return (
		<>
			<NavBar />
			<main className='is-flex'>
				<Hello />
				<aside className='is-flex is-flex-direction-column'>
					<SettingsForm />
				</aside>
			</main>
			<Footer />
		</>
	);
};

export default Settings;
