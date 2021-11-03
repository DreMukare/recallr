import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import SignUpIllustration from '../images/sign-up-illustration.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { projectFirestore } from '../firebase/config';
import Linker from '../components/Linker';
import logo from '../images/asset.png';

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
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		gap: 15px;
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
	margin-top: 20px;
	margin-bottom: 20px;
	font-size: 2em;
	color: #ff6685;
`;

// submit button style
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
 * SignUp Component
 * Renders the sign-up page
 * Contains logic for creation of new user accounts
 */
const SignUp = () => {
	// the refs allow capture of value from form inputs
	const emailRef = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();

	// state used to disable button if still loading
	const [loading, setLoading] = useState(false);

	// state to keep track of errors
	const [error, setError] = useState(false);

	// use history is a hook from react-router to allow redirection
	const history = useHistory();

	// useAuth is a custom hook to expose the firebase context
	// using destructuring to get currentUser object and signup function from auth context
	const { currentUser, signup } = useAuth();

	// creates document for user name and email and creates new user account
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// set to loading to prevent multiple clicks of button
			setLoading(true);

			setError('');

			// carry out user signup by calling firebase signup function defined in auth context
			await signup(emailRef.current.value, passwordRef.current.value);

			// creating document to contain user name and email
			await projectFirestore
				.collection(emailRef.current.value)
				.doc('user-data')
				.set({
					name: nameRef.current.value,
					email: emailRef.current.value,
				});

			// redirects to next onboarding page on successful sign up
			history.push('/more-details');
		} catch (error) {
			setError('Failed to Sign Up');
			console.log(error);
		}

		currentUser && console.log(currentUser.email);
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
					<Linker text='Log In' to='/login' />
				</div>
			</Nav>
			{error && (
				<div className='notification is-danger'>
					<button className='delete' onClick={handleClick}></button>
					{error}
				</div>
			)}
			<H2>Join Us!</H2>
			<FlexSection>
				<IllustrationSection>
					<img
						alt='Illustration conveying a welcoming message'
						src={SignUpIllustration}
					/>
				</IllustrationSection>
				<FormSection>
					<div className='field'>
						<label htmlFor='name' className='label'>
							Name
						</label>
						<div className='control has-icons-left'>
							<input
								id='name'
								ref={nameRef}
								type='text'
								className='input'
								placeholder='Your name'
							/>
							<span className='icon is-small is-left'>
								<FontAwesomeIcon icon={faUser} />
							</span>
						</div>
					</div>
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
									Sign Up
								</Button>
							) : (
								<Button type='submit' onClick={handleSubmit}>
									Sign Up
								</Button>
							)}
						</div>
					</div>
					<Article>
						<p>
							Already have an account? <Linker text='Log In' to='/' />
						</p>
					</Article>
				</FormSection>
			</FlexSection>
		</Page>
	);
};

export default SignUp;
