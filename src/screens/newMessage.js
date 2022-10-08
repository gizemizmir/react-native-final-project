import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { setContacts } from "../store/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import ContactItem from "../components/ContactItem";

const NewMessage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contactItems);
  const theme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.auth.user);
  const renderContacts = ({ item }) => <ContactItem contact={item} />;
  const keyExtractorContacts = (item) => item.id.toString();

  const getContacts = async () => {
    const q = query(collection(db, "user"), where("id", "!=", user.id));
    await getDocs(q).then((res) => {
      const _contacts = res.docs.map((item) => item.data());
      dispatch(setContacts({ contacts: _contacts }));
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <View style={[ styles.newMessageContainer,
      { backgroundColor: theme?.backgroundColor },
    ]}>
      {contacts.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractorContacts}
          data={contacts}
          renderItem={renderContacts}
        />
      ) : (
        <Text style={[styles.contactPageText, { color: theme.color }]}>
          Couldn't Find Any Contacts
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  newMessageContainer: {
    height: '100%',
    paddingTop:20,
  },
  contactPageText: {
    display: "flex",
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: "50%",
  },
});

export default NewMessage;
