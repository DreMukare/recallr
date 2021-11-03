import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGithub,
	faTwitter,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import logo from '../images/asset.png';
import heroImg from '../images/pexels-shvets-production-7533353.png';
import dataIcon from '../images/data.png';
import drugIcon from '../images/drug.png';
import historyIcon from '../images/history.png';
import styled from 'styled-components';

// Defining styles for the whole page
// Styling is done this way to make page responsive
//  ended up having to use multiple media queries due to poor design choices in placement of hero text
const Page = styled.div`
	font-size: 1em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > * {
		padding: 10px 10px 0 10px;
		min-width: 100vw;
		min-height: 100%;
	}
`;

// Styling for the navbar
const Nav = styled.nav`
	padding: 1em 0.5em;
	min-width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

// Styling for the link section in the navbar
const LinkSection = styled.section`
	display: flex;
	justify-content: space-between;
`;

// default styling for the links in the nav section
const NavLink = styled.a`
	margin: 0 0.2em;
	color: #f16484;

	&:hover {
		color: #6b62fd;
		margin-right: 20px;
		text-decoration: underline;
	}
`;

/**
 * styling for the hero section
 * positioned text on top of image and contained all styling for this section within this styled component
 */
const HeroSection = styled.div`
	color: white;
	padding: 0;
	position: relative;

	& > img {
		min-width: 100%;
	}

	& > div > h1 {
		font-size: 1.7em;
		margin-bottom: 15px;
	}

	@media only screen and (max-width: 500px) {
		& > div {
			position: absolute;
			top: 5%;
			width: 30%;
			left: 10em;
		}
	}

	@media only screen and (min-width: 500px) and (max-width: 600px) {
		& > div {
			position: absolute;
			top: 20%;
			width: 40%;
			left: 20em;
		}
	}

	@media only screen and (min-width: 700px) {
		& > div {
			position: absolute;
			top: 20%;
			width: 40%;
			left: 25em;
		}
	}

	@media only screen and (min-width: 800px) {
		& > div {
			position: absolute;
			top: 20%;
			width: 40%;
			left: 27em;
		}
	}

	@media only screen and (min-width: 900px) {
		& > div {
			position: absolute;
			top: 20%;
			width: 40%;
			left: 28em;
		}
	}

	@media only screen and (min-width: 1000px) {
		& > div {
			position: absolute;
			top: 20%;
			width: 40%;
			left: 37em;
		}

		@media only screen and (min-width: 1920px) {
			& > div {
				position: absolute;
				top: 20%;
				width: 40%;
				left: 60em;
			}
		}
	}
`;

// Styled component to style all the elements contained in the features section
const FeatureSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& > div > div > article > img {
		max-width: 30px;
		max-height: 31px;
	}

	& > div > div > article > div > h3 {
		margin-bottom: 10px;
		color: #6b62fd;
	}

	& > div > div > article {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 70%;
	}
`;

// Styling for the headers in all the sections
const SectionHeader = styled.h1`
	text-align: center;
	color: #f16484;
	font-size: 1.7em;
	margin-bottom: 15px;
`;

// styling for the containers of the features
const FeatureDiv = styled.div`
	width: 80%;
	margin-bottom: 10px;
`;

//  styling for the about section
const About = styled.footer`
	background-color: #3b3d56;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 20px;
	padding-top: 20px;

	& > section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	& > .inspiration > p {
		line-height: 20px;
		width: 85%;
		color: white;
		margin-bottom: 20px;
		max-width: 70%;
	}

	& > .contact,
	& > .attribution {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-bottom: 20px;
	}
`;

// styling for the links in the contact section
const ContactLink = styled.a`
	font-size: 1em;
	display: flex;
	gap: 5px;
	color: white;
	padding: 5px 10px;
	border: 1px solid white;

	&:hover {
		color: #f16484;
		background-color: white;
	}
`;

/**
 * React component that displays landing page
 * It is stateless and doesn't require props since it displays static information
 */
const LandingPage = () => {
	return (
		<Page>
			<Nav>
				<a href='/'>
					<img src={logo} alt='Recallr logo' width='43px' height='32px' />
				</a>
				<LinkSection id='links'>
					<NavLink href='/login'>Login</NavLink>
					<NavLink href='/sign-up'>Sign Up</NavLink>
					<NavLink href='#features'>Features</NavLink>
					<NavLink href='#about'>About</NavLink>
				</LinkSection>
			</Nav>
			<HeroSection>
				<img src={heroImg} alt='Smiling man using ipad' />
				<div>
					<h1>Recallr</h1>
					<p>A tool to help you keep track of your medical details.</p>
				</div>
			</HeroSection>
			<FeatureSection id='features'>
				<SectionHeader>Features</SectionHeader>
				<div>
					<FeatureDiv>
						<article>
							<div>
								<h3>Bio Data</h3>
								<p>
									Keep track of information like your blood type, height, weight
									etc
								</p>
							</div>
							<img src={dataIcon} alt='Icon of heartbeat' />
						</article>
					</FeatureDiv>
					<FeatureDiv>
						<article>
							<div>
								<h3>Drug Prescriptions</h3>
								<p>Keep track of your drug prescriptions</p>
							</div>
							<img src={drugIcon} alt='Icon of pill' />
						</article>
					</FeatureDiv>
					<FeatureDiv>
						<article>
							<div>
								<h3>Medical History</h3>
								<p>Keep track of your recent medical history</p>
							</div>
							<img src={historyIcon} alt='Icon of stethoscope' />
						</article>
					</FeatureDiv>
				</div>
			</FeatureSection>
			<About id='about'>
				<section className='inspiration'>
					<SectionHeader>Project Inspiration</SectionHeader>
					<p>
						This project was inspired by the countless times someone asked me
						for my blood type or height and I could not remember. I asked around
						and some of my friends and family had the same issue. So I figured
						I'd build this app to help them keep track of some of their medical
						details. I mocked up this webapp over three weeks while juggling it
						with other responsibilities. I am open to any feedback on
						suggestions on how to better this experience for you. Please contact
						me 😄!
					</p>
				</section>
				<section className='contact'>
					<SectionHeader>Contact Me</SectionHeader>
					<ContactLink
						target='_blank'
						rel='noopener noreferrer'
						href='https://github.com/DreMukare'
					>
						<FontAwesomeIcon icon={faGithub} />
						Github
					</ContactLink>
					<ContactLink
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.linkedin.com/in/andrew-mukare-385088147/'
					>
						<FontAwesomeIcon icon={faLinkedin} />
						LinkedIn
					</ContactLink>
					<ContactLink
						target='_blank'
						rel='noopener noreferrer'
						href='https://twitter.com/MukareAndrew'
					>
						<FontAwesomeIcon icon={faTwitter} />
						Twitter
					</ContactLink>
				</section>
				<section className='attribution'>
					<SectionHeader>Attribution</SectionHeader>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.pexels.com/photo/black-man-looking-at-tablet-7533353/'
					>
						Picture from Shvets Production on pexels
					</a>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.vecteezy.com/free-vector/medical'
					>
						Medical Vectors by Vecteezy
					</a>
				</section>
			</About>
		</Page>
	);
};

export default LandingPage;
