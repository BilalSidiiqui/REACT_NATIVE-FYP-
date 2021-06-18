import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const Washlist = () => {
  const navigation = useNavigation();
  const [product, setproduct] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [filterproduct, setfilterproduct] = useState([]);
  const url = `https://artmandibackend.herokuapp.com/Watchlist/?user=`;
  const filterurl = 'https://artmandibackend.herokuapp.com/Listing/';
  const auth = useSelector(state => state.auth);
  const isFocused = useIsFocused();

  useEffect(async() => {
   await axios.get(url + auth.user.user_id).then(resp => {
      setproduct(resp.data);
      console.log(product, '1st attmpt');
      let array = product.map(e => e.listing);
      console.log(array, '2nd console');
      axios.get(filterurl).then(response => {
        setfilterproduct(response.data);
        console.log(filterproduct, '3rd console');
        let array2 = response.data.filter(e => array.includes(e.id));
        setfilterproduct(array2);
        console.log(array2, '4th consloe');
      });
    });
  
  
  }, [isFocused]);

const onRefresh=async()=>{
  setRefreshing(true);

  await axios.get(url + auth.user.user_id).then(resp => {
    setproduct(resp.data);
    console.log(product, '1st attmpt');
    let array = product.map(e => e.listing);
    console.log(array, '2nd console');
    axios.get(filterurl).then(response => {
      setfilterproduct(response.data);
      console.log(filterproduct, '3rd console');
      let array2 = response.data.filter(e => array.includes(e.id));
      setfilterproduct(array2);
      setRefreshing(false);
     
      console.log(array2, '4th consloe');
    });
  });
}
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginTop: 20,
          padding: 30,
          fontSize: 15,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          backgroundColor: '#D3D3D3',
          marginBottom: 20,
        }}>
        <Image style={{width: 300, height: 250}} source={{uri: item.image}} />
        <Text> TITLE: {item.title}</Text>
        <Text> DESCRIPTION: {item.description}</Text>
        <Text> STARTING PRICE: ${item.start_price}</Text>
        <Button
          title="Buy Now"
          onPress={() => navigation.navigate('ProductDetails', {item})}
        />
      </View>
    );
  };
  return (

    <ScrollView refreshControl={<RefreshControl
      colors={["#9Bd35A", "#689F38"]}
      refreshing={refreshing}
      onRefresh={onRefresh} />} >
      <FlatList  refreshControl={<RefreshControl
      colors={["#9Bd35A", "#689F38"]}
      refreshing={refreshing}
      onRefresh={onRefresh} />}  data={filterproduct} renderItem={(item)=>renderItem(item)} />
    </ScrollView>
  );
};
export default Washlist;
