import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/signIn";
import SignUp from "../screens/signUp";

const AuthStackNav = createStackNavigator();
const AuthStackNavigation = () => {
  return (
    <AuthStackNav.Navigator>
      <AuthStackNav.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignIn}
      />
      <AuthStackNav.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#FFF",
            shadowOpacity: 0,
          },
        }}
        name="SignUp"
        component={SignUp}
      />
    </AuthStackNav.Navigator>
  );
};

export default AuthStackNavigation;
