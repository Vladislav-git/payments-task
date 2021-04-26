import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../components/SignIn'
import Main from '../components/Main'
import Purchases from '../components/Purchases'

const Stack = createStackNavigator();

const MainNavigation = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn}/>
            <Stack.Screen name='Main' component={Main}/>
            <Stack.Screen name='Purchases' component={Purchases}/>
        </Stack.Navigator>
    )
}

export default MainNavigation