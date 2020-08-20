import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Logout from "./components/Logout/Logout";

import { Button } from "antd";

function App() {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
