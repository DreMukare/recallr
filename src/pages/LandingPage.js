import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGithub,
	faTwitter,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import logo from '../images/asset.png';
import heroImg from '../images/pexels-shvets-production-7533353 (Medium).png';
import dataIcon from '../images/data.png';
import drugIcon from '../images/drug.png';
import historyIcon from '../images/history.png';
import styled from 'styled-components';

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px;
`;

const Link = styled.a`
	color: #f16484;
	transition: all 0.4s ease-in-out;
	margin-left: 10px;
	margin-right: 10px;

	&:hover {
		color: #6b62fd;
		transform: scale(1.5);
		margin: 5px 15px 0 25px;
	}
`;

const HeroImg = styled.img`
	opacity: 0.7;
`;

const HeroSection = styled.section`
	display: flex;
	background-color: #6b62fd;
	color: white;
`;

const HeroText = styled.section`
	display: flex;
	flex-direction: column;
	margin-left: 150px;
	width: 350px;
	justify-content: center;
`;

const H1 = styled.h1`
	font-size: 3em;
`;
const P = styled.p`
	margin-top: 20px;
	font-size: 1.5em;
`;

const FeatureSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 20em;
	margin-bottom: 30px;
`;

const FeatureHeader = styled.h1`
	margin-top: 20px;
	font-size: 3em;
	color: #f16484;
	text-align: center;
`;

const Content = styled.div`
	display: flex;
	gap: 30px;
	margin-top: 30px;
`;

const FeatureDiv = styled.article`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.p`
	font-size: 1.5em;
`;

const Text = styled.p`
	color: #6b62fd;
`;

const Icon = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 150px;
	height: 150px;
`;

const About = styled.footer`
	background: #3b3d56;
	color: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: auto;
	width: 100%;
	min-height: 15em;
	clear: both;
`;

const Attribution = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px;
	width: 30em;

	& > a:hover {
		color: white;
	}
`;

const ContactLink = styled.a`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	font-size: 1.5em;

	&:hover {
		color: #f16484;
	}
`;

const LandingPage = () => {
	return (
		<div style={{ height: '100vh' }}>
			<Nav>
				<a href='/'>
					<img src={logo} alt='Recallr logo' width='56px' height='43px' />
				</a>
				<section>
					<Link href='/login'>Login</Link>
					<Link href='/sign-up'>Sign Up</Link>
					<Link href='#features'>Features</Link>
					<Link href='#about'>About</Link>
				</section>
			</Nav>
			<HeroSection>
				<section>
					<HeroImg
						src={heroImg}
						alt='Happy black man using an iPad. Picture from Shvets Production on pexels'
					/>
				</section>
				<HeroText>
					<H1>Recallr</H1>
					<P>A tool to help you keep track of your medical details.</P>
				</HeroText>
			</HeroSection>
			<FeatureSection id='features'>
				<FeatureHeader>Features</FeatureHeader>
				<Content>
					<FeatureDiv>
						<Title>Bio Data</Title>
						<Icon>
							<img src={dataIcon} alt='Icon of clipboard' />
						</Icon>
						<Text>
							Keep track of information like your blood type, height, weight etc
						</Text>
					</FeatureDiv>
					<FeatureDiv
						style={{
							padding: '0 20px 0 20px',
							borderRight: '2px solid #f16484',
							borderLeft: '2px solid #f16484',
						}}
					>
						<Title>Drug Subscriptions</Title>
						<Icon>
							<img src={drugIcon} alt='Icon of bandaid' />
						</Icon>
						<Text>Keep track of your drug subscriptions</Text>
					</FeatureDiv>
					<FeatureDiv>
						<Title>Medical History</Title>
						<Icon>
							<img src={historyIcon} alt='Icon of doctor' />
						</Icon>
						<Text>Keep track of your recent medical history</Text>
					</FeatureDiv>
				</Content>
			</FeatureSection>
			<About id='about'>
				<section style={{ width: '30em', margin: '20px' }}>
					<h2
						style={{
							fontSize: '1.5em',
							textAlign: 'center',
						}}
					>
						Project Inspiration
					</h2>
					<p style={{ marginTop: '20px', lineHeight: '25px' }}>
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
				<section>
					<h2
						style={{
							fontSize: '1.5em',
							textAlign: 'center',
						}}
					>
						Contact Me
					</h2>
					<div style={{ display: 'flex', gap: '50px', marginTop: '30px' }}>
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
					</div>
				</section>
				<Attribution>
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
				</Attribution>
			</About>
		</div>
	);
};

export default LandingPage;
