import React, { useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTint,
	faCalendar,
	faEye,
	faVenusMars,
	faArrowsAltV,
	faThermometerQuarter,
	faBalanceScale,
	faUmbrella,
	faWineGlass,
	faFire,
} from '@fortawesome/free-solid-svg-icons';

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
const Form = styled.form`
	width: 40em;
`;

export const MoreDetails = () => {
	const heightRef = useRef();
	const weightRef = useRef();
	const bloodGroupRef = useRef();
	const eyeColorRef = useRef();
	const dateOfBirthRef = useRef();
	const genderRef = useRef();
	const allergiesRef = useRef();
	const insuredRef = useRef();
	const smokeRef = useRef();
	const drinkRef = useRef();
	const { currentUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			setError('');

			await projectFirestore.collection(currentUser.email).doc('bio-data').set({
				insured: insuredRef.current.value,
				height: heightRef.current.value,
				weight: weightRef.current.value,
				bloodGroup: bloodGroupRef.current.value,
				eyeColor: eyeColorRef.current.value,
				dob: dateOfBirthRef.current.value,
				allergies: allergiesRef.current.value,
				drink: drinkRef.current.value,
				smoke: smokeRef.current.value,
				gender: genderRef.current.value,
			});
			history.push('/conditions');
		} catch {
			setError('Something went wrong.');
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
				<Instruction>One more step</Instruction>
				<Form className='box'>
					<section className='field'>
						<label htmlFor='allergies' className='label'>
							Allergies
						</label>
						<div className='control has-icons-left'>
							<input
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
					<section className='field'>
						<label htmlFor='bloodgroup' className='label'>
							Blood Group
						</label>
						<div className='control has-icons-left'>
							<input
								id='bloodgroup'
								ref={bloodGroupRef}
								type='text'
								className='input'
								placeholder='Your blood group eg AB+'
								required
							/>
							<span className='icon is-small is-left'>
								<FontAwesomeIcon icon={faTint} />
							</span>
						</div>
					</section>
					<section className='field'>
						<label htmlFor='date' className='label'>
							Date of Birth
						</label>
						<div className='control has-icons-left'>
							<input
								id='date'
								ref={dateOfBirthRef}
								type='date'
								className='input'
								required
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faCalendar} />
							</span>
						</div>
					</section>
					<section className='field'>
						<label htmlFor='drink' className='label'>
							Drink
						</label>
						<div className='control has-icons-left'>
							<input
								ref={drinkRef}
								id='drink'
								type='text'
								className='input'
								placeholder='Yes or No'
								required
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faWineGlass} />
							</span>
						</div>
					</section>
					<section className='field'>
						<label htmlFor='eye' className='label'>
							Eye Color
						</label>
						<div className='control has-icons-left'>
							<input
								ref={eyeColorRef}
								type='text'
								className='input'
								id='eye'
								placeholder='The color of your irises'
								required
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faEye} />:
							</span>
						</div>
					</section>
					<section className='field'>
						<label htmlFor='insurance' className='label'>
							Insured
						</label>
						<div className='control has-icons-left'>
							<input
								ref={insuredRef}
								type='text'
								className='input'
								id='insurance'
								placeholder='Yes or No'
								required
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faUmbrella} />
							</span>
						</div>
					</section>
					<section className='field'>
						<label htmlFor='gender' className='label'>
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
					<section className='field'>
						<label htmlFor='smoke' className='label'>
							Smoke
						</label>
						<div className='control has-icons-left'>
							<input
								ref={smokeRef}
								id='smoke'
								type='text'
								className='input'
								placeholder='Yes or No'
								required
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faFire} />
							</span>
						</div>
					</section>
					<section className='field'>
						<label htmlFor='height' className='label'>
							Height
						</label>
						<div className='control has-icons-left'>
							<input
								ref={heightRef}
								type='text'
								className='input'
								id='height'
								placeholder='Your height in feet and inches'
								required
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faArrowsAltV} />
							</span>
						</div>
					</section>
					<section className='field'>
						<label htmlFor='weight' className='label'>
							Weight
						</label>
						<div className='control has-icons-left'>
							<input
								ref={weightRef}
								type='text'
								className='input'
								id='weight'
								placeholder='Enter your weight in kilograms'
								required
							/>
							<span className='icon is-left is-small'>
								<FontAwesomeIcon icon={faBalanceScale} />
							</span>
						</div>
					</section>
					<section className='field'>
						<div className='control is-flex is-justify-content-flex-end'>
							{loading ? (
								<Button
									type='submit'
									onClick={handleSubmit}
									className='is-loading'
								>
									Next
								</Button>
							) : (
								<Button type='submit' onClick={handleSubmit}>
									Next
								</Button>
							)}
						</div>
					</section>
				</Form>
			</Details>
		</>
	);
};
