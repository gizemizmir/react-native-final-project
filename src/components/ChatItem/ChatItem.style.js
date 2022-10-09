import { StyleSheet } from "react-native";

export default StyleSheet.create({
  chatContainer: {
    height: 65,
    paddingHorizontal: 18,
  },
  chatItem: {
    display: "flex",
    flexDirection: "row",
    marginTop: 3,
  },
  chatContent: {
    width: "83%",
    borderBottomWidth: 1,
    borderBottomColor: "#c4c4c4",
  },
  chatInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImageContainer: {
    width: "17%",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  text: {
    color: "#333",
  },
});
