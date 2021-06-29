import firebase from "firebase/app";
import "firebase/auth";
import { toast } from "react-toastify";

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
	firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
	auth.signInWithPopup(googleProvider)
		.then((res) => {
			console.log(res.user);
			toast("👋 Hello " + res.user.displayName + " (" + res.user.email + ")");
		})
		.catch((error) => {
			toast("💔 Login failed : " + error.message);
			console.error(error.message);
		});
};
