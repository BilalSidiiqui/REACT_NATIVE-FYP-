import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { View, Text, StyleSheet,TextInput, TouchableOpacity,Button } from 'react-native';
import { useState } from 'react/cjs/react.development';

 function About() {

const [name,setname]=useState('');
const[flag,setFlag]=React.useState(false)

const getUser=async()=>{
    let username = await AsyncStorage.getItem("username")
    setname[username];
    setFlag[true];
        }
    if(!flag)
    {
    getUser();
    }
    return (

    <View>
<Text>COntact us on Artmandi </Text>
<Text>Username : {name}</Text>
    </View>
    )
}
export default About;