import React, { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./MessageItem.style";
import Icon from "@expo/vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

// MessageItem is used to list the message on the Chat Screen
const MessageItem = ({ message, status, type }) => {
  const mapRef = useRef();
  const {navigate} = useNavigation();

  useEffect(() => {
    mapRef?.current?.fitToSuppliedMarkers({
      markerIDs: "location",
    });
  });

  return type === "text" ? (
    status === "sender" ? (
      <View style={styles.sendMessage}>
        <View style={styles.messageTextContainer}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.receiveMessage}>
        <View style={styles.messageTextContainer}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      </View>
    )
  ) : status === "sender" ? (
    <MapView
      ref={mapRef}
      style={styles.senderMap}
      showsScale
      minZoomLevel={5}
      getMarkersFrames={true}
      onPress={() => navigate("Location", { latitude: message.lat, longitude: message.long})}
    >
      <Marker
        identifier="location"
        coordinate={{ latitude: message.lat, longitude: message.long }}
      />
    </MapView>
  ) : (
    <MapView
      ref={mapRef}
      style={styles.receiverMap}
      showsScale
      minZoomLevel={5}
      getMarkersFrames={true}
      onPress={() => navigate("Location", { latitude: message.lat, longitude: message.long})}
    >
      <Marker
        identifier="location"
        coordinate={{ latitude: message.lat, longitude: message.long }}
      />
    </MapView>
  );
};

export default MessageItem;
