import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const EmptyScreen = () => {
    return (
        <View>
            <Text>
                Bottom Empty Screen
            </Text>
        </View>
    )
}

const SettingNav = createStackNavigator();
const SettingStackNavigation = () => {
  return (
    <SettingNav.Navigator>
        <SettingNav.Screen 
            name='Setting'
            component={EmptyScreen}
        />
        <SettingNav.Screen 
            name='ThemeSetting'
            component={EmptyScreen}
        />
        <SettingNav.Screen 
            name='ProfileSetting'
            component={EmptyScreen}
        />
    </SettingNav.Navigator>
  )
}

export default SettingStackNavigation