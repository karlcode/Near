import React from "react";
import ReactDom from "react-dom";

import Bar from "./components/Bar.js"
import Map from "./components/Map.js"

require("./styles/main.scss");

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Bar />
                <Map />
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('app')
)
