import React from "react";

const defaultLoc = {lat: -33.8688, lng: 151.209};
var markers = [];

class Map extends React.Component {
    componentDidMount() {
        this.map = createMap(this.refs.map, defaultLoc);
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.currentMarker= addMarker(this.map, defaultLoc, true, '')
    }

    // force component not to re-render, so map is loaded only once
    shouldComponentUpdate() {return false;}

    // fired when parent is updated
    componentWillReceiveProps(nextProps) {
        var event = nextProps.mapEvent;

        if (event) {
            switch(event.title) {
                case 'find':
                    this.nearbySearch();
                    removeMarkers()
                    console.log(markers)
                    break;
                case 'bootstrapAC' :
                    this.bootstrapAC(event.data);
                    break;
                case 'categoryUpdate':
                    this.categories = event.data;
                    break;
            }
        }
    }

    // bind input from component-Bar to map
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

    nearbySearch() {
        var searchOptions = {
            location: this.currentMarker.position,
            radius: 500,
            keyword: 'food'
        }
        
        this.placesService.nearbySearch(searchOptions, (results, status) => {
            for (var i = 0; i < results.length; i++) {            
                addMarker(this.map, results[i].geometry.location, false, results[i].name)
               
                
               
                
            }
         
            
            
          
        });
    }

    performSearch(input) {

        var request = {
        
          keyword: 'park',
          types: ['park']
        };
        var select = new google.maps.places.PlacesService(this.map);;
        select.radarSearch(request, this.callback.bind(this));

      }

    callback(results, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          return;
        }

        console.log(this.map);
 

        for (var i = 0, result; result = results[i]; i++) {
             var location = result.geometry.location;
            this.currentMarker = addMarker(this.map, location, true, '');
            this.map.panTo(location);
        }
      }


    render() {
        return (
            <div id="map" ref="map" />
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
    return (new google.maps.Map(element, {
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
    }));
}


function addMarker(map, position, draggable, title) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: draggable,
        title: title
    })
    markers.push(marker);
    return(marker);
    
  
}

function removeMarker (marker) {
    marker.setMap(null);
    
}
function clearMarkers() {
    if(markers.length > 1){
        for (var i = 0; i < markers.length; i++) {       
          markers[i].setMap(null);
        }
      }
}
function removeMarkers(){
  clearMarkers();
    markers = [];
        
    
    
}




  /** 

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(this.map);

        service.getDetails({
          placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
        }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
         
            var marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + vplace.place_id + '<br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);   
            });
          }
          console.log(place.formatted_address)
        });*/