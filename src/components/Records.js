import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { projectFirestore } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

// layout and styling for entire component
const Container = styled.section`
	width: 90%;

	& > h4 {
		text-align: center;
		font-size: 2em;
	}
`;

// input style
const DoseInput = styled.input``;

// input style
const Input = styled.input``;

// styling for submit button
const Button = styled.button`
	margin-top: 1.5em;
`;

// styling for form section
const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

// styling for display section
const Section = styled.section`
	height: 150px;
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
 * Records Component
 * Renders record section of dashboard
 * contains logic to CRD user medical records
 */
const Records = () => {
	const dateRef = useRef();
	const proceduresRef = useRef();
	const drugsRef = useRef();
	const [records, setRecords] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(0);
	const { currentUser } = useAuth();

	// handles click event on add button
	const handleAdd = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			setError('');

			// set count state to keep track of number of records
			setCount((count) => count + 1);

			// creates record entry in firebase document
			await projectFirestore
				.collection(currentUser.email)
				.doc('records')
				.collection('details')
				.add({
					date: dateRef.current.value,
					procedures: proceduresRef.current.value,
					drugs: drugsRef.current.value,
				});

			console.log(records);
		} catch (error) {
			setError(error);
		}

		dateRef.current.value = '';
		proceduresRef.current.value = '';
		drugsRef.current.value = '';
		setLoading(false);
	};

	// using count as a dependency to avoid infinite loop when passing records as a dependency
	// rerenders section everytime count changes
	useEffect(() => {
		const fetchData = async () => {
			const recs = [];
			await projectFirestore
				.collection(currentUser.email)
				.doc('records')
				.collection('details')
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						let currentId = doc.id;
						let object = { ...doc.data(), id: currentId };
						recs.push(object);
					});
				})
				.catch((err) => console.log(err));
			setRecords(recs);
			console.log(records);
			console.log(count);
		};

		fetchData();
	}, [currentUser, count, records]);

	return (
		<Container>
			<h4>These are your most recent medical records</h4>
			<hr />
			{!error && (
				<Section>
					<ul>
						{records.map((record, index) => (
							<li key={index} className='block is-flex is-align-items-center'>
								<article className='content block'>
									<p>
										<b>{record['date']}</b>
									</p>
									<p>Dosage: {record['procedures']}</p>
									<p>Extra instructions: {record['drugs'] || 'None'}</p>
								</article>
								<button
									onClick={(e) => {
										projectFirestore
											.collection(currentUser.email)
											.doc('records')
											.collection('details')
											.doc(record['id'])
											.delete();
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
			<Form>
				<section className='field m-3'>
					<label htmlFor='date' className='label has-text-centered'>
						Date
					</label>
					<section className='control'>
						<input
							ref={dateRef}
							type='date'
							className='input'
							placeholder='Date of appointment'
						/>
					</section>
				</section>
				<section className='field m-3'>
					<label htmlFor='procedures' className='label has-text-centered'>
						Procedures done
					</label>
					<section className='control'>
						<Input
							ref={proceduresRef}
							type='text'
							className='input'
							placeholder='Procedures done'
						/>
					</section>
				</section>
				<section className='field m-3'>
					<label htmlFor='drugs' className='label has-text-centered'>
						Drugs prescribed
					</label>
					<section className='control'>
						<DoseInput
							ref={drugsRef}
							type='text'
							className='input'
							placeholder='Drugs prescribed'
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

export default Records;
