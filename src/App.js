import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";

function App() {
	return (
		<Container>
			<Login />
			<ToastContainer position="bottom-right" />
		</Container>
	);
}

export default App;
