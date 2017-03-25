import React from "react";
import Select from 'react-select';


class Bar extends React.Component {
    constructor() {
        super();

        var categories = {
            food: {active: true},
            drinks: {active: false},
            shops: {active: true},
            fun: {active: true}
        }

    }

    componentDidMount() {
        // Boostrap autocomplete bar
        this.props.handleMapEvent({
            title: 'bootstrapAC',
            data: this.refs.ac
        });
    }

    render() {
        return (
            <div className="widget overlay" >
                <h1>find me nearby</h1>
                <div className={"widget-category"}>
                    <div className="widget-button">
                        <i className="fa fa-cutlery" aria-hidden="true"></i>
                    </div>
                    <p>food</p>
                </div>
                <div className="widget-category">
                    <div className="widget-button">
                        <i className="fa fa-glass" aria-hidden="true"></i>
                    </div>
                    <p>drinks</p>
                </div>
                <div className="widget-category">
                    <div className="widget-button">
                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                    </div>
                    <p>shops</p>
                </div>
                <div className="widget-category">
                    <div className="widget-button">
                        <i className="fa fa-rocket" aria-hidden="true"></i>
                    </div>
                    <p>fun</p>
                </div>
            </div>
        );
    }
}

export default Bar;

/**       <div className="bar overlay" >
                <form >
                <h1>Suggest me some ... <input id="nearbyId" ref="ac" placeholder="nearby"/>
                </h1>
                </form>
            </div> */