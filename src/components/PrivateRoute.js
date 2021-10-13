import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useAuth();

	console.log(currentUser);

	return (
		<Route
			exact
			{...rest}
			render={(props) => {
				return currentUser ? <Component {...props} /> : <Redirect to={'/'} />;
			}}
		></Route>
	);
};

export default PrivateRoute;
