import React from "react";
import ReactDom from "react-dom";
import Button from "./components/Button.js"
import Map from "./components/Map.js"

require("./styles/main.scss");

class App extends React.Component {
    render() {
        return (
            <div>
                <Map />
                <Button />
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('app')
)
