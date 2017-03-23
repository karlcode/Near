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
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }

    render() {
        return (
            <div>
                <h1>Hello World from Map</h1>
                <div id="map" ref="map"></div>
            </div>
        );
    }
}

export default  Map;