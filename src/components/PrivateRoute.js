import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute Component
 * Higher Order Component to wrap around components that shouldn't be accessed without user being logged in
 * checks whether current user is logged in by checking whether the currentUser object from auth context is null
 * if null it redirects to the login page else it allows access to the component
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useAuth();

	console.log(currentUser);

	return (
		<Route
			exact
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to={'/login'} />
				);
			}}
		></Route>
	);
};

export default PrivateRoute;
