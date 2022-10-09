import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileSettingsScreen from "../screens/profileSetting";
import SettingsScreen from "../screens/setting";
import { useSelector } from "react-redux";
import ThemeSettings from "../screens/themeSetting";

const SettingNav = createStackNavigator();
const SettingStackNavigation = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  return (
    <SettingNav.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: theme.activeTintColor,
      }}
    >
      <SettingNav.Screen
        name="Setting"
        component={SettingsScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
        }}
      />
      <SettingNav.Screen
        name="ThemeSetting"
        options={{
          title: "Theme Settings",
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
        }}
        component={ThemeSettings}
      />
      <SettingNav.Screen
        name="ProfileSetting"
        options={{
          title: "Profile Settings",
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTitleStyle: {
            color: theme.color,
          },
        }}
        component={ProfileSettingsScreen}
      />
    </SettingNav.Navigator>
  );
};

export default SettingStackNavigation;
