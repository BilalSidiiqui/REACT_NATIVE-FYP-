import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'https://d6ac0b3d0345.ngrok.io/';

const Login = ({navigation}) => {
  const LoginHandler = async ({username, password}) => {
    try {
      const response = await axios.post('/login/', {
        username,
        password,
      });

      const responsestr = response.data;
      console.log(responsestr.user_id);
      console.log(responsestr.username);
      if (responsestr) {
        await AsyncStorage.setItem('user_id', responsestr.user_id + '');
        await AsyncStorage.setItem('username', responsestr.username);
        alert('User Login Successfully!');
        navigation.navigate('Home');
      }
    } catch (error) {
      alert(error?.response?.data?.message || error?.message);
    }
  };
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('Username is Required')
          .matches(/^[a-zA-Z]/, 'Username Should Only Contains Letters'),
        password: Yup.string().required('Password is Required'),
      })}
      onSubmit={(values, formikActions) => {
        LoginHandler(values);
      }}>
      {({handleBlur, handleChange, handleSubmit, values,errors}) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text_header}>Login Now !</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.action}>
              <FontAwesome name="user-o" size={20} />
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
  {errors.username ? 
  (
    <View>
  <Text style={styles.error}>{errors.username}</Text>
  </View>
  ):null}
  
 
            <View style={styles.action}>
              <FontAwesome name="lock" size={20} />
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
            {errors.password ? <Text style={styles.error}>{errors.password}</Text>:null}
            <View style={styles.button}>
              <TouchableOpacity style={styles.signIn} onPress={handleSubmit}>
                <Text style={{color: '#fff'}}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color: 'grey', marginTop: 10}}>
                Create an account? REGISTER NOW!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  textInput: {
    paddingLeft: 10,
    paddingBottom: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#009387',
    borderRadius: 10,
  },
  action: {
    flexDirection: 'row',
    alignItems:'center',
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 3,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  error:{
  color:'red'
  }
});
