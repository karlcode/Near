import React from "react";
import ReactDom from "react-dom";

import Widget from "./components/Widget.js"
import Map from "./components/Map.js"

require("./styles/main.scss");

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            mapEvent: ''
        };

        this.handleMapEvent = this.handleMapEvent.bind(this);
        
    }

    handleMapEvent(event) {
        this.setState({
            mapEvent: event
        });        
    }

    render() {
        return (
            <div id="app">
                <Widget handleMapEvent={this.handleMapEvent}/>
                <Map mapEvent={this.state.mapEvent}/>
                {/*<Button id="button-find" text={'find'} mapEvent={'find'} handleMapEvent={this.handleMapEvent}/>*/}
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('app')
)
