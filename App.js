import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, TextInput, Button, Modal, SafeAreaView, ScrollView, Alert } from 'react-native';

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

       {titleVisible ? (         
       <View style={{backgroundColor: "white"}}>
           <Text>{currentUser}</Text>
        </View>       ) 
        : null}
      </ImageBackground>

      </TouchableOpacity>
        <UserModal isVisible={isVisible} setIsVisible ={setIsVisible} setCurrentUser={setCurrentUser}/>
    </View>
  )
}

const UserModal = ({isVisible, setIsVisible, currentUser, setCurrentUser}) => {

  let userName = "Guest"

  const handleChangeText = (value) => {
    if (value === "") {
      userName = "Guest"
    } else {
      userName = value;
    }
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
            <Button title="Submit" onPress={() => {setIsVisible(false); setCurrentUser(userName)}} style={{paddingTop: 20}} />
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
  const [currentUser, setCurrentUser] = useState("Guest");
  let CurrentImageComponent;
  if (currentUser === "Guest") {
    CurrentImageComponent = (
      <UserImage
        currentUser={currentUser}
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
      <ArticleScrollView/>
    </View>
  );
}

const ArticleScrollView = () => {
  return (
    <ScrollView style={{height: "85%"}}>
    <View style={{ width: "90%", height: 200, padding: 15, margin: 10}}>
      <Text>Lots of text in this here article</Text>
    </View>
    <View style={{ width: "100%", height: 200, padding: 10, margin: 10 }}>
      <Text>Even more in this. Just a bunch of text in this here article</Text>
    </View>
    <View style={{ width: "100%", height: 200, padding: 10, margin: 10 }}>
      <Text>Even more text like you wouldn't even believe. Not even kidding. Didn't have time to look into lorem ipsum.</Text>
    </View>
    <View style={{ width: "100%", height: 200, padding: 10, margin: 10 }}>
      <Text>Got incredibly lazy here and just... gave up I guess. So here's some random jibberish from now on</Text>
    </View>
    <View style={{ width: "100%", height: 50, padding: 10, margin: 10 }}>
      <Text>"NDUIeshnfdabsfkndasun eaklfjbads fkjdaslbf dsakhjbfajdmf yaiwelfb adskhf vadsiyulfb asyhilfbasd f</Text>
    </View>
    <LoadingView/>
    </ScrollView>
  );
};

const LoadingView = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button title ="Load more" onPress={createAlert}></Button>
  )
}

const createAlert = () => {
  Alert.alert('Unable to load!', 'Unable to find more articles', [
    {
      text: 'OK',
      onPress: () => {{() => setIsLoading(false); createAlert;}},
    },
  ]);
};

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
