import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Homescreen from './Home';
import Loginscreen from './Login';
import Icon from 'react-native-vector-icons/Entypo';
import About from './About';
import wishlist from './wishlist';
import Register from './Register';

const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const WishlistStack = createStackNavigator();
const AboutStack = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();

const MainTabScreen =()=>(
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Wishlist"
      component={WishlistStackScreen}
      options={{
        tabBarLabel: 'My Wishlist',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="add-to-list" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={LoginStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="login" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="About"
      component={AboutStackScreen}
      options={{
        tabBarLabel: 'About',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="info-with-circle" color={color} size={26} />
        ),
      }}
    />
    
  </Tab.Navigator>

);
export default MainTabScreen;
const HomeStackScreen =  ({navigation})=>(
    <HomeStack.Navigator screenOptions={
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
          <HomeStack.Screen name="Home" component={Homescreen} options={{
            headerLeft: ()=>(
              <Icon.Button name="menu"  size={30}
              backgroundColor= '#009387' onPress={()=>navigation.openDrawer()}></Icon.Button> 
  )
          }}/>
        </HomeStack.Navigator> 
  );
  
  
  const LoginStackScreen =  ({Navigation})=>(
    <LoginStack.Navigator screenOptions={
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
          <LoginStack.Screen name="Login" component={Loginscreen} />
        </LoginStack.Navigator> 
  );
  const WishlistStackScreen =  ({Navigation})=>(
    <WishlistStack.Navigator screenOptions={
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
          <WishlistStack.Screen name="My Wishlist" component={wishlist} />
        </WishlistStack.Navigator> 
  );
  const AboutStackScreen =  ({Navigation})=>(
    <AboutStack.Navigator screenOptions={
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
          <AboutStack.Screen name="About" component={About} />
        </AboutStack.Navigator> 
        
  );

 