import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminArea from "./components/AdminArea";
import CasinoList from "./components/CasinoList";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<CasinoList />} />
					<Route path="/admin" element={<AdminArea />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
