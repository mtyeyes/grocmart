import React from 'react';
import './map.styl';

import { useGoogleMaps } from 'react-hook-google-maps';
import HiddenText from '../hidden-text/hidden-text';

const Map = () => {
  const apiKeyParts = ['9Cy34_', 'Tqe-oq0', 'PWubln4g', 'mre2rlMQm', 'AIzaSyBkE'];
  const { ref } = useGoogleMaps(`${apiKeyParts[4]}${apiKeyParts[1]}${apiKeyParts[0]}${apiKeyParts[3]}${apiKeyParts[2]}`, {
    center: { lat: 37.38, lng: -122.06 },
    zoom: 16,
  });

  return (
    <section className="map">
      <h2 className="map__heading">
        <HiddenText>Map</HiddenText>
      </h2>
      <div className="map__container" ref={ref} />
    </section>
  );
};

export default Map;
