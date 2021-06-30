import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/AuthContext";
import UserData from "./components/UserData";

function App() {
	return (
		<Container>
			<AuthProvider>
				<Login />
				<UserData />
			</AuthProvider>
			<ToastContainer position="bottom-right" />
		</Container>
	);
}

export default App;
