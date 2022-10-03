import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingStackNavigation from "./settingStackNavigation";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

const EmptyScreen = () => {
  return (
    <View>
      <Text>Bottom Empty Screen</Text>
    </View>
  );
};

const BottomNav = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  return (
    <BottomNav.Navigator
      initialRouteName="Messages"
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
        component={EmptyScreen}
      />
      <BottomNav.Screen
        name="Story"
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
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
        component={EmptyScreen}
      />
      <BottomNav.Screen
        name="Messages"
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubbles-sharp"
              size={25}
              color={focused ? theme.activeTintColor : theme.color}
            />
          ),
        }}
        component={EmptyScreen}
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
