import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const apiKeyParts = ['mGHO2', 'SyCvjOv1', '66GTO2D2Y', 'Ae3pJTjyr3pkm', 'AIza'];

type MapContainerProps = {
  google: Object,
  initialLocation: {
    lat: number,
    lng: number,
  },
  language?: string,
};

export class MapContainer extends Component<MapContainerProps> {
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          initialCenter={this.props.initialLocation}
        />
      </div>
    );
  };
};

export default GoogleApiWrapper({
  apiKey: `${apiKeyParts[4]}${apiKeyParts[1]}${apiKeyParts[0]}${apiKeyParts[3]}${apiKeyParts[2]}`,
  language: 'en',
})(MapContainer);