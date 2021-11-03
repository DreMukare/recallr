import React, { useRef, useState } from 'react';
import illustration from '../images/landing-page-illustration.svg';
import logo from '../images/asset.png';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Linker from '../components/Linker';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

// Default styling for whole page
const Page = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	padding-bottom: 20px;
`;

// Responsive styling for the navbar
const Nav = styled.div`
	margin-top: 15px;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

// Responsive styling for container of illustration and form
const FlexSection = styled.div`
	height: auto;
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media only screen and (min-width: 1000px) {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: space-around;
	}
`;

// form style
const FormSection = styled.section`
	min-width: 30%;
`;

// illustration style
const IllustrationSection = styled.section`
	height: auto;
	width: 100%;
	align-self: center;
	margin-bottom: 30px;
`;

// header style
const H2 = styled.h2`
	margin-top: 30px;
	margin-bottom: 30px;
	font-size: 2em;
	color: #ff6685;
	text-align: center;
`;

// styling for submit button
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

// styling for section under form
const Article = styled.article`
	margin-top: 30px;
`;

/**
 * Login Component
 * Displays login form and processes logic for login
 */
const Login = () => {
	// the refs allow capture of value from form inputs
	const emailRef = useRef();
	const passwordRef = useRef();

	// useAuth is a custom hook to expose the firebase context
	const { login, currentUser } = useAuth();

	// state used to disable button if still loading
	const [loading, setLoading] = useState(false);

	// state to keep track of errors
	const [error, setError] = useState(false);

	// use history is a hook from react-router to allow redirection
	const history = useHistory();

	// function to submit data entered in form and process login
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);

			// login function defined in auth context. logs user in with values from form through firebase function
			await login(emailRef.current.value, passwordRef.current.value);

			// redirects to dashboard on successful log in
			history.push('/dashboard');
		} catch {
			setError('Failed to log in');
		}

		currentUser &&
			console.log(`${currentUser.email} is logged in successfully`);
		setLoading(false);
	};

	// handler to close error on display of error
	const handleClick = (e) => {
		setError('');
	};

	return (
		<Page>
			<Nav>
				<div>
					<a href='/'>
						<img alt='Recallr logo' src={logo} width='43' height='32' />
					</a>
				</div>
				<div>
					<Linker text='Sign Up' to='/sign-up' />
				</div>
			</Nav>
			{error && (
				<div className='notification is-danger'>
					<button className='delete' onClick={handleClick}></button>
					{error}
				</div>
			)}
			<H2>Welcome back!</H2>
			<FlexSection>
				<IllustrationSection>
					<img
						alt='Illustration of two doctors with a heart between them. Left-most doctor is standing next to a plant while the right-most doctor is taking notes.'
						src={illustration}
					/>
				</IllustrationSection>
				<FormSection>
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
			</FlexSection>
		</Page>
	);
};

export default Login;
