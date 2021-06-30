import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserData = () => {
	const [authState] = useContext(AuthContext);

	const render = () => {
		return authState.user && `Logged in as ${authState.user.displayName}`;
	};

	return <React.Fragment>{render()}</React.Fragment>;
};

export default UserData;
