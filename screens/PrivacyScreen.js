import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const PrivacyScreen = ({ route, navigation }) => {

  return (
    <View style={styles.screen}>
        <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#9F79EB', '#FC7D7B',]}
            style={styles.gradientBackground}
        >
        <View style={styles.navbar}>
                    <Pressable onPress={() => {
                                navigation.navigate("Profile", {});
                            }}>
                        <Image
                        style={styles.icon}
                        source={require('../assets/article/arrow-left-white.png')}
                        />
                    </Pressable>
                    <Text style={styles.subheading}>PrivacyScreen</Text>
                    <Text></Text>
                </View>
                {/* <Text style={styles.header}>รายชื่อสมาชิกกลุ่ม</Text> */}
            </LinearGradient>
            <View style={styles.content}>
                <Text>วิชานี้เป็นส่วนหนึ่งของวิชา</Text>
                <Text>Mobile Device Programming (1/2023)</Text>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
screen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
},
  gradientBackground: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    // alignItems: 'center'
},
navbar: {
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderColor: "black",
    // borderWidth: 2,
},
subheading: {
    display: "flex",
    fontSize: 20,
    color: "white",
    fontWeight: "600",

},
icon: {
    display: "flex",
    width: 25,
    height: 25,
},
header: {
    marginLeft:30,
    fontSize:25,
    color:"white",
    fontWeight:"bold",
},
content: {
    alignItems: "center",
    margin: 50,
    fontSize: 20,
}
});

export default PrivacyScreen
