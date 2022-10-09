import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import { db, storage } from "../utils/firebase";

const Stories = () => {
  const navigation = useNavigation();
  const { navigate } = useNavigation();
  const theme = useSelector((state) => state.theme.activeTheme);
  const meData = useSelector((state) => state.auth.user);
  const [uploading, setUploading] = useState(false);
  const [stories, setStories] = useState([]);
  const [myStories, setMyStories] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header />,
    });
  });

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        addImageToStorage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      Alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

  const addImageToStorage = async (uploadUrl) => {
    await addDoc(collection(db, `stories`), {
      user: meData,
      photoURL: uploadUrl,
      timestamp: new Date().toLocaleDateString(),
    });
    getStories();
    getMyStory();
  };

  const maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  const getStories = async () => {
    onSnapshot(
      query(collection(db, "stories"), where("user.id", "!=", meData.id)),
      (snapshot) => {
        const _stories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(_stories);
      }
    );
  };

  const getMyStory = async () => {
    onSnapshot(
      query(collection(db, "stories"), where("user.id", "==", meData.id)),
      (snapshot) => {
        const _myStories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyStories(_myStories);
      }
    );
  };

  useEffect(() => {
    getStories();
    getMyStory();
  }, []);

  return (
    <View
      style={[
        styles.storiesContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <View style={[styles.myStory]}>
        <View
          style={[
            styles.storyContainer,
            { backgroundColor: theme.backgroundSecondColor },
          ]}
        >
          <Pressable
            onPress={() => {
              myStories?.[0]?.photoURL
                ? navigate("StoryDetail", { image: myStories?.[0]?.photoURL })
                : {};
            }}
          >
            <Image
              style={styles.userAvatar}
              source={{
                uri: myStories?.[0]?.photoURL || meData.photoURL,
              }}
            />
          </Pressable>
          <View style={styles.plusContainer}>
            <Text style={styles.plusText}>+</Text>
          </View>
          <Text style={[styles.userName, { color: theme.color }]}>
            My Story
          </Text>
          <View style={styles.iconContainer}>
            <Ionicons
              style={styles.icon}
              name="camera-sharp"
              size={25}
              color="#2385E1"
              onPress={() => pickImage()}
            />
          </View>
        </View>
      </View>
      <Text style={[styles.title, { color: theme.color }]}>Last Stories</Text>
      {stories?.map((story, index) => {
        return (
          <View key={index} style={styles.usersStory}>
            <View
              style={[
                styles.storyContainer,
                { backgroundColor: theme.backgroundSecondColor },
              ]}
            >
              <Pressable
                onPress={() => {
                  navigate("StoryDetail", { image: story.photoURL });
                }}
              >
                <Image
                  style={styles.userAvatar}
                  source={{
                    uri: story.photoURL,
                  }}
                />
              </Pressable>
              <Text style={[styles.userName, { color: theme.color }]}>
                {story.user?.firstName + " " + story.user?.lastName}
              </Text>
            </View>
          </View>
        );
      })}
      {maybeRenderUploadingOverlay()}
    </View>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    backgroundColor: "#EFEFF4",
    height: "100%",
  },
  myStory: {
    marginVertical: 40,
  },
  storyContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#ccc",
    position: "relative",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 20,
    marginLeft: 5,
    borderWidth: 2,
    padding: 10,
    borderColor: "#2385E1",
  },
  title: {
    textTransform: "uppercase",
    marginLeft: 30,
    marginBottom: 20,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: "#EFEFF4",
    borderRadius: 50,
  },
  userName: {
    width: "65%",
    fontWeight: "bold",
  },
  plusContainer: {
    position: "absolute",
    bottom: 15,
    left: 55,
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#2385E1",
    borderColor: "white",
    borderWidth: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    color: "white",
  },
});

export default Stories;
