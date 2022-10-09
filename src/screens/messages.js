import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../store/contactSlice";
import ChatItem from "../components/ChatItem";

const Messages = () => {
  const dispatch = useDispatch();
  const [messageData, setMessageData] = useState([]);
  const theme = useSelector((state) => state.theme.activeTheme);
  const contacts = useSelector((state) => state.contacts.contactItems);
  const meData = useSelector((state) => state.auth.user); // Sender
  const renderChat = ({ item }) => <ChatItem chat={item} />;
  const keyExtractorChat = (item) => item.id.toString();

  const getContacts = async () => {
    const q = query(collection(db, "user"), where("id", "!=", meData.id));
    await getDocs(q).then((res) => {
      const _contacts = res.docs.map((item) => item.data());
      dispatch(setContacts({ contacts: _contacts }));
    });
  };

  const getTextMessage = async () => {
    onSnapshot(
      query(
        collection(db, "messages"),
        where("users", "array-contains", meData.id)
      ),
      (snapshot) => {
        const _message = snapshot.docs.map((doc) => ({
          id: doc.id,
          user: contacts?.find(
            (item) =>
              item.id === doc.data().users.find((user) => user !== meData.id)
          ),
          ...doc.data(),
        }));
        setMessageData(_message);
      }
    );
  };

  const loadData = async () => {
    await getContacts();
    await getTextMessage();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View
      style={[
        styles.messageContainer,
        { backgroundColor: theme.backgroundColor },
      ]}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractorChat}
        data={messageData}
        renderItem={renderChat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingBottom: 45,
    paddingTop: 20,
  },
  chatContainer: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 18,
  },
});

export default Messages;
