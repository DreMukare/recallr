import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
	color: #6b62fd;
	height: 100px;
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 20px;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	background: hsla(2, 78%, 82%, 1);

	background: #3b3d56; ;
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
