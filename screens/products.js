import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {View, Image, FlatList,Text,StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Products=()=> {

  const[product,setproduct]=useState([]);
  

  useEffect(()=>{
axios.get('https://ee7345651ad8.ngrok.io/Listing/').then(resp =>{
  setproduct(resp.data)
  show()
});
  },[])


  const navigation=useNavigation()

  const show=async()=>{

    console.log(await AsyncStorage.getItem("username"));
  }


const renderItem = ({item}) => {
    return (
      <View style={styles.ietm}>
          <Image
          style={{width:300,height:250}}
          source={{uri:item.image}}
          />
        <Text > TITLE: {item.title}</Text>
        <Text > DESCRIPTION: {item.description}</Text>
        <Text > STARTING PRICE: ${item.start_price}</Text>
        <Button title='Buy Now' onPress={()=>navigation.navigate('ProductDetails',{item})} />
        
      </View>
    );
  };


  
    return (
      <View style={styles.container}>
         <FlatList style={styles}
        data={product} 
        renderItem={renderItem} />

      </View>
    );
  }
  

const styles= StyleSheet.create({
container:{
flex:1,

paddingTop:40,
paddingHorizontal:10,

},
ietm:{
    marginTop:20,
    padding:30,
    backgroundColor:'#009387',
    fontSize:15
}
})
export default Products;
