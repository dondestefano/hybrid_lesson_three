import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, TextInput, Button, Modal, SafeAreaView, ScrollView } from 'react-native';

const emoji = require("./assets/emoji.png")
const icon = require("./assets/icon.png")

const UserImage = ({currentUser, setCurrentUser, currentImage, titleVisible}) => {
  const [isVisible, setIsVisible] = useState(false);

  return(
    <View>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          activeOpacity={0.8}
          style={{alignItems: "center", justifyContent:"center"}}
        >
    
       <ImageBackground source={currentImage} style={{ width: 50, height: 50, marginLeft: 15 }}>
         <View visible = {titleVisible} style={{backgroundColor: "white"}}>
           <Text>{currentUser}</Text>
        </View>       
      </ImageBackground>

      </TouchableOpacity>
        <UserModal isVisible={isVisible} setIsVisible ={setIsVisible} setCurrentUser={setCurrentUser}/>
    </View>
  )
}

const UserModal = ({isVisible, setIsVisible, currentUser, setCurrentUser}) => {

  let userName = ""

  const handleChangeText = (value) => {
    userName = value;
  }

  return (
      <Modal visible={isVisible} transparent>
        <View
          style={{ ...styles.container, backgroundColor: 'rgba(1, 1, 1, 0.2)', height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              ...styles.container,
              backgroundColor: 'grey',
              height: 150,
              width: '60%',
              padding: 20,
              justifyContent: "center",
            }}
          >
            <Text>Name:</Text>
            <TextInput style={{ padding: 8, backgroundColor: "#F2F2F2", textAlignVertical: 'top'}} placeholder="Enter name" value={currentUser} onChangeText={handleChangeText} />
            <Button title="Submit" onPress={() => {setIsVisible(false), setCurrentUser(userName)}} style={{paddingTop: 20}} />
          </View>
        </View>
      </Modal>
  );
};

const SafeArea = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 25,
        ...Platform.select({
          ios: { backgroundColor: 'yellow' },
          android: { backgroundColor: 'lightblue' },
        }),
      }}
    ></SafeAreaView>
  )
}

const UserHeader = () => {
  const [currentUser, setCurrentUser] = useState("");

  let CurrentImageComponent;
  if (currentUser === "") {
    CurrentImageComponent = (
      <UserImage
        currentUser="Guest"
        setCurrentUser={setCurrentUser}
        currentImage={icon}
        titleVisible={false}
      />
    );
  } else {
    CurrentImageComponent = (
      <UserImage
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        currentImage={emoji}
        titleVisible={true}
      />
    );
  }
  return (
          <View
      style={{
        backgroundColor: "orange",
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        flexDirection: "row"
      }}
    >
      <Text style={{
        fontSize: 20
      }}>Welcome {currentUser}!</Text>
      {CurrentImageComponent}
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <SafeArea></SafeArea>
      <UserHeader/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: 70,
    alignItems:"center",
    marginVertical: 8
  },

  text: {
      color: "#00b9bc",
      fontWeight: "bold",
      fontSize: 18
  }
});
