import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const EmptyScreen = () => {
    return (
        <View>
            <Text>
                Auth Empty Screen
            </Text>
        </View>
    )
}

const AuthStackNav = createStackNavigator();
const AuthStackNavigation = () => {
  return (
    <AuthStackNav.Navigator>
        <AuthStackNav.Screen
            name='SignIn'
            component={EmptyScreen}
        />
        <AuthStackNav.Screen
            name='SignUp'
            component={EmptyScreen}
        />
    </AuthStackNav.Navigator>
  )
}

export default AuthStackNavigation