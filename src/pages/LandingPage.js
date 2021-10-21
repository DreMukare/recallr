import React, { useRef, useState } from 'react';
import illustration from '../images/landing-page-illustration.svg';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Linker from '../components/Linker';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const FlexSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-top: 80px;
`;
const FormSection = styled.section`
	width: 30%;
`;
const IllustrationSection = styled.section`
	width: 50%;
`;
const H2 = styled.h2`
	margin-top: 20px;
	margin-bottom: 20px;
	font-size: 2em;
	color: #ff6685;
`;
const Button = styled.button`
	padding: 10px 60px;
	font-size: 1rem;
	background-color: #ffffff;
	border: 1px solid #6356c9;
	color: #6356c9;
	transition: 0.3s;

	&:hover {
		background-color: #6356c9;
		border: 1px solid #6356c9;
		color: #ff6685;
		cursor: pointer;
		transform: scale(1, 1);
	}
`;

const Article = styled.article`
	margin-top: 30px;
`;

const LandingPage = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, currentUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push('/dashboard');
		} catch {
			setError('Failed to log in');
		}

		currentUser &&
			console.log(`${currentUser.email} is logged in successfully`);
		setLoading(false);
	};

	const handleClick = (e) => {
		setError('');
	};

	return (
		<div>
			<div className='navbar'>
				<div className='navbar-brand'>
					<h2 className='navbar-item'>Logo</h2>
				</div>
				<div className='navbar-end'>
					<Linker text='Sign Up' to='/sign-up' classname='navbar-item' />
				</div>
			</div>
			{error && (
				<div className='notification is-danger'>
					<button className='delete' onClick={handleClick}></button>
					{error}
				</div>
			)}
			<FlexSection>
				<FormSection>
					<H2>Welcome back!</H2>
					<div className='field'>
						<label htmlFor='email' className='label'>
							Email
						</label>
						<div className='control has-icons-left'>
							<input
								id='email'
								ref={emailRef}
								type='email'
								className='input'
								placeholder='you@yourfavehost.com'
								required
							/>
							<span className='icon is-small is-left'>
								<FontAwesomeIcon icon={faEnvelope} />
							</span>
						</div>
					</div>
					<div className='field'>
						<label htmlFor='password' className='label'>
							Password
						</label>
						<div className='control has-icons-left'>
							<input
								id='password'
								ref={passwordRef}
								type='password'
								className='input'
								placeholder='Password'
								required
							/>
							<span className='icon is-small is-left'>
								<FontAwesomeIcon icon={faLock} />
							</span>
						</div>
					</div>
					<div className='field'>
						<div className='control is-flex is-justify-content-center'>
							{loading ? (
								<Button
									type='submit'
									onClick={handleSubmit}
									className='is-loading'
								>
									Log In
								</Button>
							) : (
								<Button type='submit' onClick={handleSubmit}>
									Log In
								</Button>
							)}
						</div>
					</div>
					<Article>
						<p>
							Don't have an account? <Linker text='Sign Up' to='/sign-up' />
						</p>
					</Article>
				</FormSection>
				<IllustrationSection>
					<img
						alt='Illustration of two doctors with a heart between them. Left-most doctor is standing next to a plant while the right-most doctor is taking notes.'
						src={illustration}
					/>
				</IllustrationSection>
			</FlexSection>
		</div>
	);
};

export default LandingPage;
