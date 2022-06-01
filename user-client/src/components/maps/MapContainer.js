import { Component } from "react";
import {Map, GoogleApiWrapper} from "google-maps-react";
import MapPicker from 'react-google-map-picker';

class MapContainer extends Component {
    constructor(props){
    
        super(props);

        this.state = {
            lat: this.props.lat,
            lng: this.props.lng
       }
    }

    render(){
        return(
            <div>
                <MapPicker
                    google= {this.props.google}
                    defaultLocation={{ lat: this.state.lat, lng: this.state.lng}}
                    zoom={15}
                    style={{height: "300px", width: "90%", marginTop: "5%"}}
                    apiKey='AIzaSyAGcSN4JMNPgb4rQZ5QpoHoCZHj2h3b_eM'></MapPicker>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAGcSN4JMNPgb4rQZ5QpoHoCZHj2h3b_eM"
})(MapContainer);