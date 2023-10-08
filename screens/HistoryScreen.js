import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';


const HistoryScreen = ({navigation}) => {

  return (
    <View style={styles.screen}>
        <View style={styles.headerGroup}>
          <Pressable onPress={() => {
                      navigation.navigate("Home", {});
                      return console.log("go Home")
                  }}>
            <Image
              source={require('../assets/profile/arrow-left.png')}
              style={styles.arrowleft}
            />
          </Pressable>
          <Text style={styles.header}>History</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerGroup: {
    flexDirection: "row",
    marginVertical: 30,
    marginTop: 60,
  },
  arrowleft: {
    display: "flex",
    top: 15,
    right: 90,
    width: 25,
    height: 25,
  },
  header: {
    display: "flex",
    fontSize: 25,
    fontFamily: "MitrMedium",
    lineHeight: 50,
},
});

export default HistoryScreen
