import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import { useState,useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  let [user,setuser]=useState({
    username:'',
    isSignedIn:false,
  });
  /*async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }*/
  /*async function checkifuserloggedIn() {
    let result = await SecureStore.getItemAsync(isLoggedIn);
    if(result===true){
      //let user = await SecureStore.getItemAsync(user);
      setuser({
        isSignedIn:true,
        username:"",
      });
    }
  
  }*/
 /* useEffect(() => {
      checkifuserloggedIn();
  }, []);*/

  function logout(){

    setuser({isSignedIn:false,username:''});

  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user.isSignedIn==false?
        <>
         <Stack.Screen name="SignIn" >
          {props => <SignInScreen {...props} exec={setuser}  />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" initialParams={{username:"",email:"",password:""}}>
          {props => <ConfirmEmailScreen {...props} exec={setuser}  />}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} initialParams={{username:"",email:""}}/>
        </>
          :
       
          <Stack.Screen name="Home">
          {props => <HomeScreen {...props} user={{username:user.username}} logout={logout}  />}
        </Stack.Screen>
}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
