import React from 'react';
import {Provider} from './src/context/Context'
import MainNavigation from './src/navigation/MainNavigation'
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <MainNavigation/>
      </NavigationContainer>
    </Provider>
  );
}


