import React, { useState } from 'react';
import styled from 'styled-components';
import Linker from '../components/Linker';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';
import logo from '../images/asset.png';

// layout and styling for navbar
const Nav = styled.nav`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 15px 0;

	& > section {
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 15px;
	}
`;

/**
 * NavBar Component
 * destructures link text and href from props
 * link text and href passed as props to Linker component
 * contains logic to handle logout event on click of logout button
 */
export const NavBar = ({ firstLink, firstLinkText }) => {
	const { logout } = useAuth();
	const [error, setError] = useState('');
	const history = useHistory();

	// onclick event handler for logout button
	const handleLogout = async () => {
		setError('');

		try {
			// calls logout function from auth context
			await logout();

			// redirects to login page on successful logout
			history.push('/login');
		} catch {
			setError('Failed to log out');
		}
	};

	// clears error to make error message disappear
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
			<Nav role='navigation' aria-label='main navigation'>
				<div>
					<a href='/dashboard'>
						<img src={logo} alt='Recallr logo' width='43px' height='32px' />
					</a>
				</div>
				<section>
					<Linker to={firstLink} text={firstLinkText} />

					<button onClick={handleLogout} className='button is-primary'>
						Log Out
					</button>
				</section>
			</Nav>
		</>
	);
};
