import React from 'react';
import styled from 'styled-components';

const A = styled.a`
	text-align: center;
	text-decoration: none;
	color: #ff6685;
	margin: 0;
	padding: 0;
	transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);

	&:hover {
		color: #6b62fd;
	}

	&::before {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 0;
		height: 2px;
		background-color: #6b62fd;
		transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
	}

	@media (hover: hover) and (pointer: fine) {
		&:hover::before {
			left: 0;
			right: auto;
			width: 3.5rem;
		}
	}
`;

const Linker = ({ text, to, classname }) => {
	return (
		<A href={to} className={classname || 'link'}>
			{text}
		</A>
	);
};

export default Linker;
