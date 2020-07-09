import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Home from 'Views/Home';

const App = () => (
	<HashRouter>
		<Switch>
			<Route exact path="/" component={Home} />
		</Switch>
	</HashRouter>
);

export default App;
