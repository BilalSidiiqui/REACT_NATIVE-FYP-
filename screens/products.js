import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {View, Image, FlatList, Text, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from './utils/constant';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import { Form } from 'formik';

const Products = () => {
  const [product, setproduct] = useState([]);

  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    axios.get(URL.Url + 'Listing/').then(resp => {
      setproduct(resp.data);
      // let array = resp.data.filter(e => e.completed === true);
      // setproduct(array);
      show();
    });
  }, []);

  const navigation = useNavigation();

  const show = async () => {
    console.log(await AsyncStorage.getItem('username'));
  };

  const handleFinish = item => {
    const form =new FormData()
    form.append('listing',item.id)
  axios.post(URL.Url+'closebid/',form).then((res)=>{
    console.log(res.data);
    alert('Bid Closed')
  }).catch((error)=>{
    console.log(error);
  })

  };
  const renderItem = ({item}) => {
    let date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

    let expirydate = moment(item.end_date).format('YYYY-MM-DD hh:mm:ss');
    let diffr = moment.duration(moment(expirydate).diff(moment(date)));
    // Difference of the expiry date-time
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;

    return (
      <View style={styles.ietm}>
        <Image
          style={{width: '100%', height: 250, borderRadius: 20}}
          source={{uri: item.image}}
        />
        <View style={{marginVertical: 10}}>
          <Text> TITLE: {item.title}</Text>
          <Text> DESCRIPTION: {item.description}</Text>
          <Text style={{fontSize: 14, color: 'white'}}>
            {' '}
            STARTING PRICE: ${item.start_price}
          </Text>
        </View>
        <View
          style={{paddingVertical: 10, width: '100%', alignItems: 'center'}}>
          {/* {milisecond<0?(false):( */}
          <View>
            <CountDown
              until={d}
              //duration of countdown in seconds
              timetoShow={('H', 'M', 'S')}
              //formate to show
              onFinish={() => handleFinish(item)}
              //on Finish call
              //on Press call
              size={20}
            />
          </View>
          {/* )
  }  */}
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
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: '#009387',
    fontSize: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Products;
