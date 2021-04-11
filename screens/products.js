import React, {Component} from 'react';
import {View, Image, FlatList,Text,StyleSheet} from 'react-native';

class products extends Component {
  constructor() {
    super();
    this.state = {
      Productdata: null
    };
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.ietm}>
          <Image
          style={{width:300,height:250}}
          source={{uri:item.image}}
          />
        <Text > TITLE: {item.title}</Text>
        <Text > DESCRIPTION: {item.description}</Text>
        <Text > STARTING PRICE: ${item.start_price}</Text>
        
      </View>
    );
  };

componentDidMount(){
    fetch('http://5a4cc172562a.ngrok.io/Listing/?format=json').then((resp)=> {
      resp.json().then((result) => {
       
        this.setState({Productdata:result})
      })
    })
    
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
         <FlatList style={styles}
        data={this.state.Productdata} 
        renderItem={this.renderItem} />

      </View>
    );
  }
  
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
export default products;
