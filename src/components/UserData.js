import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import faker from "faker";
import firebase from "firebase";
import "firebase/firestore";
import { Button } from "react-bootstrap";

const UserData = () => {
	const [authState] = useContext(AuthContext);

	const [dbItems, setDbItems] = useState();

	const db = firebase.firestore().collection("things");

	const addItemToDb = () => {
		db.add({
			uid: authState.user.uid,
			name: faker.commerce.productName(),
		});
	};

	if (authState.user) {
		db.where("uid", "==", authState.user.uid).onSnapshot((querySnapshot) => {
			const items = querySnapshot.docs.map((doc) => {
				return doc.data().name;
			});
			setDbItems(items);
		});
	}

	const render = () => {
		if (authState.user) {
			return (
				<div>
					<p>Logged in as {authState.user.displayName}</p>
					<Button onClick={addItemToDb}>Add a Random Item</Button>
					{dbItems &&
						dbItems.map((item) => {
							return <li key={item.id}>{item}</li>;
						})}
				</div>
			);
		}
	};

	return <React.Fragment>{render()}</React.Fragment>;
};

export default UserData;
