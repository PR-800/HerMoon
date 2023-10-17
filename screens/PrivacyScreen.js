import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts } from 'expo-font';

const PrivacyScreen = ({ route, navigation }) => {

    const [loaded] = useFonts({
        MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
        MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

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
                    <Text style={styles.header}>Privacy Policy</Text>
                    <Text></Text>
                </View>
                {/* <Text style={styles.header}>รายชื่อสมาชิกกลุ่ม</Text> */}
            </LinearGradient>
            <Text style={styles.content}>
                วิชานี้เป็นส่วนหนึ่งของวิชา {'\n'}
                Mobile Device Programming (1/2023)
            </Text>
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
    height: '15%',
    justifyContent: 'center',
},
navbar: {
    padding: 30,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
},
header: {
    display: "flex",
    fontSize: 25,
    color: "white",
    fontFamily: 'MitrMedium',
    marginTop: -8,
},
content: {
    textAlign: 'center',
    margin: 50,
    fontFamily: 'MitrRegular',
    fontSize: 17,
    lineHeight: 30,
},
});

export default PrivacyScreen
