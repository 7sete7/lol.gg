import React from "react";
import ReactDOM from "react-dom";

import Router from "./Router";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, Theme } from '@material-ui/core/styles';

const App = () => (
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Router />
    </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
