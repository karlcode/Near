import React from "react";

const defaultLoc = {lat: -33.8688, lng: 151.209};

class Map extends React.Component {
    componentDidMount() {
        this.map = createMap(this.refs.map, defaultLoc);
        this.currentMarker= addMarker(this.map, defaultLoc, true, '')
    }

    // force component not to re-render, so map is loaded only once
    shouldComponentUpdate() {return false;}

    // fired when parent is updated
    componentWillReceiveProps(nextProps) {
        var event = nextProps.mapEvent;

        if (event.title) {
            switch(event.title) {
                case 'find':
                    alert('Put the find code here');
                    break;
                case 'bootstrapAC' :
                    this.bootstrapAC(event.data);
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


    render() {
        return (
            <div id="map" ref="map" />
        );
    }
}

export default  Map;


/* MAP UTILS */
function createMap(element, location) {
    return (new google.maps.Map(element, {
        center: location,
        zoom: 13,
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
    return(new google.maps.Marker({
        position: position,
        map: map,
        draggable: draggable,
        title: title
    }));
}

function removeMarker (marker) {
    marker.setMap(null);
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