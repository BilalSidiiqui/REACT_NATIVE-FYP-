import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {URL} from './utils/constant';

const Productdetails = props => {
  const auth = useSelector(state => state.auth);
  const [comment, setcomment] = useState([]);
  const [bid, setBid] = useState([]);
  const [bidPrice, setBidPrice] = useState('');
  const [msg, setMsg] = useState('');
  const isFocused = useIsFocused();
  const [show, setShow] = useState('');

  const url = URL.Url + `?listing=${props?.route?.params?.item}`;

  const Bidurl = URL.Url + `?listing=${props?.route?.params?.item.id}`;

  useEffect(() => {
    if (isFocused) {
      axios.get(url).then(res => {
        axios.get(res.data.Comment).then(response => {
          setcomment(response.data);
          // console.log('Comment', response.data);
        });
      });
      axios.get(Bidurl).then(res => {
        axios.get(res.data.Bid).then(response => {
          setBid(response.data);
          // console.log('Bid*******', response.data);
        });
      });
    }
  }, [isFocused]);

  const CommentHandler = async () => {
    // console.log('-----User data---->', auth);
    try {
      var data = new FormData();
      data.append('listing', props?.route?.params?.item.id);
      data.append('user', auth.user.user_id);
      data.append('comment', msg);

      var config = {
        method: 'post',
        url: URL.Url + 'Comment/',

        data: data,
      };

      const response = await axios(config);

      if (response) {
        alert('Comment Posted Successfully!');
      }
    } catch (error) {
      alert(error);
      alert(error?.message);
    }
  };

  const postBid = async () => {
    if (/^\d+$/.test(bidPrice) && bidPrice.length > 0) {
      try {
        let user = await AsyncStorage.getItem('user_id');
        const formBody = new FormData();
        formBody.append('user', auth.user.user_id);
        formBody.append('listing', props?.route?.params?.item.id);
        formBody.append('bid_price', bidPrice);
        const response = await axios.post(URL.Url + 'Bid/', formBody);
        if (response) {
          alert('Bid Placed');
        }
      } catch (error) {
        alert(error?.message);
      }
    } else alert('Invalid Bid');
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#C0C0C0',
        }}>
        <Text style={{fontSize: 15, color: 'blue'}}> {item.username} :</Text>
        <Text style={{marginLeft: 25, fontSize: 15}}>{item.comment} </Text>
      </View>
    );
  };

  const renderItemBid = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          padding: 10,
          marginBottom: 10,
          backgroundColor: '#C0C0C0',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text>Username: {item.username}</Text>
        </View>
        <Text> Price: {item.bid_price} $</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#DCDCDC', paddingHorizontal: 10}}>
      <ScrollView>
        <View>
          <Image
            style={{width: 300, height: 250, margin: 25, alignSelf: 'center'}}
            source={{uri: props?.route?.params?.item?.image}}
          />
          <Text style={{fontSize: 20}}>
            {' '}
            Title: {props?.route?.params?.item?.title}{' '}
          </Text>
          <Text style={{fontSize: 20}}>
            {' '}
            Description: {props?.route?.params?.item?.description}
          </Text>
          <Text style={{fontSize: 20}}>
            {' '}
            Category: {props?.route?.params?.item?.category}
          </Text>
          <Text style={{fontSize: 20}}>
            {' '}
            Starting Price: ${props?.route?.params?.item?.start_price}
          </Text>
          <Text style={{fontSize: 20}}>
            {' '}
            BID END AT: {props?.route?.params?.item?.end_date}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{
              width: '50%',
              backgroundColor: show ? 'white' : 'gray',
              paddingVertical: 15,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: show ? 'blue' : 'white'}}>
              {' '}
              Comments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{
              width: '50%',
              backgroundColor: show ? 'gray' : 'white',
              paddingVertical: 15,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: show ? 'white' : 'blue'}}>
              {' '}
              Bids
            </Text>
          </TouchableOpacity>
        </View>

        {!show ? (
          <>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                onChangeText={text => {
                  setMsg(text);
                }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  width: '82%',
                }}
                placeholder={'Type your Comment'}
              />
              <TouchableOpacity
                onPress={CommentHandler}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  justifyContent: 'center',
                  width: '15%',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}>
                <Text style={{color: 'blue'}}>Post</Text>
              </TouchableOpacity>
            </View>
            <FlatList data={comment} renderItem={item => renderItem(item)} />
          </>
        ) : (
          <>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  width: '82%',
                }}
                onChangeText={t => setBidPrice(t)}
                placeholder={'Type your Bid'}
              />
              <TouchableOpacity
                onPress={postBid}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  justifyContent: 'center',
                  width: '15%',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}>
                <Text style={{color: 'blue'}}>Post</Text>
              </TouchableOpacity>
            </View>
            <FlatList data={bid} renderItem={item => renderItemBid(item)} />
          </>
        )}
        {/* 
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: '#fff',
            marginBottom: 20,
          }}>
          <FlatList data={comment} renderItem={renderItem} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 13,
            marginBottom: 30,
            borderWidth: 2,
            borderBottomColor: 'black',
            width: 270,
            backgroundColor: 'white',
            paddingBottom: 3,
          }}>
          <FontAwesome
            name="comment"
            size={20}
            style={{marginRight: 20, marginTop: 14}}
          />
          <TextInput
            value={comment}
            onChangeText={t => setcomment(t)}
            placeholder="Write your comment"
            placeholderTextColor="black"
            style={{paddingLeft: 30, paddingBottom: 10, color: 'black'}}
          />

          <Button title="add" onPress={CommentHandler} />
        </View>

        <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          {' '}
          BIDS
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: '#fff',
            marginBottom: 20,
          }}>
          <FlatList data={bid} renderItem={renderItemBid} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            borderWidth: 2,
            borderBottomColor: 'black',
            width: 270,
            backgroundColor: 'white',
            paddingBottom: 3,
            marginBottom: 55,
          }}>
          <FontAwesome
            name="dollar"
            size={20}
            style={{marginRight: 20, marginTop: 14}}
          />
          <TextInput
            value={bidPrice}
            
            onChangeText={t=>setBidPrice(t)}
            placeholder="Place your Bid"
            placeholderTextColor="black"
            style={{paddingLeft: 30, paddingBottom: 10, color: 'black'}}
          />
          <View>
           <Button title="add" onPress={postBid} />
        </View>
        </View> */}
      </ScrollView>
    </View>
  );
};
export default Productdetails;
