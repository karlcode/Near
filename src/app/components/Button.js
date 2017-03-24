import React from "react";

class Button extends React.Component {
    
    handleClick() {
        this.props.handleMapEvent({title: this.props.mapEvent});
    }

    render() {
        return (
            <button className="button overlay" id={this.props.id} onClick={this.handleClick.bind(this)}>
                {this.props.text}
            </button>                
        );
    }
}

export default Button;