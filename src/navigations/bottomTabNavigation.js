import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingStackNavigation from "./settingStackNavigation";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import MessagesScreen from "../screens/messages";
import Header from "../components/Header";
import NewMessage from "../screens/newMessage";
import StoriesScreen from "../screens/stories";

const BottomNav = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  return (
    <BottomNav.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.backgroundColor },
        tabBarInactiveTintColor: theme.color,
        tabBarActiveTintColor: theme.activeTintColor,
      }}
    >
      <BottomNav.Screen
        name="Contacts"
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="people-circle-sharp"
              size={25}
              color={focused ? theme.activeTintColor : theme.color}
            />
          ),
        }}
        component={NewMessage}
      />
      <BottomNav.Screen
        name="Stories"
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            height: 130,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="radio-button-on-sharp"
              size={25}
              color={focused ? theme.activeTintColor : theme.color}
            />
          ),
        }}
        component={StoriesScreen}
      />
      <BottomNav.Screen
        name="Messages"
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            height: 130,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          headerTitle: () => <Header type="chats" />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubbles-sharp"
              size={25}
              color={focused ? theme.activeTintColor : theme.color}
            />
          ),
        }}
        component={MessagesScreen}
      />
      <BottomNav.Screen
        name="Settings"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-sharp"
              size={25}
              color={focused ? theme.activeTintColor : theme.color}
            />
          ),
        }}
        component={SettingStackNavigation}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabNavigation;
