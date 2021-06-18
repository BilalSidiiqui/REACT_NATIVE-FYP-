import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from './utils/constant';

const Products = () => {
  const [product, setproduct] = useState([]);

  useEffect(() => {
    axios.get(URL.Url + 'Listing/').then(resp => {
      setproduct(resp.data);
      let array = resp.data.filter(e => e.completed === false);
      setproduct(array);
      show();
    });
  }, []);

  const navigation = useNavigation();

  const show = async () => {
    console.log(await AsyncStorage.getItem('username'));
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.ietm}>
        <Image
          style={{width: "100%", height: 250, borderRadius: 20}}
          source={{uri: item.image}}
        />
        <View style={{paddingVertical: 10}}>
          <Text> TITLE: {item.title}</Text>
          <Text> DESCRIPTION: {item.description}</Text>
          <Text> STARTING PRICE: ${item.start_price}</Text>
        </View>

        <Button
          title="Buy Now"
          onPress={() => navigation.navigate('ProductDetails', {item})}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList style={styles} data={product} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 40,
    paddingHorizontal: 10,
  },
  ietm: {
    marginTop: 10,
    padding: 30,
    backgroundColor: '#009387',
    fontSize: 15,
    borderRadius: 20,
    alignItems:'center',
    justifyContent:'center',

  },
});
export default Products;
