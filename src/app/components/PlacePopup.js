import React from "react";

class PlacePopup extends React.Component {
    constructor() {
        super();
        this.state = {
            created: false
        };        
    }


    render() {

        if (this.props.place === null)
            return(<div />)
            
        var place = this.props.place;
        var photo, name, rating;
        photo = name = rating = '';

        if (place.photos) {
            photo = place.photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350});
        }
        if (place.name) {
            name = place.name;
        }
        if (place.rating) {
            rating = place.rating;
        }

        return (
            <div className="place-popup">
                <p>{name}</p>
                <p>{rating}</p>
                <img src = {photo} />
            </div>
        );
    }
}

export default PlacePopup;