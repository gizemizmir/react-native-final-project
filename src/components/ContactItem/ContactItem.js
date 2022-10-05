import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import styles from "./ContactItem.style";
import { useNavigation } from "@react-navigation/native";

const ContactItem = ({ contact }) => {
  const { navigate } = useNavigation();
  const navigation = useNavigation();
  return (
    <View style={styles.contactContainer}>
      <Pressable
        style={styles.contactItem}
        onPress={() => {
          navigation.canGoBack() && navigation.goBack();
          navigate("Chat", { userID: contact.id });
        }}
      >
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri:
                contact.photoURL ||
                "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png",
            }}
          />
        </View>
        <View style={styles.contactContent}>
          <View style={styles.contactInfo}>
            <Text style={styles.name}>
              {contact.firstName + " " + contact.lastName}
            </Text>
          </View>
          <Text style={styles.text} numberOfLines={1} lineBreakMode="tail">
            {contact.about}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ContactItem;
