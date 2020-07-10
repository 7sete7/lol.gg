import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Home from "Views/Home";
import Detail from "Views/Detail";

const App = () => (
	<HashRouter>
		<Switch>
			<Route exact path="/" component={Home} />
      <Route exact path="/summoner/:name" component={Detail} />
		</Switch>
	</HashRouter>
);

export default App;
