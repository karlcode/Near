import React from "react";

class StatusBar extends React.Component {
    constructor() {
        super();
        this.state = {
            status: ''
        };        
    }


    render() {
        return (
            <div id="">
                <p id="status">{this.props.status}</p> 
            </div>
        );
    }
}

export default  StatusBar;