import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import firebase from "firebase/app";
import "firebase/auth";

export default function Login() {
	const [authState, setAuthState] = useContext(AuthContext);

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

	const auth = firebase.auth();
	const googleProvider = new firebase.auth.GoogleAuthProvider();

	const handleSignIn = () => {
		signInWithGoogle();
	};

	const signInWithGoogle = () => {
		firebase
			.auth()
			.signInWithPopup(googleProvider)
			.then((res) => {
				console.log(res.user);
				toast("👋 Hello " + res.user.displayName + " (" + res.user.email + ")");
				setAuthState({ ...authState, user: res.user });
				return res.user;
			})
			.catch((error) => {
				toast("💔 Login failed : " + error.message);
				console.error(error.message);
			});
	};

	const signOut = () => {
		auth.signOut();
		setAuthState({ ...authState, user: undefined });
	};

	const renderLoginOrLogout = () => {
		if (!authState.user) {
			return (
				<div className="login-buttons">
					<Button variant="danger" onClick={handleSignIn}>
						<i className="bi bi-google"></i>&nbsp;Google Login
					</Button>
				</div>
			);
		} else {
			return (
				<div className="login-buttons">
					<Button variant="danger" onClick={signOut}>
						<i className="bi bi-google"></i>&nbsp;Sign Out
					</Button>
				</div>
			);
		}
	};

	return <React.Fragment>{renderLoginOrLogout()}</React.Fragment>;
}
