import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Register';
import Profile from './src/Profile';
import Chamar from './src/Chamar';
import Teste from './src/Teste';
import ChatScreen from './src/ChatScreen';
import Curriculo from './src/Curriculo';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Register" component={Register} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Profile" component={Profile} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name='Chamar' component={Chamar} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name='Teste' component={Teste} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="ChatScreen" component={ChatScreen} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Curriculo" component={Curriculo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;