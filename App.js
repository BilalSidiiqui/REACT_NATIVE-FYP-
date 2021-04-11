import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './screens/MainTabScreen';
import Login from './screens/Login'
import Register from './screens/Register';

const Drawer = createDrawerNavigator();

const RegisterStack = createStackNavigator();

const RegisterStackScreen =  ({Navigation})=>(
  <RegisterStack.Navigator screenOptions={
        {
          headerStyle:{
            backgroundColor : '#009387'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight:'bold'
          }
        }
      }>
        <RegisterStack.Screen name="Register" component={Register} />
      </RegisterStack.Navigator> 
);
const App=()=> {
  return (
    <NavigationContainer >
       <Drawer.Navigator  >
        <Drawer.Screen name="Home" component={MainTabScreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={RegisterStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;