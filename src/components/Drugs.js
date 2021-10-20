import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { projectFirestore } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.section`
	margin: 10px;
	width: 85em;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 1px;
	}

	&::-webkit-scrollbar-track {
		background-color: #bcbac6;
		border-radius: 100px;
	}

	&::-webkit-scrollbar-thumb {
		box-shadow: #f16484;
		border-radius: 100px;
	}
`;

const Form = styled.form`
	width: fit-content;
`;

const DoseInput = styled.input`
	width: 400px;
`;

const Input = styled.input`
	width: 600px;
`;

const Button = styled.button`
	margin-top: 1.5em;
`;

export const Drugs = () => {
	const { currentUser } = useAuth();
	const [drugName, setDrugName] = useState('');
	const [dosage, setDosage] = useState('');
	const [instructions, setInstructions] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const nameRef = useRef();
	const dosageRef = useRef();
	const instructionRef = useRef();

	const handleAdd = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			setError('');
			await projectFirestore
				.collection(currentUser.email)
				.doc('drugs')
				.collection(nameRef.current.value)
				.add({
					name: nameRef.current.value,
					dosage: dosageRef.current.value,
					instructions: instructionRef.current.value,
				});
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		const collectionId = currentUser.email;
		const fetchData = async () => {
			const dose = await projectFirestore
				.collection(collectionId)
				.doc('drugs')
				.listCollections();
			console.log(dose.data());
		};

		fetchData();
	}, [currentUser]);

	return (
		<Container className='box'>
			<h4 className='has-text-centered is-size-5'>
				These are your drug subscriptions
			</h4>
			<hr />
			<section></section>
			<hr />
			<Form className='control is-flex'>
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
					<Button onClick={handleAdd} className='button is-primary is-outlined'>
						<span className='icon is-small'>
							<FontAwesomeIcon icon={faPlus} />
						</span>
					</Button>
				</section>
			</Form>
		</Container>
	);
};
