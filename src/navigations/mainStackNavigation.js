import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigation from "./authStackNavigation";
import BottomTabNavigation from "./bottomTabNavigation";
import { useSelector } from "react-redux";

const MainStackNav = createStackNavigator();
const MainStackNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);

  const user = {};
  return (
    <MainStackNav.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: theme.activeTintColor,
      }}
    >
      {user ? (
        <MainStackNav.Screen name="BottomNav" component={BottomTabNavigation} />
      ) : (
        <MainStackNav.Screen name="AuthNav" component={AuthStackNavigation} />
      )}
    </MainStackNav.Navigator>
  );
};

export default MainStackNavigation;
