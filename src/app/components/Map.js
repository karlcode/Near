import React from "react";
import StatusBar from "./StatusBar.js"
import PlacePopup from "./PlacePopup.js"

const defaultLoc = {lat: -33.8688, lng: 151.209};
var markers = [];
var bounds = new google.maps.LatLngBounds();
var positionIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADuElEQVRoQ+2YXW4SURTHz7lQE4aYdAPadgXSFRRSXwwY6wpKBV98oiuwrkCefJFaugIxQnyRACvouIK2uoEmhiExM/eYS4vODHNnzgyQZhL6WO7ce37n697zR0j5H6bcflgD6CK48+E3uX+7fPNwJc5ayabK8DUAsziXFoHqt8l2xoE9QDpAgs3+T6fotmH/cWZICDdA2HEyMGo/y10xbQxdtjBArTs5RJQNACy4T+pfO56D97cyPkPIJBLN00rufBGQxAD1r5MiCTpDgO0gA6IBZl+RCVIct57nhklAEgHUeuMzBKyGHcgHuN2FgNqn5fxRXIhYANUBbWbHk8+A4Mlv16EjIOgAodn/ZQ88NfAoWwKkAgFVEfFJoKEEQzufe9ku4Q0XhA0wNd6yBv5cn3qP6NzJiBN3YYa10duClyeIeDhvKJm2YZS4EGyAetca+D1PRD8EblQ/lh+YfkM498Dr3p+CBLuDAFue7wmGrYpR4kSBBaDJ+ZFt5A64ntIZcxvZSQcA9txruDURCaC6DQjy5DMAjFplQ1cHHMfNran3LNWFPBAgsRTVnSIBaj3r0t0qVdo4eaO4qOf9BCoSGWtietOJzFY5vxvmkVCAV71JVQCduTdAyO4G5Xwit/s+UjVBYF+4/y0Bjz6Vc23d/qEA9d74wt11VLc5reRD+/+iILXuuO3tTuFR0AKoVpeVdOk2yBa4s6w3jLaoY56rBQhIn6UXrg6i1h2b7ssuLI20APWepVrbi3+HEBy3KkZz0RThfF/vWg1AeO9a+6VVNg6Cvg0D8LY1RkvjGMdZE9C6tdH3APhvT91hqxoPk5y/BuCkBHfNOgJuT829TdJQxD6AdLfR+7zI/E+YRBdZ6p8SKp38V/p9PObU8/20kvdINt7XcUiPS/1zOjAKAFeOkdtd0UBz4R+ewryv7IucyAJHyhhDN/cS8xfu9DtG644EuIuCb8iYKlGxNZwgGJ3WxK03FoA6OHDoBjIRNo4WlFU+B8iT7NmDDTAdusfWMEhVUxKII8S7WMKWlG+D5Mm4ogEbQEVBp+H8Tw0yCbAtEM3vV7ZHrH26nS1KogICVYPUvbs9YmtNsQBmhs4P3vPZHVvcTSgYJAKY1oSS11E2dUItF0ClDJJoRAlYum6WGGC2obrskGTDDxIFoAwnFM0wzYfTghcGmB2i3k5CQlEAqeF7s3/teGTC/a3MCABuJGBHChguS55ZGoDfWxx1muPhqDVrAJ2HUh+BqNAv6/eVpdCyDIzaJ/UAfwET8SxPH07bpwAAAABJRU5ErkJggg==';


class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'Loading Map',
            loading: true,
            popupPlace: null
        };
    }

    componentDidMount() {
        this.map = createMap(this.refs.map, defaultLoc);
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.loadLocation();
        

        
    }

    loadLocation() {
        var infowindow = new google.maps.InfoWindow({
            content: locMarkerInfo
        });

        this.currentMarker = addMarker(this.map, defaultLoc, true, '');
        markers.pop(this.currentMarker);
        this.currentMarker.addListener('click', () => {
            infowindow.open(this.map, this.currentMarker);
        });
        infowindow.open(this.map, this.currentMarker);

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

        //remove popup if still visible
        this.state.popupPlace = null;
        this.forceUpdate();

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
                this.loadPopup(randomPlace, searchButton);
            } else {
                this.updateStatus('Unable to find place that matches criteria.', false)
                //resets searchButton
                searchButton.className = "";
            }
        });
    }

    loadPopup(place, searchButton) {
        this.placesService.getDetails({placeId: place.place_id}, (placeDetails, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                this.updateStatus('Place found!', false)
                console.log(placeDetails);
                this.state.popupPlace = placeDetails;
                this.forceUpdate();
            } else {
                this.updateStatus('Unable to lookup place details. :(', false)
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
            <div>
                <div id="map-wrapper">
                    <div id="map" ref="map" />
                    <StatusBar status={this.state.status} loading={this.state.loading}/>
                </div>
                <PlacePopup place={this.state.popupPlace}/>
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

const locMarkerInfo = '' +
    '<div id ="location-marker">' +
        '<h4>Current Location</h4>' +
        '<p>Drag me, or change in the widget.</p>' +
    '</div>'


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
