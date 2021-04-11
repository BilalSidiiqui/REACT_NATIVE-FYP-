import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  FlatList,View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Product from './products'
const Home = ({navigation}) => {

 

    return (
      <View style={styles.container}>
         <Product/>
       </View>

        
      
         
     
    );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
