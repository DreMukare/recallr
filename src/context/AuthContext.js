import React, { useContext, useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const login = (email, password) => {
		return projectAuth.signInWithEmailAndPassword(email, password);
	};

	const logout = () => {
		return projectAuth.signOut();
	};

	const resetPassword = (email) => {
		return projectAuth.sendPasswordResetEmail(email);
	};

	const updatePassword = (password) => {
		return currentUser.updatePassword(password);
	};

	useEffect(() => {
		const unsubscribe = projectAuth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		logout,
		updatePassword,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
