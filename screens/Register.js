import React from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {Formik} from 'formik';
axios.defaults.baseURL="https://ee7345651ad8.ngrok.io"
const Register = ({navigation}) => {


  const RegisterHandler = async ({username,email, password,confirmPassword}) => {
      try {
        const response = await axios.post('/register/', {
          username,
          email,
          password,
          confirmPassword
        });
        const responsestr=JSON.stringify(response);
        console.log(responsestr)
        navigation.navigate('Login');
        if (responsestr) {
          alert('User Registered Successfully!');
        }
      } catch (error) {
        alert(error);
      }
}
    return (
    
         
    <Formik
    initialValues={{
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }}
    onSubmit={(values, formikActions) => {
      RegisterHandler(values);
    }}>
    {({
      handleBlur,
      handleChange,
      handleSubmit,
      values,

    }) => (
      
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
                    value={values.username}
                    onBlur={handleBlur('username')}
                    onChangeText={handleChange('username')}
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
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    keyboardType="email-address"
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
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    secureTextEntry

                />
                </View>
                <View style={styles.action}>
            <FontAwesome 
                    name="lock"
                    size={20}
                />
                  <TextInput 
                    placeholder="Confirm Password"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={values.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    onChangeText={handleChange('confirmPassword')}
                    secureTextEntry
                />
        </View>
        <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={handleSubmit}
                    
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
    )
    }
  </Formik>

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
      paddingBottom: 20
  },
  footer: {
      flex: 7,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10
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
