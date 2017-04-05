import React from "react";

class PlacePopup extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: true
        };        

        this.close = this.close.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps)
            this.state.visible = nextProps.visible;
    }

    close() {
        this.setState({visible : null});
    }
    routeSearch() {
        var service = new google.maps.DistanceMatrixService();
        var currentMarker = this.props.current; 
        var origin = new google.maps.LatLng(currentMarker.position.lat(), currentMarker.position.lng());
        var place = this.props.place;
        service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [place.formatted_address],
            travelMode: 'WALKING'
        }, callback);
        function callback(response, status) {
            console.log(response.rows[0].elements[0].distance)
        }
    }

    render() {

        if (this.props.place === null || !this.state.visible)
            return(<div />)
         
        var place = this.props.place;
        var photo, name, rating, address, review, number, price, hours = '';
        var website = place.website;
    

        if (place.photos) {
            photo = place.photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350});
        }
        if (place.name) {
            name = place.name;
        }
        /*
        if (place.rating) {
            rating = place.rating + " / 5";
        }*/

        if (place.formatted_address) {
            address = place.formatted_address;
        }
        if (place.formatted_phone_number) {
            number = place.formatted_phone_number;
        }
        else{ number = "None available"}
        if (place.price_level) {
            price = place.price_level;
        }

        /*
        if (place.price_level) {
            price = place.price_level;
            if (price == 1){price = "$"}
            if (price == 2){price = "$$"}
            if (price == 3){price = "$$$"}
            if (price == 4){price = "$$$$"}
        }*/

         if (place.opening_hours) {
            if (place.opening_hours.open_now) {hours = "Open now"}
            else{ hours = "Closed now"}
        }

        return (
            <div>
                <div id="place-popup-overlay" onClick={this.close} />
                    <div className="place-popup">
                        <h1 className="place-popup-title"><a href={website} target="_blank">{name}</a></h1>
                        <div className="info">
                            <p><i>{hours}</i> </p>
                            <p>{this.routeSearch()} </p> 
                            <p><strong>Phone:</strong> {number}</p>
                            <p>{address}</p>
                            <p className="place-popup-links"><a onClick={this.props.search}><i className="fa fa-random" aria-hidden="true"></i></a><a href={place.url} target="_blank"><i className="fa fa-map" aria-hidden="true"></i></a></p>
                        </div>
                        <img src={photo} />
                    </div>
            </div>
            
        );
    }
}

export default PlacePopup;