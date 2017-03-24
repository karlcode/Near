import React from "react";


class Map extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mapEvent) {
            switch(nextProps.mapEvent) {
                case 'find':
                    alert('Put the find code here');
                    break;
            }
        }
    }

    componentDidMount() {
        this.map = new google.maps.Map(this.refs.map, {
            center: {lat: -33.8688, lng: 151.209},
            zoom: 13,
            streetViewControl: false,
            mapTypeControl: false,
            styles: [
            {   featureType: "road",
                elementType: "labels",
                stylers: [{visibility: "off"}] 
            },   
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'poi.business',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}]
            }
            ]
        });
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
        });

    }


    render() {
        return (
            <div id="map" ref="map" />
        );
    }
}



export default  Map;