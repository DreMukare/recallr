import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

// styling for reset password button
const Button = styled.button`
	padding: 10px 60px;
	font-size: 1rem;
	background-color: #ffffff;
	border: 1px solid #6356c9;
	color: #6356c9;
	transition: 0.3s;
	margin: 30px;

	&:hover {
		background-color: #6356c9;
		border: 1px solid #6356c9;
		color: #ff6685;
		cursor: pointer;
		transform: scale(1, 1);
	}
`;

/**
 * ResetPassword Component
 * Renders button which when clicked will send user an email to allow them to reset their password
 * Uses function from auth context
 */
export const ResetPassword = () => {
	const { currentUser, resetPassword } = useAuth();
	const [error, setError] = useState();

	const handleReset = async (e) => {
		e.preventDefault();
		setError('');

		try {
			await resetPassword(currentUser.email);
		} catch (error) {
			setError(error);
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
			<Button
				className='button'
				onClick={handleReset}
				style={{ width: '20em' }}
			>
				Reset your password
			</Button>
		</>
	);
};
