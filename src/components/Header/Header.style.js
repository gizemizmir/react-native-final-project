import { StyleSheet } from "react-native";

export default StyleSheet.create({
  defaultHeader: {
    width: "100%",
  },
  topHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  editText: {
    fontSize: 14,
    color: "#2385E1",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  chatHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rightHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 10,
    borderColor: "#bcbcbc",
    borderWidth: 1,
  },
});
