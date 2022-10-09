import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./ChatItem.style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

// ChatItem is used to list the chats on the Messages Screen
const Chat = ({ chat }) => {
  const { navigate } = useNavigation();
  const name = chat.user?.firstName + " " + chat.user?.lastName;
  const theme = useSelector((state) => state.theme.activeTheme);

  return (
    <View style={styles.chatContainer}>
      <Pressable
        style={styles.chatItem}
        onPress={() => {
          navigate("Chat", { userID: chat.user?.id });
        }}
      >
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: chat.user?.photoURL }}
          />
        </View>
        <View style={styles.chatContent}>
          <View style={styles.chatInfo}>
            <Text style={[styles.name, { color: theme?.color }]}>{name}</Text>
            <Text style={[styles.text, { color: theme?.color }]}>
              {chat.lastMessageTimestamp}
            </Text>
          </View>
          <Text
            style={[styles.text, { color: theme?.color }]}
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {chat.lastMessage === "send" ? (
              <Ionicons name="checkmark-done" size={15} color="#2385E1" />
            ) : (
              ""
            )}
            {" " + chat.lastMessage}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Chat;
