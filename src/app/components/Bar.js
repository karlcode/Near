import React from "react";
import Select from 'react-select';


class Bar extends React.Component {
    render() {
        return (
            <div className="bar overlay">
                <h1>Find<Select
                placeholder= "restaurants"/></h1>
                
               
            </div>
        );
    }
}

export default Bar;