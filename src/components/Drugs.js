import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { projectFirestore } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import 'firebase/firestore';

// container styles
// also styles section header
const Container = styled.section`
	width: 90%;

	& > h4 {
		text-align: center;
		font-size: 2em;
	}

	margin: 20px 0;
`;

// layout styles for form section
const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

// input style
const DoseInput = styled.input``;

// input style
const Input = styled.input``;

// styling for submit button
const Button = styled.button`
	margin-top: 1.5em;
`;

const Section = styled.section`
	height: 110px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background-color: #bcbac6;
		border-radius: 100px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #f16484;
		border-radius: 100px;
	}
`;

/**
 * Drugs Component
 * Renders section of dashboard
 * contains logic to add and delete drug prescriptions
 */
export const Drugs = () => {
	const { currentUser } = useAuth();
	const [dosage, setDosage] = useState({});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(0);
	const nameRef = useRef();
	const dosageRef = useRef();
	const instructionRef = useRef();

	// handles click event on add button
	const handleAdd = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			setError('');

			// setting count state to keep track of number of drugs
			setCount((count) => count + 1);

			// creating (new) document to store entered drug
			await projectFirestore
				.collection(currentUser.email)
				.doc('drugs')
				.set(
					{
						[nameRef.current.value]: {
							name: nameRef.current.value,
							dosage: dosageRef.current.value,
							instructions: instructionRef.current.value,
						},
					},
					{ merge: true }
				);

			console.log(dosage);
		} catch (error) {
			setError(error);
		}

		nameRef.current.value = '';
		dosageRef.current.value = '';
		instructionRef.current.value = '';
		setLoading(false);
		console.log(error);
	};

	// useEffect hook to render changes to component (when drug is added, when drug is deleted)
	// using count as a dependency to avoid infinite loop when passing records as a dependency
	// rerenders section everytime count changes
	useEffect(() => {
		const collectionId = currentUser.email;
		const fetchData = async () => {
			const dose = await projectFirestore
				.collection(collectionId)
				.doc('drugs')
				.get();
			setDosage(dose.data());
			console.log(count);
		};

		return fetchData();
	}, [currentUser, count]);

	return (
		<Container>
			<h4>These are your drug subscriptions</h4>
			<hr />
			{dosage && (
				<Section>
					<ul>
						{Object.keys(dosage).map((key, index) => (
							<li key={index}>
								<article>
									<p>
										<b>{key}</b>
									</p>
									<p>Dosage: {dosage[key].dosage}</p>
									<p>
										Extra instructions: {dosage[key]['instructions'] || 'None'}
									</p>
								</article>
								<button
									onClick={(e) => {
										projectFirestore
											.collection(currentUser.email)
											.doc('drugs')
											.update({
												[dosage[key]['name']]:
													firebase.firestore.FieldValue.delete(),
											});
										setCount((count) => count - 1);
									}}
									className='button ml-3 is-danger is-outlined'
								>
									<span className='icon is-small'>
										<FontAwesomeIcon icon={faTrash} />
									</span>
								</button>
							</li>
						))}
					</ul>
				</Section>
			)}
			<hr />
			<Form className='control'>
				<section className='field m-3'>
					<label htmlFor='name' className='label has-text-centered'>
						Name
					</label>
					<section className='control'>
						<input
							ref={nameRef}
							type='text'
							className='input'
							placeholder='Name of drug'
						/>
					</section>
				</section>
				<section className='field m-3'>
					<label htmlFor='dosage' className='label has-text-centered'>
						Dosage
					</label>
					<section className='control'>
						<DoseInput
							ref={dosageRef}
							type='text'
							className='input'
							placeholder='Dosage'
						/>
					</section>
				</section>
				<section className='field m-3'>
					<label htmlFor='instruction' className='label has-text-centered'>
						Extra instructions
					</label>
					<section className='control'>
						<Input
							ref={instructionRef}
							type='text'
							className='input'
							placeholder='Any extra instructions'
						/>
					</section>
				</section>
				<section className='field m-3'>
					{loading ? (
						<Button
							type='submit'
							onClick={handleAdd}
							className='button is-loading is-primary is-outlined'
						>
							<span className='icon is-small'>
								<FontAwesomeIcon icon={faPlus} />
							</span>
						</Button>
					) : (
						<Button
							type='submit'
							onClick={handleAdd}
							className='button
           is-primary is-outlined'
						>
							<span className='icon is-small'>
								<FontAwesomeIcon icon={faPlus} />
							</span>
						</Button>
					)}
				</section>
			</Form>
		</Container>
	);
};
