import React from "react";

class PlacePopup extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: true,
            distance: '~'
        };        

        this.close = this.close.bind(this);
        this.distanceService = new google.maps.DistanceMatrixService();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.props !== nextProps)
            this.state.visible = nextProps.visible;

         console.log(this.props);
        if (nextProps.place)
            this.routeSearch(nextProps);  
    }

    close() {
        this.setState({visible : null});
    }

    routeSearch(props) {
        if (this.placeID != props.place.place_id) {
            this.placeID = props.place.place_id;
            this.setState({distance: '~'});

            this.distanceService.getDistanceMatrix({
                origins: [props.current.position],
                destinations: [props.place.formatted_address],
                travelMode: 'WALKING'
            }, (response, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    this.setState({distance: (response.rows[0].elements[0].distance.text)});
                }
            });
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
                            <p><strong>Distance:</strong> {this.state.distance}</p> 
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