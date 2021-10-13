import React, { useRef } from 'react';
import illustration from '../images/landing-page-illustration.svg';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const FlexSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
`;
const FormSection = styled.section`
	width: 50%;
`;
const IllustrationSection = styled.section`
	width: 50%;
`;

const LandingPage = () => {
	const emailRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(emailRef.current.value);
		console.log(passwordRef.current.value);
	};

	return (
		<div>
			<div className='navbar'>
				<div className='navbar-brand'>
					<h2 className='navbar-item'>Logo</h2>
				</div>
				<div className='navbar-end'>
					<p className='navbar-item'>Sign Up</p>
				</div>
			</div>
			<p>Welcome to Recallr</p>
			<FlexSection>
				<FormSection>
					<p>This is where the form goes</p>
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
							<button onClick={handleSubmit} className='button is-success'>
								Login
							</button>
						</div>
					</div>
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
