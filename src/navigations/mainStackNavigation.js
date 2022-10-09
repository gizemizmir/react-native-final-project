import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigation from "./authStackNavigation";
import BottomTabNavigation from "./bottomTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../store/authSlice";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewMessageScreen from "../screens/newMessage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ChatScreen from "../screens/chat";
import LocationScreen from "../screens/location";
import StoryDetail from "../screens/storyDetail";

const MainStackNav = createStackNavigator();
const MainStackNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue != null) {
      // Incoming data is saved to Global State
      dispatch(logIn(JSON.parse(jsonValue)));
    }
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, user?.email, user?.password).then(
      (response) => {
        // Sign in
      }
    );
  };

  useEffect(() => {
    getData();
    if (user && user.email) {
      handleSignIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainStackNav.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: theme.activeTintColor,
      }}
    >
      {user ? (
        <>
          <MainStackNav.Screen
            name="BottomNav"
            component={BottomTabNavigation}
          />
          <MainStackNav.Screen
            name="NewMessage"
            component={NewMessageScreen}
            options={{
              presentation: "modal",
              headerShown: true,
              headerLeft: () => (
                <Ionicons
                  onPress={() => {
                    navigation.goBack();
                  }}
                  name="ios-close-outline"
                  size={35}
                  color="#2385E1"
                />
              ),
              title: "New Message",
              headerTitleStyle: {
                color: theme.color,
              },
              headerStyle: {
                backgroundColor: theme.backgroundColor,
              },
            }}
          />
          <MainStackNav.Screen
            name="Location"
            component={LocationScreen}
            options={{
              presentation: "modal",
              headerShown: true,
              headerLeft: () => (
                <Ionicons
                  onPress={() => {
                    navigation.goBack();
                  }}
                  name="ios-close-outline"
                  size={35}
                  color="#2385E1"
                />
              ),
              title: "Location Detail",
              headerTitleStyle: {
                color: theme.color,
              },
              headerStyle: {
                backgroundColor: theme.backgroundColor,
              },
            }}
          />
          <MainStackNav.Screen
            name="StoryDetail"
            component={StoryDetail}
            options={{
              presentation: "modal",
              headerShown: true,
              headerLeft: () => (
                <Ionicons
                  onPress={() => {
                    navigation.goBack();
                  }}
                  name="ios-close-outline"
                  size={35}
                  color="#2385E1"
                />
              ),
              title: "Story Detail",
              headerTitleStyle: {
                color: theme.color,
              },
              headerStyle: {
                backgroundColor: theme.backgroundColor,
              },
            }}
          />
          <MainStackNav.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerShown: true,
              headerBackTitleVisible: false,
              headerTitleStyle: {
                color: theme.color,
              },
              headerStyle: {
                backgroundColor: theme.backgroundColor,
              },
            }}
          />
        </>
      ) : (
        <MainStackNav.Screen name="AuthNav" component={AuthStackNavigation} />
      )}
    </MainStackNav.Navigator>
  );
};

export default MainStackNavigation;
