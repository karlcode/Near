import React from "react";
import Select from 'react-select';


class Widget extends React.Component {
    constructor() {
        super();

        this.state = {
            categories: {
                food: true,
                drinks: false,
                shops: false,
            },
            slider : 500
        };
    }

    componentDidMount() {
        // Boostrap autocomplete bar
        this.sendMapEvent('bootstrap', {ac : this.refs.ac, searchOptions: this.getState()});
        //this.sendMapEvent('categoryUpdate', this.state.categories);
            //this.sendMapEvent('categoryUpdate', this.state.categories);
    }

    sendMapEvent(title, data) {
        this.props.handleMapEvent({
            title: title,
            data: data
        });
    }

    getState() {
        return {
            categories: this.state.categories,
            range: this.state.slider
        }
    }
    
    searchUpdate() {
        this.sendMapEvent('searchUpdate', this.getState());
    }

    search() {
        this.sendMapEvent('search');
    }


    isCategoryActive(category) {
        var ret = '';
        if (category)
            ret = 'active';
        return ret;
    }

    toggleCategoryState(category) {
        var categories = this.state.categories;
        categories[category] = !categories[category];
        this.setState({categories: categories});
        this.searchUpdate();
    }

    sliderChange(event) {
        this.setState({slider: event.target.value});
        this.searchUpdate();
    }
    

    render() {
        return (
            <div className="widget overlay" >
                <h1>Find</h1>
                <div className="widget-categories">
                    <div className={"widget-category " + this.isCategoryActive(this.state.categories.food)} onClick={() => this.toggleCategoryState('food')}>
                        <div className="widget-button">
                            <i className="fa fa-cutlery" aria-hidden="true"></i>
                        </div>
                        <p>food</p>
                    </div>
                    <div className={"widget-category " + this.isCategoryActive(this.state.categories.drinks)} onClick={() => this.toggleCategoryState('drinks')}>
                        <div className="widget-button">
                            <i className="fa fa-glass" aria-hidden="true"></i>
                        </div>
                        <p>drinks</p>
                    </div>
                    <div className={"widget-category " +  this.isCategoryActive(this.state.categories.shops)} onClick={() => this.toggleCategoryState('shops')}>
                        <div className="widget-button">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                        </div>
                        <p>shops</p>
                    </div>
                </div>
                <h1>Within</h1>
                <h2 id ="widget-distance">{round((this.state.slider / 1000), 1)} km</h2>
                <input id="widget-range" type="range" min="500" max="10000" value={this.state.slider} onChange={this.sliderChange.bind(this)}/>
                <h1>From</h1>
                <h2>Current Location</h2>
                <input id="widget-change-location" ref="ac" placeholder="Change Location"/>
                <div id="widget-search">
                    <h1 onClick={() => this.search()}>Search!</h1>
                </div>
                {/*
                <div className={"widget-category "  + this.isCategoryActive(this.state.categories.fun)} onClick={() => this.toggleCategoryState('fun')}>
                    <div className="widget-button">
                        <i className="fa fa-rocket" aria-hidden="true"></i>
                    </div>
                    <p>fun</p>
                </div>*/}
            </div>
        );
    }
}

export default Widget;

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
      
/*             <div className="bar overlay" >
                <form >
                <h1>Suggest me some restaurants <input id="nearbyId" ref="ac" placeholder="nearby"/>
                </h1>
                </form>
            </div> */