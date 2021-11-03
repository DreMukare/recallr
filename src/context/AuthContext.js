import React, { useContext, useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';

// create AuthContext
const AuthContext = React.createContext();

// creating custom hook to use AuthContext
export const useAuth = () => {
	return useContext(AuthContext);
};

// creating AuthProvider
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// function to implement firebase auth login
	const login = (email, password) => {
		return projectAuth.signInWithEmailAndPassword(email, password);
	};

	// function to implement firebase auth signup
	const signup = (email, password) => {
		return projectAuth.createUserWithEmailAndPassword(email, password);
	};

	// function to implement firebase logout
	const logout = () => {
		return projectAuth.signOut();
	};

	// function to sent password reset email to user
	const resetPassword = (email) => {
		return projectAuth.sendPasswordResetEmail(email);
	};

	// function to allow user to update password
	const updatePass = (password) => {
		return currentUser.updatePassword(password);
	};

	// useEffect rerenders based on auth state of user. sets currentUser state on change
	useEffect(() => {
		const unsubscribe = projectAuth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	// object and function made available through useAuth hook
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
