import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  addDoc,
  collection,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useForm, Controller } from "react-hook-form";
import MessageItem from "../components/MessageItem";
import * as Location from "expo-location";

const Chat = ({ route }) => {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.theme.activeTheme);
  const { userID } = route.params;
  const contacts = useSelector((state) => state.contacts.contactItems);
  const currentUser = contacts.find((item) => item.id === userID); // Receiver user
  const myData = useSelector((state) => state.auth.user); // Sender user
  const { control, handleSubmit, resetField } = useForm();
  const [messageData, setMessageData] = useState([]);
  const [chatID, setChatID] = useState(); // For updateDoc 
  const [uploading, setUploading] = useState(false);
  const receiverFullName = currentUser?.firstName + " " + currentUser?.lastName;
  const flatListRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header currentUser={currentUser} />,
    });
  });

  // For text message add
  const addTextMsg = async (data) => {
    if (!messageData) {
      await addDoc(collection(db, `messages`), {
        users: [myData?.id, currentUser?.id],
        messageItems: [
          {
            messageType: "text",
            text: data.messageInput,
            timestamp: new Date().toLocaleTimeString(),
            sender: myData?.id,
            receiverName: receiverFullName,
            receiverPhoto: currentUser?.photoURL,
          },
        ],
        lastMessage: data.messageInput,
        lastMessageTimestamp: new Date().toLocaleDateString(),
      });
      resetField("messageInput");
    } else {
      const docRef = doc(db, "messages", chatID);
      await updateDoc(docRef, {
        messageItems: arrayUnion({
          messageType: "text",
          text: data.messageInput,
          timestamp: new Date().toLocaleTimeString(),
          sender: myData?.id,
          receiverName: receiverFullName,
          receiverPhoto: currentUser?.photoURL,
        }),
        lastMessage: data.messageInput,
        lastMessageTimestamp: new Date().toLocaleDateString(),
      });
      resetField("messageInput");
    }
    getMessage();
  };

  const getMessage = async () => {
    onSnapshot(
      query(
        collection(db, "messages"),
        where("users", "array-contains", currentUser?.id)
      ),
      (snapshot) => {
        const _message = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const test = _message?.find((item) => item.users.includes(myData?.id));
        setChatID(test?.id);
        setMessageData(test?.messageItems);
      }
    );
  };

  useEffect(() => {
    getMessage();
  }, []);

  const getLocation = async () => {
    setUploading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    await addLocation(location.coords).finally(setUploading(false));
  };

  // For location message add
  const addLocation = async (userLocation) => {
    if (!messageData) {
      await addDoc(collection(db, `messages`), {
        users: [myData?.id, currentUser?.id],
        messageItems: [
          {
            messageType: "location",
            lat: userLocation?.latitude,
            long: userLocation?.longitude,
            timestamp: new Date().toLocaleString(),
            sender: myData?.id,
            receiverName: receiverFullName,
            receiverPhoto: currentUser?.photoURL,
          },
        ],
        lastMessage: "Location shared",
      });
    } else {
      const docRef = doc(db, "messages", chatID);
      await updateDoc(docRef, {
        messageItems: arrayUnion({
          messageType: "location",
          lat: userLocation?.latitude,
          long: userLocation?.longitude,
          timestamp: new Date().toLocaleString(),
          sender: myData?.id,
          receiverName: receiverFullName,
          receiverPhoto: currentUser?.photoURL,
        }),
        lastMessage: "Location shared",
      });
    }
    getMessage();
  };

  // Loading animation
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

  const renderMessageItem = ({ item }) => (
    <MessageItem
      message={item}
      status={item.sender === myData.id ? "sender" : "receiver"}
      type={item.messageType}
    />
  );

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/85/04/30/850430a750fb80c1ebaa5e740fc7cbd6.jpg",
      }}
      style={styles.chatContainer}
    >
      <View style={styles.chatView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.chatTextList}
          data={messageData}
          renderItem={renderMessageItem}
          keyExtractor={(item, index) => `Message-${index}`}
          ref={flatListRef}
          onContentSizeChange={() =>
            messageData && flatListRef.current.scrollToEnd()
          }
        />
      </View>
      <View
        style={[styles.bottomArea, { backgroundColor: theme.backgroundColor }]}
      >
        <Controller
          control={control}
          name="messageInput"
          render={({ field }) => {
            return (
              <>
                <TextInput
                  {...field}
                  style={[styles.input, { color: theme.color }]}
                  autoCapitalize={false}
                  onChangeText={field.onChange}
                />
              </>
            );
          }}
        />
        <Ionicons
          style={styles.bottomAreaIcon}
          name="send"
          size={30}
          color="#2385E1"
          onPress={handleSubmit(addTextMsg)}
        />
        <Ionicons
          style={styles.bottomAreaIcon}
          name="location"
          size={30}
          color="#2385E1"
          onPress={() => getLocation()}
        />
      </View>
      {maybeRenderUploadingOverlay()}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 8,
    paddingVertical: 5,
    height: "100%",
    position: "relative",
  },
  chatView: {
    paddingBottom: 75,
  },
  chatTextList: {
    height: "100%",
  },
  bottomArea: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 0,
    width: "105%",
    height: 80,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
  },
  input: {
    margin: 15,
    marginLeft: 20,
    height: 30,
    width: "70%",
    borderColor: "#c4c4c4",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  bottomAreaIcon: {
    marginTop: 15,
    marginLeft: 8,
  },
});

export default Chat;
