
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
 
const Map = withScriptjs(
  withGoogleMap(({ markers, setMarkers, addMarker }) => {
    const colorsArray = ["red", "green", "blue", "yellow"];
    const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "transparent",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
    };
 
    const changeMarkerColor = (marker) => {
      const newColorIndex =
        (colorsArray.indexOf(marker.color) + 1) % colorsArray.length;
      let newMarkersArray = markers.map((currMarker) => {
        if (currMarker.id === marker.id) {
          return { ...currMarker, color: colorsArray[newColorIndex] };
        } else {
          return currMarker;
        }  
      });
      setMarkers(newMarkersArray);
    };
 
    const removeMarker = (id) => {
      let newMarkersArray = markers.filter((marker) => {
        return marker.id !== id;
      });
      setMarkers(newMarkersArray);
    };
 
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 40.5, lng: -74 }}
        onClick={(e) => {
          addMarker(e.latLng.lat(), e.latLng.lng());
        }}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{ ...svgMarker, fillColor: marker.color }}
              clickable
              onClick={(e) => {
                changeMarkerColor(marker);
              }}
              onRightClick={() => {
                removeMarker(marker.id);
              }}
            />
          );
        })}
      </GoogleMap>
    );
  })
);
 
export default Map;