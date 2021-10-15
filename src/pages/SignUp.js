import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import SignUpIllustration from '../images/sign-up-illustration.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Linker from '../components/Linker';

const FlexArea = styled.div`
	margin-top: 80px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
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

const SignUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();
	const { currentUser, signup } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			setError('');
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push('/dashboard');
		} catch {
			setError('Failed to Sign Up');
		}

		currentUser && console.log(currentUser.email);
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
					<Linker text='Log In' to='/' classname='navbar-item' />
				</div>
			</div>
			{error && (
				<div className='notification is-danger'>
					<button className='delete' onClick={handleClick}></button>
					{error}
				</div>
			)}
			<FlexArea>
				<IllustrationSection>
					<img
						alt='Illustration conveying a welcoming message'
						src={SignUpIllustration}
					/>
				</IllustrationSection>
				<FormSection>
					<H2>Join Us!</H2>
					<div className='field'>
						<label htmlFor='email' className='label'>
							Email
						</label>
						<div className='control has-icons-left'>
							<input
								ref={emailRef}
								type='email'
								className='input'
								placeholder='you@yourfavehost.com'
								required
							/>
							<span class='icon is-small is-left'>
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
								ref={passwordRef}
								type='password'
								className='input'
								placeholder='Password'
								required
							/>
							<span class='icon is-small is-left'>
								<FontAwesomeIcon icon={faLock} />
							</span>
						</div>
					</div>
					<div className='field'>
						<div className='control'>
							{loading ? (
								<Button onClick={handleSubmit} className='is-loading'>
									Sign Up
								</Button>
							) : (
								<Button onClick={handleSubmit}>Sign Up</Button>
							)}
						</div>
					</div>
					<Article>
						<p>
							Already have an account? <Linker text='Log In' to='/' />
						</p>
					</Article>
				</FormSection>
			</FlexArea>
		</div>
	);
};

export default SignUp;
