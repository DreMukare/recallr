import React, { useContext, useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import {
	signInWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signOut,
	updatePassword,
	createUserWithEmailAndPassword,
} from '@firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const login = (email, password) => {
		return signInWithEmailAndPassword(projectAuth, email, password);
	};

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(projectAuth, email, password);
	};

	const logout = () => {
		return signOut(projectAuth);
	};

	const resetPassword = (email) => {
		return sendPasswordResetEmail(email);
	};

	const updatePass = (password) => {
		return updatePassword(currentUser, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(projectAuth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		logout,
		signup,
		updatePass,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
