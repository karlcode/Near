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
                <p id="status">
                    {this.props.status} 
                    {this.props.loading &&
                        <img src={require("./images/loading.gif")} />
                    }
                </p> 
            </div>
        );
    }
}

export default  StatusBar;