import {
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";

const LocationScreen = ({route}) => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const mapRef = useRef();
  const { latitude, longitude } = route.params;
  
  useEffect(() => {
    mapRef?.current?.fitToSuppliedMarkers({
      markerIDs: "location",
    });
  });

  return (
    <View>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsMyLocationButton
        showsScale
        minZoomLevel={5}
        getMarkersFrames={true}
        userInterfaceStyle={theme.type}
      >
        <Marker
            identifier="location"
            coordinate={{ latitude: latitude, longitude: longitude}}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    zIndex: 3,
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    zIndex: 5,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default LocationScreen;
