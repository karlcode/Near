import React from "react";

class Map extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        //update map here
    }

    componentDidMount() {
        this.map = new google.maps.Map(this.refs.map, {
            center: {lat: -33.8688, lng: 151.209},
            zoom: 13,
            streetViewControl: false,
            mapTypeControl: false
        });
    }

    render() {
        return (
            <div id="wrapper">
                
                <div id="map" ref="map">
                   
                    
                </div>
                <div id="absolute"><h1>Near: Find something to eat nearby</h1></div>
            </div>
        );
    }
}

export default  Map;