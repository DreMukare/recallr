import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { projectFirestore } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';

const Details = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

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

const H2 = styled.h2`
	font-family: 'Lato', sans-serif;
	margin-bottom: 20px;
`;

const Form = styled.form`
	width: 40em;
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

export const Conditions = () => {
	const [error, setError] = useState(false);
	const inputRef = useRef();
	const [conditions, setConditions] = useState([]);
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuth();
	const history = useHistory();

	const handleAdd = (e) => {
		e.preventDefault();
		setConditions([...conditions, inputRef.current.value]);

		console.log(conditions);
		inputRef.current.value = '';
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			setError('');
			await projectFirestore
				.collection(currentUser.email)
				.doc('conditions')
				.set({
					conditionsList: conditions,
				});
			history.push('/dashboard');
		} catch (error) {
			setError(error);
		}

		setLoading(false);
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
							<Button onClick={handleSubmit} className='is-loading'>
								Finish Up
							</Button>
						) : (
							<Button onClick={handleSubmit}>Finish</Button>
						)}
					</div>
				</Form>
			</Details>
		</>
	);
};
