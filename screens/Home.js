import React from 'react';
import { View, StyleSheet,ImageBackground,Text } from 'react-native';
import Product from './products'
const Home = ({navigation}) => {

 

    return (
      <View style={styles.container}>
        
         <Product/>   
         <Text>© ArtMandi.2021</Text>   
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
