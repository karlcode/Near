import React from "react";


class Map extends React.Component {
    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        //update map here
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
       // this.map.panTo(new google.maps.LatLng(51.433373, -0.712251));
        //this.loadData();
        var request = {
    location: {lat: -33.8688, lng: 151.209},
    radius: '500',
    types: ['store']


  };
        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, function(results){console.log(results)});

          var marker = new google.maps.Marker({
          position: {lat: -33.8688, lng: 151.209},
          map: this.map
        });
        
    }

    loadData(){
        fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyDo21X19_S1Py03fPlRKOHoiCPpbiOBkB8')  
            .then(  
                function(response) {  
                if (response.status !== 200) {  
                    console.log('Looks like there was a problem. Status Code: ' +  
                    response.status);  
                    return;  
                }

                // Examine the text in the response  
                response.json().then(function(data) {  
                    console.log(data);  
                });  
                }  
            )  
            .catch(function(err) {  
                console.log('Fetch Error :-S', err);  
     });
    }

    render() {
        return (
            <div id="map" ref="map" />
        );
    }
}



export default  Map;