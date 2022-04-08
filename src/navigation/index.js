import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign, FontAwesome5, Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import { useState,useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function FavouritesScreen(props){
  return (<View style={{flex:1}}><Text> {props.user.username} In favourites screen</Text></View>);
}

function FriendsScreen(props){
  return (<Text>{props.user.username} In friends screen</Text>);
}

const Navigation = () => {
  let [user,setuser]=useState({
    username:'',
    isSignedIn:false,
  });
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
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
 useEffect(async () => {
 let result = await SecureStore.getItemAsync("isLoggedIn");
  if(result==="true"){
    let user_name=await SecureStore.getItemAsync("user");
    setuser({isSignedIn:true,username:user_name});
  }
  }, []);

  function logout(){

    setuser({isSignedIn:false,username:''});

  }
  return (
    <NavigationContainer>
      {user.isSignedIn==false?
      <Stack.Navigator screenOptions={{headerShown: false}}>
        
        <>
         <Stack.Screen name="SignIn" >
          {props => <SignInScreen {...props} exec={setuser} save={save}/>}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" initialParams={{username:"",email:"",password:""}}>
          {props => <ConfirmEmailScreen {...props} exec={setuser} save={save}  />}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} initialParams={{username:"",email:""}}/>
        </>
        </Stack.Navigator>
          :
       
    <Tab.Navigator initialRouteName="Home"  activeColor="#f0edf6" 
    inactiveColor="#3e2465"   
    
     screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
return <AntDesign name="home" size={24} color={focused?"white":"black"} />;
        } else {if (route.name === 'Favourites') {
      return <Fontisto name="favorite" size={24} color={focused?"white":"black"}/>;
        }
        else{
    return <AntDesign name="addusergroup" size={24} color={focused?"white":"black"}  />
        }
      }

      },

      
      
    })}

   
    >
      <Tab.Screen name="Favourites">
  {props => <FavouritesScreen {...props} user={{username:user.username}}   />}
</Tab.Screen>
    <Tab.Screen name="Home">
  {props => <HomeScreen {...props} user={{username:user.username}} logout={logout} save={save}  />}
</Tab.Screen>

<Tab.Screen name="Friends" >
  {props => <FriendsScreen {...props} user={{username:user.username}}  />}
</Tab.Screen>
      </Tab.Navigator>

}
      
    </NavigationContainer>
  );
};

export default Navigation;
