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
          this.loadData();
        
    }

    loadData(){
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDo21X19_S1Py03fPlRKOHoiCPpbiOBkB8')  
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

            <div id="wrapper">
                
                <div id="map" ref="map">
                   

                </div>
            
            </div>



        );
    }
}

export default  Map;