import React,{useState} from 'react'
import axios from 'axios';
import {Formik} from 'formik';
import { View, Text, StyleSheet,TextInput, TouchableOpacity,Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

axios.defaults.baseURL="https://d6ac0b3d0345.ngrok.io"
const seller = ({navigation}) =>{

 


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
   const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  
  const[title,settitle]=useState('');
  const[description,setdescription]=useState('');
  const[category,setcategory]=useState('');
  const[image,setimage]=useState('');
  const[start_price,setstart_price]=useState('');
  const[created_by,setcreated_by]=useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
    const AddaProductHandler = async () => {
        try {
          const response = await axios.post('/Listing/', {
            title,
            description,
            image,
            category,
            start_price,  
            
            
          });
          const responsestr=JSON.stringify(response);
          navigation.navigate('Home');
          if (responsestr) {
            alert('Product Added Successfully!');
          }
        } catch (error) {
          alert(error);
        }
  }

console.log(date);
  return (
             
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Add your product</Text>
        </View>
        <View style={styles.footer}> 
        <View style={styles.action}> 
        
        <TextInput 
                    value={title}
                    onChangeText={t=>settitle(t)}
                    placeholder="Product title"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                 
                />
                
            </View>
            <View style={styles.action}>
           
            <TextInput 
                 value={description}
                 onChangeText={t=>setdescription(t)}
                    placeholder=" Write description"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                   
                />
            </View>
            <View style={styles.action}>
            
        <TextInput 
                    placeholder="Place Image URL"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={image}
                    onChangeText={t=>setimage(t)}

                />
                </View>

                <View style={styles.actionPicker}>
          <Picker

                    style={{width:'80%'}}
                    selectedValue={category}
                    onValueChange={(itemvalue)=> setcategory(itemvalue)}
                      >
                    <Picker.Item label="EDUCATION" value="E"/>
                    <Picker.Item label="HOME" value="H" />
                    <Picker.Item label="TOY" value="T"/>
          </Picker>

              </View>

                <View style={styles.action}>
            
                  <TextInput 
                    placeholder="Enter starting price"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={start_price}
                    onChangeText={t=>setstart_price(t)}
                    keyboardType='numeric'
                />
        </View>
          <View>
          <View>
        <Button onPress={showDatepicker} title="Enter End Date!" />
      </View>
          {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
          </View>

        <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={AddaProductHandler}
                    
                >
                
                    <Text style={{color:'#fff'}}>ADD PRODUCT</Text>

                </TouchableOpacity>

          </View>
        
        </View>
      

        
       
        
        </View>
    )
 
};
export default seller;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    footer: {
        flex: 8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },textInput: {
      paddingLeft: 30,
      paddingBottom:10,
      color: '#05375a',
  },  button: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor:'#009387',
    borderRadius:10,
  },
   action: {
          flexDirection: 'row',
          marginTop: 22,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 3
      },
      actionPicker:{ flexDirection: 'row',
      marginTop: 25,
     marginLeft:20,
     borderWidth:1,
    
      borderColor: '#f2f2f2',
      paddingBottom: 3},
      signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
  });
  