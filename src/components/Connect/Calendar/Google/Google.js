import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Google.css'

export class Google extends Component {
  state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: !this.state.showingInfoWindow
      });

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };


  render() {
    const style = {
      width: '95%',
      height: '100%',
    }

    return (
      <div id="directions">
      <Map
        google={this.props.google}
        zoom={14}
        style={style}
        initialCenter={{
            lat: 38.043537,
            lng: -84.515010
          }}
          onClick={this.onMapClicked}
        >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          >
            <div>
              <h3><center><b>The Project 480</b></center></h3><br/>
              <h4>480 Curry Avenue, Lexington, KY, 40508</h4>
            </div>
        </InfoWindow>
      </Map>
      </div> 
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCwTODCcZQIEw-HHdo3TCVpWWZX6mqKEKc')
})(Google)
