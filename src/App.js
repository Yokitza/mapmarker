import React from "react";
import Map from "./Map";
const App = () => {
  const appStyles = {
    height: "100vh",
    width: "100%",
  };
  const LOCAL_STORAGE_KEY = "markers";
  let defaultMarkersState =
    JSON.parse(window.localStorage?.getItem(LOCAL_STORAGE_KEY)) || [];
  const [markers, _setMarkers] = React.useState(defaultMarkersState);
  const setMarkers = (values) => {
    _setMarkers(values);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
  };
  const [batchValue, setBatchValue] = React.useState(null);
  const addMarker = (lat, lng) => {
    const newMarker = {
      id: Math.random() * 1000,
      lat: lat,
      lng: lng,
      color: "red",
    };
    let newMarkersArray = [...markers, newMarker];
    setMarkers([...newMarkersArray]);
  };
  const addMarkers = (valueString) => {
    if (!valueString) {
      return;
    }
    let markerStrings = valueString.split("\n");
    let newMarkersArray = [];
    markerStrings.forEach((markerString) => {
      let markerValues = markerString.split(",");
      newMarkersArray.push({
        id: Math.random() * 1000,
        lat: parseFloat(markerValues[0]),
        lng: parseFloat(markerValues[1]),
        color: markerValues[2] ? markerValues[2] : "red",
      });
    });
    setMarkers([...markers, ...newMarkersArray]);
  };
  return (
    <div style={appStyles}>
      <Map
        addMarker={addMarker}
        markers={markers}
        setMarkers={setMarkers}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUjTS_5RvEUsxU3Pq6lya1WHJngcFnieY&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={appStyles} />}
        containerElement={<div style={appStyles} />}
        mapElement={<div style={appStyles} />}
      />
      <div
        style={{
          backgroundColor: "white",
          width: "10vw",
          minWidth: "15rem",
          position: "absolute",
          bottom: "0",
          margin: "10px",
          left: "0",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "1rem",
          borderRadius: "3px",
          boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px;",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Batch box</h2>
        <textarea
          rows="4"
          style={{ height: "10rem", resize: "none", marginBottom: "1rem" }}
          value={batchValue}
          onChange={(e) => {
            setBatchValue(e.target.value);
          }}
        />
        <button className="google" onClick={() => addMarkers(batchValue)}>
          Add
        </button>
      </div>
    </div>
  );
};
 
export default App;
 
 