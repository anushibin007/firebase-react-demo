/* eslint-disable */

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import faker from "faker";
import firebase from "firebase";
import "firebase/firestore";
import { Button, Col, Row, Alert } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

const UserData = () => {
	const [authState] = useContext(AuthContext);

	const [dbItems, setDbItems] = useState();

	const db = firebase.firestore();

	const thingsDb = db.collection("things");

	const addItemToDb = () => {
		const newItem = faker.commerce.productName();
		thingsDb
			.add({
				itemid: uuid(),
				uid: authState.user.uid,
				name: newItem,
				category: "commerce.productName",
			})
			.then(() => {
				toast.success(`✅ "${newItem}" added`);
			});
	};

	useEffect(async () => {
		let unsubscribe;
		if (authState.user) {
			unsubscribe = thingsDb.where("uid", "==", authState.user.uid).onSnapshot((querySnapshot) => {
				const items = querySnapshot.docs.map((doc) => {
					return doc.data();
				});
				setDbItems(items);
			});
		} else {
			unsubscribe && unsubscribe();
		}
	}, [authState.user]);

	const render = () => {
		if (authState.user) {
			return (
				<div>
					<Col>
						<Row>
							<Alert variant="warning">Logged in as {authState.user.displayName}</Alert>
						</Row>
						<Row>
							<Button onClick={addItemToDb} autoFocus>
								Add a Random Item
							</Button>
						</Row>
					</Col>
					<br />
					{dbItems &&
						dbItems.map((item) => {
							return (
								<span key={item.itemid} className="badge bg-success rounded-pill m-1">
									{item.name}
								</span>
							);
						})}
				</div>
			);
		}
	};

	return <React.Fragment>{render()}</React.Fragment>;
};

export default UserData;
