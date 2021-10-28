import React from 'react';
import styled from 'styled-components';

const A = styled.a`
	color: #6b62fd;
	transition: all 0.4s ease-in-out;

	&:hover {
		color: #f16484;
		transform: scale(1.5, 1.5);
		margin: 5px 15px 0 25px;
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
