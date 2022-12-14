import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./Header.style";
import Icon from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

// Header is used to Messages and Chat Screen
const Header = ({ currentUser, type }) => {
  const { navigate } = useNavigation();
  const theme = useSelector((state) => state.theme.activeTheme);
  return (
    <View>
      {!currentUser ? (
        type ? (
          <View style={styles.defaultHeader}>
            <View style={styles.topHeader}>
              <Text style={styles.editText}>Edit</Text>
              <Icon
                onPress={() => navigate("NewMessage")}
                name="edit"
                size={20}
                color="#2385E1"
              />
            </View>
            <Text style={[styles.title, { color: theme?.color }]}>Chats</Text>
          </View>
        ) : (
          <View style={styles.defaultHeader}>
            <View style={styles.topHeader}>
              <Text style={styles.editText}>Privacy</Text>
              <Icon name="" size={20} color="#2385E1" />
            </View>
            <Text style={[styles.title, { color: theme?.color }]}>Story</Text>
          </View>
        )
      ) : (
        <View style={styles.chatHeader}>
          <View style={styles.leftHeader}>
            <Image
              style={styles.userImage}
              source={{
                uri: currentUser.photoURL,
              }}
            />
            <Text style={[styles.chatTitle, { color: theme?.color }]}>
              {currentUser.firstName + " " + currentUser.lastName}
            </Text>
          </View>
          <View style={styles.rightHeader}>
            <Icon style={styles.icon} name="video" size={20} color="#2385E1" />
            <Icon name="phone" size={20} color="#2385E1" />
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
