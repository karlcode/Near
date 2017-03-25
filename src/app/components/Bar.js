import React from "react";
import Select from 'react-select';

 /*<select>
                    <option value="" disabled selected hidden></option>
                    <option value="1">things to do</option>
                    <option value="2">brothels</option>
                </select>*/
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
            <div>
            <div className="bar overlay" >
                <form >
                <h1>Suggest me some ... <input id="nearbyId" ref="ac" placeholder="nearby"/>
                </h1>
                </form>
            </div>
            <div className="panels overlay">
                <div id="foodButton" >
                    
                    <img src="http://www.freeiconspng.com/uploads/map-navigation-pin-point-restaurant-icon--14.png" width="200px"alt="Smiley face"/>
                    <h2> Restaurants</h2>
                </div>
                <div id="thingButton">
                    
                    <img src="https://cdn2.iconfinder.com/data/icons/airport-set-2/512/7-512.png" width="200px"alt="Smiley face"/>
                     <h2> Things to do</h2>
                </div>
           
                
            </div>
            </div>
        );
    }
}

export default Bar;