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
            
                
            <div className="bar overlay" >
                <form >
                <h1>Suggest me some ... <input id="nearbyId" ref="ac" placeholder="nearby"/>
                </h1>
                </form>
            </div>
         
        );
    }
}

export default Bar;