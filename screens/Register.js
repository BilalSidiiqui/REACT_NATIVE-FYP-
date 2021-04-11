import React from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Register = ({navigation}) => {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now !</Text>
        </View>
        <View style={styles.footer}> 
        <View style={styles.action}> 
        <FontAwesome 
                    name="user-o"
                    size={20}
                />
        <TextInput 
                    
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                 
                />
                
            </View>
            <View style={styles.action}>
            <FontAwesome 
                    name="at"
                    size={20}
                />
            <TextInput 
                    
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                 
                />
            </View>
            <View style={styles.action}>
            <FontAwesome 
                    name="lock"
                    size={20}
                />
        <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                 
                />
        </View>
        <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => navigation.navigate("Login")}
                >
                
                    <Text style={{color:'#fff'}}>Sign Up</Text>

                </TouchableOpacity>

          </View>
         
          <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}>
          <Text style={{color: 'grey', marginTop:10}}>
          Already have account? SIGN IN
          </Text>
          </TouchableOpacity>
        
        </View>
      

        
       
        
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
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
        marginTop: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 3
    },
    signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
});
