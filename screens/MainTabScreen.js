import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Homescreen from './Home';
import Icon from 'react-native-vector-icons/Entypo';
import Logout from './Logout';
import Washlist from './Washlist';
import seller from './seller';
import About from './About';

const HomeStack = createStackNavigator();
const SellerStack = createStackNavigator();
const WashlistStack = createStackNavigator();
const LogoutStack = createStackNavigator();
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
      name="Washlist"
      component={WashlistStackScreen}
      options={{
        tabBarLabel: 'My Watchlist',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="add-to-list" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Seller"
      component={SellerStackScreen}
      options={{
        tabBarLabel: 'Seller',
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
    <Tab.Screen
      name="Logout"
      component={LogoutStackScreen}
      options={{
        tabBarLabel: 'Logout',
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
            headerLeft:null 
  
          }}/>
        </HomeStack.Navigator> 
  );
  
  
  const SellerStackScreen =  ({Navigation})=>(
    <SellerStack.Navigator screenOptions={
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
          <SellerStack.Screen name="Seller" component={seller} />
        </SellerStack.Navigator> 
  );
  const WashlistStackScreen =  ({Navigation})=>(
    <WashlistStack.Navigator screenOptions={
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
          <WashlistStack.Screen name="My Watchlist" component={Washlist} />
        </WashlistStack.Navigator> 
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

 
  const LogoutStackScreen =  ({Navigation})=>(
    <LogoutStack.Navigator screenOptions={
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
          <LogoutStack.Screen name="Logout" component={Logout} />
        </LogoutStack.Navigator> 
        
  );

 