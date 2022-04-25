import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View} from 'react-native';
import React from 'react';
import { createUser, signIn, userType } from '../firebase';
import { useNavigation } from '@react-navigation/core';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()


  async function signin() {
    var success = true;
    await signIn(email, password).catch(error => {
      alert("Incorrect Email or Password!");
      success = false;
    })
    if (success) {
        var user_type = await userType();
        if (user_type == "driver") {
            navigation.navigate("DriverTracking");
        } else {
            navigation.navigate("CustomerTracking")
        }
    }
  }

  const signUp = () => {
    navigation.navigate("SignUp");
  }


  return (

    <View style = {styles.loginScreenStyle}>
      <View style = {styles.loginContainer}>

        <Text style = {styles.title}> Buzz Delivery! </Text>

        <View style = {styles.inputContainer}>
            <TextInput
                placeholder = "Email"
                value = {email}
                onChangeText = {text => setEmail(text)}
                style = {styles.inputText}>
            </TextInput>
        </View>

        <View style = {styles.inputContainer}>
            <TextInput placeholder = "Password"
                style = {styles.inputText}
                value = {password}
                onChangeText = {text => setPassword(text)}
                secureTextEntry = {true}>
            </TextInput>
        </View>

        <View style = {styles.loginButtonContainer}>
            <Button title = "Login" onPress = {signin}>
              <Text> Login </Text>
            </Button>
        </View>

        <View style = {styles.registerButtonContainer}>
            <Text style = {styles.newUserText}> New to the App? </Text>
            <Button title = "Register" onPress = {signUp}>
              <Text> Register </Text>
            </Button>
        </View>

      </View>
    </View>

  );
};

export default Login;

const styles = StyleSheet.create({
  loginScreenStyle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  loginContainer: {
     alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    margin: '5%',
    marginTop: '3%'
  },
  inputText: {
    fontSize: 18,
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3
  },
  loginButtonContainer: {
    width: '80%',
    marginBottom: '3%'
  },
  registerButtonContainer: {
    width: '80%',
    marginTop: '5%'
  },
  title: {
    fontSize: 36,
    marginBottom: 20
  },
  newUserText: {
    textAlign: 'center',
    marginBottom: 2
  }
});