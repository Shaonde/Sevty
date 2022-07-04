import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { ThemeProvider } from "@material-ui/core";
import ThemeS from "./ThemeS";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<ThemeProvider theme={ThemeS}>
            <HomePage />
        </ThemeProvider>);
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);