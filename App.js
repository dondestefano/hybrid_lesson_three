import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, TextInput, Button } from 'react-native';

const Header = (currentUser, setCurrentUser, currentImage, isVisible, setIsVisible) => {
  return (
    <View style={styles.header}>
        <Text style={{fontSize: 20}}>Hello {currentUser}!</Text>
          <ImageBackground
            source={currentImage}
            style={{
            width: 200,
            alignItems: "bottom",
          }}>
           <Text 
              style={{ 
                textAlign: 'center' }}>{currentUser}
            </Text>
          </ImageBackground>

        <Modal 
          setCurrentUser = {setCurrentUser}
          isVisible = {isVisible} />
    </View>
  );
}

const Modal = (setCurrentUser, isVisible) => {
  let textInput = "";
  return (
    <View>
      <Modal visible={isVisible} transparent>
        <View
          style={{ ...styles.container, backgroundColor: 'rgba(1, 1, 1, 0.2)' }}
        >
          <View
            style={{
              ...styles.container,
              backgroundColor: 'yellow',
              flex: 0.5,
              width: '60%',
            }}
          >
            <TextInput style={{ padding: 8, backgroundColor: "#F2F2F2", textAlignVertical: 'top'}} placeholder="Enter name" onChangeText = {text => textInput = text}/>
            <Button title="Submit" onPress={() => {setIsVisible(false), setCurrentUser(textInput)}} />
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Image
                source={require('./assets/emoji.png')}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CurrentHeader = () => {
  const [currentUser, setCurrentUser] = useState("L");
  const [isVisible, setIsVisible] = useState(false);

  const loggedIn = require("./assets/emoji.png")
  const notloggedIn = require("./assets/icon.png")

  let CurrentHeaderComponent

  if (currentUser === "L") {
    CurrentHeaderComponent = (
      <Header 
        currentUser= "Guest" 
        setCurrentUser = {setCurrentUser}
        image = {loggedIn}
        isVisible = {isVisible}
        setIsVisible = {setIsVisible}
        />
    )
   } else {
    CurrentHeaderComponent = (
      <Header 
        currentUser = {currentUser} 
        setCurrentUser = {setCurrentUser}
        image = {loggedIn}
        isVisible = {isVisible}
        setIsVisible = {setIsVisible}
        />
    )
   }
   return (
    <View style={styles.container}>
      <Text>The screen:</Text>
      {CurrentHeaderComponent}
    </View>
  );
};


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hej</Text>
      <CurrentHeader/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    height: 70,
    alignItems:"center",
    marginVertical: 8,
    backgroundColor: 'blue'
  },
});
