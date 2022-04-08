import React from 'react';
import {View, Text,Button} from 'react-native';
import url from '../url.js';
const Index = (props) => {
  function logout(){
  props.save("isLoggedIn","false");
  props.save("user","");
    props.logout();
  }
  return (
    <View>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>{props.user.username} Home, sweet home</Text>
      <Button title="logout" onPress={logout}></Button>
    </View>
  );
};

export default Index;
