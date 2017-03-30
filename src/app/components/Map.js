import React from "react";
import StatusBar from "./StatusBar.js"

const defaultLoc = {lat: -33.8688, lng: 151.209};
var markers = [];
var bounds = new google.maps.LatLngBounds();

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'Loading Map'
        };
    }

    componentDidMount() {
        this.map = createMap(this.refs.map, defaultLoc);
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.currentMarker = addMarker(this.map, defaultLoc, true, '');
        markers = [];

        this.updateStatus('Requesting Location')
        getLocation(this.map, function(location) {
            if (location) {
                removeMarker(this.currentMarker);
                this.currentMarker = addMarker(this.map, location, true, '');
                this.map.panTo(this.currentMarker.position);
                this.updateStatus('Location set. Search for things nearby!')
            } else {
                this.updateStatus('Unable to set Location. Manually set.')
        }}.bind(this));

        
    }

    // force component not to re-render, so map is loaded only once
    shouldComponentUpdate() {return false;}

    // fired when parent is updated
    componentWillReceiveProps(nextProps) {
        var event = nextProps.mapEvent;

        if (event) {
            switch(event.title) {
                case 'search':
                    this.search();
                    break;
                case 'bootstrap' :
                    this.searchOptions = event.data.searchOptions;
                    this.bootstrapAC(event.data.ac);
                    break;
                case 'searchUpdate':
                    this.searchOptions = event.data;
                    break;
            }
        }
    }

    search() {
        var category = this.getRandomCategory();
        var distance = this.searchOptions.range;

        this.placesService.radarSearch({
            type: category,
            radius: distance,
            location: this.currentMarker.position
        }, (results) => {
            var randomPlace = results[Math.floor(Math.random() * results.length)];
            clearMarkers();
            console.log(randomPlace);
            addMarker(this.map, randomPlace.geometry.location, false, '');
        });
    }

    getRandomCategory() {
        var possibleCategories = [];
        var categories = this.searchOptions.categories;

        if (categories.food) {
            possibleCategories.push('restaurant');
        }
        if (categories.drinks) {
            possibleCategories.push('bar');
        }
        if (categories.shops) {
            possibleCategories.push('shopping_mall')
        }

        // if user chose 0 categories, choose from all
        if (possibleCategories.length == 0) {
            possibleCategories.push('restaurant');
            possibleCategories.push('bar');
            possibleCategories.push('shopping_mall');
        }

        return possibleCategories[Math.floor(Math.random() * possibleCategories.length)];
    }


    // bind input from widget to map
    bootstrapAC(input) {
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', () => {
            var place = autocomplete.getPlace();
            if (place.geometry) {
                var location = place.geometry.location;
                removeMarker(this.currentMarker);
                this.currentMarker = addMarker(this.map, location, true, '');
                this.map.panTo(location);
            }
        });
    }

    updateStatus(status) {
        this.setState({
            status: status
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div id="map-wrapper">
                <div id="map" ref="map" />
                <StatusBar status={this.state.status}/>
            </div>
        );
    }
}

export default  Map;


/* MAP UTILS */
const foodTypes = 'bakery cafe meal_delivery meal_takeaway restaurant';
const drinksTypes = 'night_club';
const shopsTypes = 'book_store clothing_store convenience_store department_store furniture_store jewelry_store shoe_store shopping_mall';
const funTypes = 'amusement_park aquarium art_gallery bowling_alley campground casino movie_theater spa stadium zoo';

function createMap(element, location) {
    var map = new google.maps.Map(element, {
        center: location,
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false,
        styles: [
            {   
                featureType: "road",
                elementType: "labels",
                stylers: [{visibility: "off"}] 
            },   
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'poi.business',
                stylers: [{visibility: 'on'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}]
            }
        ]
    });
    return map;
}

function getLocation(map, callback) {
    var location = '';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        callback(location);
    }, function() {callback(location)});
    } else {
        callback(location)
    }
}


function addMarker(map, position, draggable, title, icon) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: draggable,
        title: title,
        icon: icon,
    })
    markers.push(marker);
    return(marker);
}

function removeMarker (marker) {
    marker.setMap(null);
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {       
        markers[i].setMap(null);
    }
}
