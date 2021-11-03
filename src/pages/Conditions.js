import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { projectFirestore } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';

// page layout
const Details = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > .content {
		width: 70%;
		line-height: 1.4em;
	}
`;

// styling for header
const Instruction = styled.h2`
	text-align: center;
	margin: 30px;
	font-size: 3em;
	background: rgb(107, 98, 253);
	background: linear-gradient(
		90deg,
		rgba(107, 98, 253, 1) 0%,
		rgba(241, 100, 132, 1) 40%,
		rgba(177, 173, 253, 1) 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

// styling for headerstyling for sub-text
const H2 = styled.h2`
	font-family: 'Lato', sans-serif;
	margin-bottom: 20px;
`;

// styling to make form responsive at different screen sizes
const Form = styled.form`
	width: 90%;
`;

// styling to make form responsive at different screen sizes
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

/**
 * Conditions Component
 * Renders conditions page
 * Handles logic to allow user to submit and store any medical conditions that they have
 */
export const Conditions = () => {
	// state to store error
	const [error, setError] = useState(false);

	// ref to grab values from form
	const inputRef = useRef();

	// state to keep track of all conditions entered then submit
	const [conditions, setConditions] = useState([]);

	// state to keep track of when submit process is undergoing
	const [loading, setLoading] = useState(false);

	// destructuring to obtain currentUser object from auth context
	const { currentUser } = useAuth();

	// hook from react-router to allow redirection
	const history = useHistory();

	// handles click on add button
	const handleAdd = (e) => {
		e.preventDefault();
		// stores current input value in state array
		setConditions([...conditions, inputRef.current.value]);

		console.log(conditions);

		// clears input ref
		inputRef.current.value = '';
	};

	// handles click event on submit button
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// prevents multiple click of submit button
			setLoading(true);
			setError('');

			// creates conditions document to store user conditions
			await projectFirestore
				.collection(currentUser.email)
				.doc('conditions')
				.set({
					conditionsList: conditions,
				});

			// redirects to dashboard on successful condition submit
			history.push('/dashboard');
		} catch (error) {
			setError(error);
		}

		setLoading(false);
	};

	// handler to close error on display of error
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
			<Details>
				<Instruction>One last step to go!</Instruction>
				<div className='content'>
					<p>
						Fill the following form with any pre-existing medical conditions
						that you may have.
					</p>
				</div>
				<Form className='box'>
					<div className='content'>
						<H2>Conditions</H2>
						<ul>
							{conditions.map((condition, index) => (
								<li key={index}>{condition}</li>
							))}
						</ul>
					</div>
					<hr />
					<section>
						<div className='field'>
							<label htmlFor='condition' className='label'>
								Add condition
							</label>
							<div className='control is-flex'>
								<input
									ref={inputRef}
									id='condition'
									type='text'
									className='input mr-3'
									placeholder='Enter any medical conditions that you have eg diabetes'
								/>
								<button
									onClick={handleAdd}
									className='button is-primary is-outlined'
								>
									<span className='icon is-small'>
										<FontAwesomeIcon icon={faPlus} />
									</span>
								</button>
							</div>
						</div>
					</section>
					<hr />
					<div className='field is-flex is-justify-content-flex-end'>
						{loading ? (
							<Button
								type='submit'
								onClick={handleSubmit}
								className='is-loading'
							>
								Finish Up
							</Button>
						) : (
							<Button type='submit' onClick={handleSubmit}>
								Finish
							</Button>
						)}
					</div>
				</Form>
			</Details>
		</>
	);
};
