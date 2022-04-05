import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { createUser, signIn } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { RadioButton } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [venmo, setVenmo] = useState('')
  const [role, setRole] = React.useState('Customer');
  

  const navigation = useNavigation()

  const signup = () => {
    var is_driver = false;
    if (role == "Driver") {
        is_driver = true;
    }
    try {
        var user = createUser(email, password, is_driver, name, venmo);
        if (user == null) {
          alert("Invalid Email or Password. Make sure Password is at least 6 characters!")
        }
        navigation.goBack()
        showMessage({
            message: "Sign Up was successful!",
            type: "success",
          });
    } catch (error) {
        showMessage({
            message: "There was something wrong with your information. Please try again.",
            type: "error",
          });
    }
    
  }


  return (

    <View style = {styles.loginScreenStyle}>
      <View style = {styles.loginContainer}>
      <Text style = {styles.title}> Register for an Account </Text>
      <Text>I want to be a:</Text>

      <RadioButton.Group onValueChange={role => setRole(role)} value={role}>
      <RadioButton.Item label="Driver" value="Driver" />
      <RadioButton.Item label="Customer" value="Customer" />
    </RadioButton.Group>


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

        <View style = {styles.inputContainer}>
            <TextInput placeholder = "Name"
                style = {styles.inputText}
                value = {name}
                onChangeText = {text => setName(text)}
                >
            </TextInput>
        </View>

        <View style = {styles.inputContainer}>
            <TextInput placeholder = "Venmo-Tag"
                style = {styles.inputText}
                value = {venmo}
                onChangeText = {text => setVenmo(text)}
                >
            </TextInput>
        </View>

        <View style = {styles.registerButtonContainer}>
            <Text style = {styles.newUserText}> New to the App? </Text>
            <Button title = "Register" onPress = {signup}>
              <Text> Register </Text>
            </Button>
        </View>

      </View>
    </View>

  );
};

export default SignUp;

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
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor:'#f01d71',
    marginTop:40,
    marginLeft: 40,
    marginRight: 40
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center'
}
});