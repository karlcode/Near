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
        var photo, name, rating, address, review, number, price, hours = '';
        var website = place.website;
    

        if (place.photos) {
            photo = place.photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350});
        }
        if (place.name) {
            name = place.name;
        }
        if (place.rating) {
            rating = place.rating + "/5";
        }
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
        if (place.price_level) {
            price = place.price_level;
            if (price == 1){price = "$"}
            if (price == 2){price = "$$"}
            if (price == 3){price = "$$$"}
            if (price == 4){price = "$$$$"}
        }
         if (place.opening_hours) {
            if (place.opening_hours.open_now) {hours = "Open now"}
            else{ hours = "Closed now"}
        }

        return (
            <div className="place-popup">
                <div className="flexwrap">
                    <div className="firstFlex">
                    <h1><a href = {website}>{name}</a></h1>
                    <p>{price}</p> <p>{rating}</p> 
                    </div>
                    <div className="secondFlex">
                    <p>{address}</p>
                    <p>Phone: {number}</p>
                    <p><i>{hours}</i> </p>
                     </div>
                <img src = {photo} />
                </div>
            </div>
        
        );
    }
}

export default PlacePopup;