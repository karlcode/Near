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
                fun: false
            }
        };
    }

    componentDidMount() {
        // Boostrap autocomplete bar
        this.sendMapEvent('bootstrapAC', this.refs.ac);
        this.sendMapEvent('categoryUpdate', this.state.categories);
    }

    sendMapEvent(title, data) {
        this.props.handleMapEvent({
            title: title,
            data: data
        });
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
        this.sendMapEvent('categoryUpdate', this.state.categories);
    }

    render() {
        return (
            <div className="widget overlay" >
                <h1>find me nearby</h1>
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
                <div className={"widget-category "  + this.isCategoryActive(this.state.categories.fun)} onClick={() => this.toggleCategoryState('fun')}>
                    <div className="widget-button">
                        <i className="fa fa-rocket" aria-hidden="true"></i>
                    </div>
                    <p>fun</p>
                </div>
            </div>
        );
    }
}

export default Widget;

/**       <div className="bar overlay" >
                <form >
                <h1>Suggest me some ... <input id="nearbyId" ref="ac" placeholder="nearby"/>
                </h1>
                </form>
            </div> */