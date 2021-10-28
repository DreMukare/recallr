import React, { useState } from 'react';
import styled from 'styled-components';
import Linker from '../components/Linker';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';
import logo from '../images/asset.png';

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
			history.push('/login');
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
					<a href='/dashboard'>
						<img src={logo} alt='Recallr logo' width='56px' height='43px' />
					</a>
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
