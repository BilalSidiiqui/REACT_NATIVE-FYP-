import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {View, Image, FlatList,Text, ScrollView, TextInput, TouchableOpacity,Button} from 'react-native';
import {useNavigation} from '@react-navigation/native'

 const Washlist=()=> {
    const navigation=useNavigation()
    const[product,setproduct]=useState([]);
    const[filterproduct,setfilterproduct]=useState([]);
    const url=`https://d6ac0b3d0345.ngrok.io/Watchlist/?user=`
    const filterurl='https://d6ac0b3d0345.ngrok.io/Listing/'
    
    
    const Loginget=async()=>{
    let LOGINID=await AsyncStorage.getItem("user_id")
    console.log(LOGINID)
    axios.get(url+LOGINID).
    then(resp=>{
    setproduct(resp.data)
  console.log(product,"1st attmpt");

  let array=product.map( e => e.listing)
  console.log(array,"2nd console");

  
  axios.get(filterurl).then((response)=>{
    setfilterproduct(response.data)     
    console.log(filterproduct,"3rd console")
let array2= response.data.filter( e => array.includes(e.id))
    setfilterproduct(array2)
    console.log(array2,"4th consloe")

})
})
    }
   
    
    
    useEffect(()=>{
       Loginget();
      }, [])
    
      const renderItem = ({item}) => {
        return (
          <View style={{ marginTop:20,
            padding:30,
            fontSize:15,borderBottomColor:'grey',borderBottomWidth:1,backgroundColor:'#D3D3D3',marginBottom:20}} >
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
        <View>
     
         <FlatList 
        data={filterproduct} 
        renderItem={renderItem} />

           </View>
    )
}
export default Washlist;