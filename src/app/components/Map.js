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
       
        var props = {event: nextProps.mapEvent,
                    location: this.currentMarker};
        
        if (props.event.title) {
            switch(props.event.title) {
                case 'find':
                    this.performSearch(props);
                    break;
                case 'bootstrapAC' :
                    this.bootstrapAC(props.event.data);
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
    performSearch(input) {
        console.log(input.location.getPosition().lat(),input.location.getPosition().lng())
        var request = {
         bounds: new google.maps.LatLngBounds(
       new google.maps.LatLng(-33.8688, 151.209), //random numbers --> cant figure out how to do bounds in a radius
       new google.maps.LatLng(-31.8688, 152.209)),
          keyword: 'park',
          types: ['park']
        };
        var select = new google.maps.places.PlacesService(this.map)
        select.radarSearch(request, this.callback);
        ;
      }
    callback(results, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          return;
        }
        for (var i = 0, result; result = results[i]; i++) {
          addMarker(result);
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