import { createContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const AuthContext = createContext();

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: "AIzaSyACCHgp6UEYQcIdtcW8V7KWEn2T8DVAe1k",
		authDomain: "fir-react-demo-c5a92.firebaseapp.com",
		projectId: "fir-react-demo-c5a92",
		storageBucket: "fir-react-demo-c5a92.appspot.com",
		messagingSenderId: "80104492686",
		appId: "1:80104492686:web:a81ae7d80c0acb7c5c03df",
		measurementId: "G-5K9794DBGX",
	});
} else {
	firebase.app();
}

export const auth = firebase.auth();

export const AuthProvider = (props) => {
	const [authState, setAuthState] = useState({ user: undefined });

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			setAuthState({
				user: user,
			});
		});
	}, []);

	return <AuthContext.Provider value={[authState, setAuthState]}>{props.children}</AuthContext.Provider>;
};
