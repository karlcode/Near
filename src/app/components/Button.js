import React from "react";

class Button extends React.Component {
    handleClick() {
        this.props.handleMapEvent(this.props.mapEvent);
    }

    render() {
        return (
            <div id="button">
               <button id="locationButton" type="button" onClick={this.handleClick.bind(this)}>Find!</button>                
            </div>
        );
    }
}

export default Button;