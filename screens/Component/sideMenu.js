import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const sideMenu = props => {
  return (
    <View>
      <View style={{padding: 30}}>
        <Text style={{fontSize: 15}}>Hello</Text>
      </View>
      <View style={{borderWidth: 1}} />
      <View style={{padding: 10, marginTop: 10}}>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => {
            props.navigation.navigate('Home');
          }}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => {
            props.navigation.navigate('Policies');
          }}>
          <Text>Policies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => {
            props.navigation.navigate('About');
          }}>
          <Text>Terms of Services</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => {
            props.navigation.navigate('About');
          }}>
          <Text>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default sideMenu;

const styles = StyleSheet.create({});
