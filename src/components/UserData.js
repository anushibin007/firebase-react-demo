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

	const addItemToDb = async (howMany) => {
		if (!howMany) howMany = 1;
		const newItem = faker.commerce.productName();
		var batch = db.batch();
		for (var i = 0; i < howMany; i++) {
			var thingsDbRef = thingsDb.doc();
			batch.set(thingsDbRef, {
				itemid: uuid(),
				uid: authState.user.uid,
				name: newItem,
				category: "commerce.productName",
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			});
		}
		batch
			.commit()
			.then(() => {
				toast.success(`✅ Added ${howMany} new random item(s)`);
			})
			.catch((err) => {
				toast.error(`Error: ${err}`);
			});
	};

	const addOneItemToDb = async () => {
		addItemToDb(1);
	};

	const addTenItemsToDb = async () => {
		addItemToDb(10);
	};

	const deleteFromDb = async (howMany) => {
		if (!howMany) howMany = 1;
		var batch = db.batch();
		thingsDb
			.where("uid", "==", authState.user.uid)
			.limit(howMany)
			.get()
			.then((queryResult) => {
				queryResult.forEach((doc) => {
					batch.delete(doc.ref);
				});
			})
			.then(() => {
				batch
					.commit()
					.then(() => {
						toast.success(`🗑 Deleted ${howMany} items`);
					})
					.catch((err) => {
						toast.error(`Error: ${err}`);
					});
			});
	};

	const deleteFiftyFromDb = async () => {
		deleteFromDb(50);
	};

	/*	const deleteAllFromDb = () => {
		for (var i = dbItems.length; i >= 0 || i + 50 > 0; ) {
			if (!waitForMe) {
				toast(i);
				deleteFromDb();
				i -= 50;
			}
		}
	};*/

	useEffect(async () => {
		let unsubscribe;
		if (authState.user) {
			unsubscribe = thingsDb
				.where("uid", "==", authState.user.uid)
				.orderBy("createdAt")
				.onSnapshot((querySnapshot) => {
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
							<Alert variant="success">
								<i className="bi bi-person-check-fill"></i>&nbsp;Logged in as {authState.user.displayName}
							</Alert>
						</Row>
						<Row>
							<Button onClick={addOneItemToDb} autoFocus>
								<i className="bi bi-plus-lg"></i>&nbsp;Add a Random Item
							</Button>
						</Row>
						<Row>
							<Button onClick={addTenItemsToDb} autoFocus>
								<i className="bi bi-plus-lg"></i>&nbsp;Add 10 Random Items
							</Button>
						</Row>
						<Row>
							<Button onClick={deleteFiftyFromDb} variant="warning">
								<i className="bi bi-trash"></i>&nbsp;Delete 50 Items
							</Button>
						</Row>
					</Col>
					<br />
					<h3>Total {dbItems && dbItems.length} items</h3>
					{dbItems &&
						dbItems.map((item) => {
							return (
								<span key={item.itemid} className="badge bg-success rounded-pill m-1 animate__animated animate__bounceIn">
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
