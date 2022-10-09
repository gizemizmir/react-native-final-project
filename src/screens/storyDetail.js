import { View, StyleSheet, Image } from "react-native";
import React from "react";

const StoryDetail = ({ route }) => {
  const { image } = route.params;
  console.log("image", image);
  return (
    <View style={styles.storyContainer}>
      <Image
        style={styles.storyImage}
        source={{
          uri: image,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  storyContainer: {
    backgroundColor: "#000",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  storyImage: {
    width: "100%",
    height: 400,
  },
});
export default StoryDetail;
