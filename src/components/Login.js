import React from "react";
import { signInWithGoogle } from "../services/firebase";
import { Button } from "react-bootstrap";

export default function Login() {
	return (
		<div className="login-buttons">
			<Button variant="danger" onClick={signInWithGoogle}>
				<i className="bi bi-google"></i>&nbsp;Google Login
			</Button>
		</div>
	);
}
