import React from "react";

class Bar extends React.Component {
    componentDidMount() {
        // Boostrap autocomplete bar
        this.props.handleMapEvent({
            title: 'bootstrapAC',
            data: this.refs.ac
        });
    }

    render() {
        return (
            <div className="bar overlay">
                <h1>Find restaurants nearby</h1>
                <input ref="ac" style={{"width": "100%"}}></input>
            </div>
        );
    }
}

export default Bar;