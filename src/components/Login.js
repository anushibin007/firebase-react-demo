import React, { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AuthContext, auth } from "../context/AuthContext";
import { toast } from "react-toastify";
import firebase from "firebase/app";
import "firebase/auth";

export default function Login() {
	const [authState, setAuthState] = useContext(AuthContext);

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
		auth.signOut().then(() => {
			setAuthState({ ...authState, user: undefined });
			toast("👋 See you soon");
		});
	};

	const renderLoginOrLogout = () => {
		if (!authState.user) {
			return (
				<Button variant="danger" onClick={handleSignIn}>
					<i className="bi bi-google"></i>&nbsp;Login with Google
				</Button>
			);
		} else {
			return (
				<Button variant="danger" onClick={signOut}>
					<i className="bi bi-google"></i>&nbsp;Log Out
				</Button>
			);
		}
	};

	return (
		<React.Fragment>
			<Col>
				<Row>{renderLoginOrLogout()}</Row>
			</Col>
		</React.Fragment>
	);
}
