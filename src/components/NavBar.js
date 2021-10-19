import React, { useState } from 'react';
import styled from 'styled-components';
import Linker from '../components/Linker';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';

const Nav = styled.nav`
	border-bottom: 1px solid #8687a1;
`;

export const NavBar = ({ firstLink, firstLinkText }) => {
	const { logout } = useAuth();
	const [error, setError] = useState('');
	const history = useHistory();

	const handleLogout = async () => {
		setError('');

		try {
			await logout();
			history.push('/');
		} catch {
			setError('Failed to log out');
		}
	};

	const handleClick = (e) => {
		setError('');
	};

	return (
		<>
			{error && (
				<div className='notification is-danger'>
					<button className='delete' onClick={handleClick}></button>
					{error}
				</div>
			)}
			<Nav className='navbar' role='navigation' aria-label='main navigation'>
				<section className='navbar-brand'>
					<h2 className='navbar-item'>Logo</h2>
				</section>
				<section className='navbar-end'>
					<div className='navbar-item'>
						<Linker to={firstLink} text={firstLinkText} />
					</div>
					<div className='navbar-item'>
						<button onClick={handleLogout} className='button is-primary'>
							Log Out
						</button>
					</div>
				</section>
			</Nav>
		</>
	);
};
