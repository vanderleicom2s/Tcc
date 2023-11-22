//Chamar ta dando erro na hr de chamar as informações das empresas no firebase
//Teste: msm erro do de cima
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Register';
import Profile from './src/Profile';
import Chamar from './src/Chamar';
import Teste from './src/Teste';
import ChatScreen from './src/ChatScreen';
import Curriculo from './src/Curriculo';
import ImageScreen from './src/ImageScreen';
import Empresas from './src/Empresas';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chamar">
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Register" component={Register} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Profile" component={Profile} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name='Chamar' component={Chamar} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name='Teste' component={Teste} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="ChatScreen" component={ChatScreen} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="Curriculo" component={Curriculo} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name="ImageScreen" component={ImageScreen} />
        <Stack.Screen options={{ title: "", headerTransparent: true }} name ="Empresas" component={Empresas}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;