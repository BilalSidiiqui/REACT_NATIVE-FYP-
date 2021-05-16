import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {View, Image, FlatList,Text, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Productdetails=(props)=> {

  
const[comment,setcomment]=useState([]);
const[bid,setBid]=useState([]);
console.log(comment);
const url=`https://ee7345651ad8.ngrok.io/Comment/?listing=${props?.route?.params?.item.id}`;


const Bidurl=`https://ee7345651ad8.ngrok.io/Bid/?listing=${props?.route?.params?.item.id}`;




useEffect(()=>{
    axios.get(url)
    .then(response => {
      setcomment(response.data)
    })
    axios.get(Bidurl).
    then(resp=>{
      setBid(resp.data)
    })
  }, [url])

  const CommentHandler = async () => {
    try {
      let user=await AsyncStorage.getItem("user_id");
      const response = await axios.post('https://ee7345651ad8.ngrok.io/Comment/', {
    user,
    comment,
    listing:props.route.params.item.id
      });
      console.log(response)
      if (response) {
        alert('Comment Posted Successfully!');
      }
    } catch (error) {
      alert(error);
    }
    console.log(user)
}


         
const renderItem = ({item}) => {
  return (
    

    <View style={{flexDirection:'row',marginTop:10, padding:10, marginBottom:10,backgroundColor:'#C0C0C0'}}>
      <Text style={{fontSize:15}} > User: {item.username}</Text>
      <Text style={{marginLeft:25, fontSize:15}}>" {item.comment} "</Text>

      </View>
      
   
  );
};

const renderItemBid = ({item}) => {
  return (
    <View style={{flexDirection:'row',marginTop:10, padding:10, marginBottom:10,backgroundColor:'#C0C0C0'}}>
       <Text style={{alignSelf:'center'}}> COMMENTS</Text>
      <Text style={{fontSize:15}} > User: {item?.username}</Text>
      <Text style={{marginLeft:25, fontSize:15}}> Price: ${item?.bid_price}</Text>

      
      
    </View>
  );
};

    return (
       
      <View style={{backgroundColor:'#DCDCDC'}} >
        <ScrollView>
      
       <View>
        <Image
          style={{width:300,height:250,margin:25,alignSelf:'center'}}
          source={{uri:props?.route?.params?.item?.image}}/>
         <Text style={{fontSize:20}}> Title: {props?.route?.params?.item?.title}  </Text>
          <Text style={{fontSize:20}}> Description: {props?.route?.params?.item?.description}</Text>
         <Text style={{fontSize:20}}> Category: {props?.route?.params?.item?.category}</Text>
          <Text style={{fontSize:20}}> Starting Price: ${props?.route?.params?.item?.start_price}</Text> 
          <Text style={{fontSize:20,}}> BID END AT: {props?.route?.params?.item?.end_date}</Text>
          <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold', marginTop:30}}> COMMENTS</Text>
          </View>



<View style={{borderWidth:1,borderColor:'black',backgroundColor:'#fff', marginBottom:20}}>
<FlatList
data={comment}
renderItem={renderItem}
/></View>

<View style={{ flexDirection: 'row',
        marginTop: 13,
        marginBottom:30,
        borderWidth: 2,
        borderBottomColor: 'black',
        width:270,
        backgroundColor:'white',
        paddingBottom: 3}}> 
        <FontAwesome 
                    name="comment"
                    size={20}
                    style={{marginRight:20,marginTop:14}}
                />
        <TextInput 
                    value={comment}
                    onChangeText={t=>setcomment(t)}
                    placeholder="Write your comment"
                    placeholderTextColor="black"
                    style={{paddingLeft: 30,
                      paddingBottom:10,
                      color: 'black',
                    }}                 
                />
               
               <Button 
               title="add"
               onPress={CommentHandler}
               />
                </View>
                
      
           

<Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold', marginTop:20}}> BIDS</Text>

<View style={{borderWidth:1,borderColor:'black',backgroundColor:'#fff',marginBottom:20}}>
<FlatList
data={bid}
renderItem={renderItemBid}
/></View>

<View style={{ flexDirection: 'row',
        marginTop: 10,
        borderWidth: 2,
        borderBottomColor: 'black',
        width:270,
        backgroundColor:'white',
        paddingBottom: 3,
        marginBottom:55}}> 
        <FontAwesome 
                    name="dollar"
                    size={20}
                    style={{marginRight:20,marginTop:14}}
                />
        <TextInput 
                    // value={values.bid_price}
                    // onBlur={handleBlur('bid_price')}
                    // onChangeText={handleChange('bid_price')}
                    placeholder="Place your Bid"
                    placeholderTextColor="black"
                    style={{paddingLeft: 30,
                      paddingBottom:10,
                      color: 'black',
                    }}                 
                />
                 <View style={{backgroundColor:'#009387',
                borderRadius:10,width:130,height:50,marginTop:4,marginLeft:120}}>
                
                <TouchableOpacity
                   style={{ width: '100%',
                   height: 45,
                   justifyContent: 'center',
                   alignItems: 'center',
                   borderRadius: 5,}}
                    // onPress={handleSubmit}
                    
                >
                  <Text style={{color:'black',fontWeight:'bold',fontSize:18}}>Bid Now</Text>
                </TouchableOpacity>
                </View>
                
            </View>


</ScrollView>
</View>
    )
}
export default Productdetails;