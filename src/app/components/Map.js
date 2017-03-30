import React from "react";
import StatusBar from "./StatusBar.js"

const defaultLoc = {lat: -33.8688, lng: 151.209};
var markers = [];
var bounds = new google.maps.LatLngBounds();

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'Loading Map',
            loading: true
        };
    }

    componentDidMount() {
        this.map = createMap(this.refs.map, defaultLoc);
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.currentMarker = addMarker(this.map, defaultLoc, true, '');
        markers.pop(this.currentMarker);
        

        this.updateStatus('Requesting Location', true)
        getLocation(this.map, function(location) {
            if (location) {;
                this.currentMarker.setPosition(location);
                this.map.panTo(location);
                this.updateStatus('Location set. Search for things nearby!', false);
            } else {
                this.updateStatus('Unable to set Location. Manually set.', false);
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
                    this.search(event.data);
                    break;
                case 'bootstrap' :
                    this.searchOptions = event.data.searchOptions;
                    this.bootstrapAC(event.data.ac);
                    break;
                case 'searchUpdate':
                    this.searchUpdate(event.data);
                    break;
            }
        }
    }

    fitMarkers() {
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(this.currentMarker.getPosition());
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

        google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
            console.log(this.map.getZoom());
            this.map.setZoom(this.map.getZoom()-1);
        });

        this.map.fitBounds(bounds);
        this.map.setCenter(bounds.getCenter());
    }


    searchUpdate(searchOptions) { 
        this.searchOptions = searchOptions;

        var categories = [];
        if (searchOptions.categories.food) {
            categories.push('food');
        }
        if (searchOptions.categories.drinks) {
            categories.push('drinks');
        }
        if (searchOptions.categories.shops) {
            categories.push('shops')
        }

        var status = "Finding: " + categories.join(', ') +
        "  Within: " + round((searchOptions.range / 1000), 1) + "km";
        this.updateStatus(status, false)
    }

    search(searchButton) {
        var category = this.getRandomCategory();
        var distance = this.searchOptions.range;

        this.updateStatus('Searching for a place nearby.', true)
        this.placesService.radarSearch({
            type: category,
            radius: distance,
            location: this.currentMarker.position
        }, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var randomPlace = results[Math.floor(Math.random() * results.length)];
                clearMarkers();
                addMarker(this.map, randomPlace.geometry.location, false, '');
                this.fitMarkers();
                this.updateStatus('Place found!', false)
            } else {
                this.updateStatus('Unable to find place that matches criteria.', false)
            }
            searchButton.className = "";
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
                this.currentMarker.setPosition(location);
                this.map.panTo(location);
            }
            this.updateStatus('Location set to: ' + input.value, false)
            input.value = "";
        });
    }

    updateStatus(status, loading) {
        this.setState({
            status: status,
            loading: loading
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div id="map-wrapper">
                <div id="map" ref="map" />
                <StatusBar status={this.state.status} loading={this.state.loading}/>
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
    }, function() {callback(location)}, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
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
    markers = [];
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
