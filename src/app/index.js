import React from "react";
import ReactDom from "react-dom";
require("./styles/main.scss");

class App extends React.Component {
    render() {
        return (
            <h1>Hello World</h1>
        );
    }
}

const app = document.getElementById('app');
ReactDom.render(<App/>, app)
