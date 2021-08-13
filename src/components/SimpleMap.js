
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { useLocation } from 'react-router';

const GOOGLE_MAP_API_KEY = 'AIzaSyCzeqra04D0wYBWiutQu3_XIwdCWWDwS8Q';


const SimpleMap = (props) => {

    const location = useLocation();

    const [center, setCenter] = useState(location?.state?.centerMap ?? {lat: 47.3073, lng: -122.2285 });//{lat: 47.606209, lng: -122.332069 });
    const [zoom, setZoom] = useState(location?.state?.zoomLevel ?? 10);

    const getMapOptions = () => {
      return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
      };

      // const showMarkers = props.locations.map((location) => {
      //   //console.log('sq-value:', sq.value);
      //   //console.log('sq-id:', sq.id);
      //     return (
      //       <Marker
      //         lat={location["lat"]}
      //         lng={location["lng"]}
      //         name="My Marker"
      //         color="blue"
      //       />
      //     );
      //   });

    // const showMarkers = () => {
    //   console.log("locations: " + props.locations); 

    //   return (
    //     props.locations.map((location) => 
    //       <Marker
    //         lat={location["lat"]}
    //         lng={location["lng"]}
    //         name="My Marker"
    //         color="blue"
    //       />
    //     )
    //   )
    // }
    

    return (

        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions} // shows Satellite view options
        >
          {location?.state?.mapPoints?.map((location, i) => (
            //if this is contained with {}, markers won't show up
            <Marker
            lat={location["lat"]}
            lng={location["lng"]}
            name="My Marker"
            color="blue"
            />
          ))}
        </GoogleMapReact>

                {/* <Marker
            lat={47.530102}
            lng={-122.032616}
            name="My Marker"
            color="blue"
          />
          <Marker
            lat={47.606209}
            lng={-122.332069}
            name="My Marker 2"
            color="blue"
          /> */}
      </div>
      
    );
}

export default SimpleMap;