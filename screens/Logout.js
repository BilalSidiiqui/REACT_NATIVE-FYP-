import React from 'react'
import { View, } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation}) => {
  
  const removeid=async()=>{ 
     await AsyncStorage.clear()


    }
    navigation.dispatch(
        CommonActions.reset({
        
          index: 0,
          routes: [
            { name: 'Login' },
          
          ],
        }
       

        )
       );
       removeid();
       
      
        return (
            <View>
                </View>
        )
    }

export default Logout;