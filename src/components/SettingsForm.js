import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { projectFirestore } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faVenusMars,
	faBalanceScale,
	faFire,
	faWineGlass,
	faThermometerQuarter,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.section`
	margin: 10px;
	width: 85em;
`;

const Form = styled.form`
	display: flex;
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

const Input = styled.input`
	width: 21em;
`;

export const SettingsForm = () => {
	const { currentUser } = useAuth();
	const genderRef = useRef();
	const weightRef = useRef();
	const smokeRef = useRef();
	const drinkRef = useRef();
	const allergiesRef = useRef();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [conditions, setConditions] = useState([]);

	const handleBio = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			setError('');
			await projectFirestore
				.collection(currentUser.email)
				.doc('bio-data')
				.update({
					gender: genderRef.current.value,
					weight: weightRef.current.value,
					smoke: smokeRef.current.value,
					drink: drinkRef.current.value,
				});
		} catch (error) {
			setError(error);
		}

		setLoading(false);
	};

	const handleAllergies = async (e) => {
		e.preventDefault();

		const prevAllergies = await (
			await projectFirestore.collection(currentUser.email).doc('bio-data').get()
		).data()['allergies'];

		try {
			setLoading(true);
			setError('');
			await projectFirestore
				.collection(currentUser.email)
				.doc('bio-data')
				.update({
					allergies: prevAllergies + ', ' + allergiesRef.current.value,
				});
		} catch (error) {
			setError(error);
		}

		setLoading(false);
	};

	const handleClick = (e) => {
		setError('');
	};

	return (
		<Container className='box'>
			{error && (
				<div className='notification is-danger'>
					<button className='delete' onClick={handleClick}></button>
					{error}
				</div>
			)}
			<h4 className='has-text-centered is-size-5'>
				Edit the following form to make changes to your details
			</h4>
			<hr />
			<Form>
				<section className='control mr-3'>
					<p>Bio Data</p>
					<hr />
					<section className='field m-3 is-flex is-align-items-center'>
						<label htmlFor='gender' className='label mr-2'>
							Gender
						</label>
						<div className='control has-icons-left'>
							<input
								ref={genderRef}
								type='text'
								className='input'
								id='gender'
								placeholder='Your gender'
								required
							/>
							<icon className='icon is-left is-small'>
								<FontAwesomeIcon icon={faVenusMars} />
							</icon>
						</div>
					</section>
					<section className='field m-3 is-flex is-align-items-center'>
						<label htmlFor='weight' className='label mr-2'>
							Weight
						</label>
						<div className='control has-icons-left'>
							<input
								ref={weightRef}
								type='text'
								className='input'
								id='weight'
								placeholder='Kilograms'
								required
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faBalanceScale} />
							</span>
						</div>
					</section>
					<section className='field m-3 is-flex is-align-items-center'>
						<label htmlFor='smoke' className='label mr-3'>
							Smoke
						</label>
						<div className='control has-icons-left'>
							<input
								ref={smokeRef}
								id='smoke'
								type='text'
								className='input'
								placeholder='Yes or No'
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faFire} />
							</span>
						</div>
					</section>
					<section className='field m-3 is-flex is-align-items-center'>
						<label htmlFor='drink' className='label mr-4'>
							Drink
						</label>
						<div className='control has-icons-left'>
							<input
								ref={drinkRef}
								id='drink'
								type='text'
								className='input'
								placeholder='Yes or No'
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faWineGlass} />
							</span>
						</div>
					</section>
					<div className='field'>
						<div className='control is-flex is-justify-content-center'>
							{loading ? (
								<Button
									type='submit'
									onClick={handleBio}
									className='is-loading'
								>
									Submit Bio Data
								</Button>
							) : (
								<Button type='submit' onClick={handleBio}>
									Submit Bio Data
								</Button>
							)}
						</div>
					</div>
				</section>
				<section className='control mr-4'>
					<p className='mb-3'>Allergies</p>
					<p className='mb-3 is-family-monospace'>
						Adding to this will add to the existing list of allergies
					</p>
					<hr />
					<section className='field m-3 is-flex is-align-items-center'>
						<label htmlFor='allergies' className='label mr-3'>
							Allergies
						</label>
						<div className='control has-icons-left'>
							<Input
								id='allergies'
								ref={allergiesRef}
								type='text'
								className='input'
								placeholder='Coma-separated list, eg: dust, cold, fish'
								required
							/>
							<span className='icon is-small is-left'>
								<FontAwesomeIcon icon={faThermometerQuarter} />
							</span>
						</div>
					</section>
					<div className='field'>
						<div className='control is-flex is-justify-content-center'>
							{loading ? (
								<Button
									type='submit'
									onClick={handleAllergies}
									className='is-loading'
								>
									Submit Allergies
								</Button>
							) : (
								<Button type='submit' onClick={handleAllergies}>
									Submit Allergies
								</Button>
							)}
						</div>
					</div>
				</section>
				<section className='control'>
					<p>Conditions</p>
					<hr />
					<section>
						<ul>
							{conditions.map((condition, index) => (
								<li key={index} className='block is-flex is-align-items-center'>
									<p>{condition}</p>
									<button
										onClick={(e) => {
											projectFirestore
												.collection(currentUser.email)
												.doc('conditions')
												.update({
													conditionsList: conditions.arrayRemove(
														conditions.indexOf(condition)
													),
												});
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
					</section>
				</section>
			</Form>
		</Container>
	);
};
