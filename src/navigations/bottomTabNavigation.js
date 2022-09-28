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
      <BottomNav.Screen name="Contacts" component={EmptyScreen} />
      <BottomNav.Screen name="Story" component={EmptyScreen} />
      <BottomNav.Screen name="Messages" component={EmptyScreen} />
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
          tabBarIcon: () => (
            <Ionicons name="settings-sharp" size={25} color={theme.color} />
          ),
        }}
        component={SettingStackNavigation}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabNavigation;
