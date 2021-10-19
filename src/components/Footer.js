import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
	height: 200px;
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 20px;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	background: hsla(2, 78%, 82%, 1);

	background: linear-gradient(
		45deg,
		hsla(2, 78%, 82%, 1) 0%,
		hsla(243, 97%, 69%, 1) 69%,
		hsla(236, 19%, 28%, 1) 100%
	);

	background: -moz-linear-gradient(
		45deg,
		hsla(2, 78%, 82%, 1) 0%,
		hsla(243, 97%, 69%, 1) 69%,
		hsla(236, 19%, 28%, 1) 100%
	);

	background: -webkit-linear-gradient(
		45deg,
		hsla(2, 78%, 82%, 1) 0%,
		hsla(243, 97%, 69%, 1) 69%,
		hsla(236, 19%, 28%, 1) 100%
	);

	filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#f5b1af", endColorstr="#6b62fd", GradientType=1 );
`;

const H2 = styled.h2`
	margin-right: 30px;
`;

export const Footer = () => {
	return (
		<FooterContainer>
			<H2>Recallr</H2>
		</FooterContainer>
	);
};
