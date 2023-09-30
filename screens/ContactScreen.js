import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts } from 'expo-font'; 

const ContactScreen = ({ route, navigation }) => {

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
                    <Text style={styles.header}>Group members</Text>
                    <Text></Text>
                </View>
                {/* <Text style={styles.header}>รายชื่อสมาชิกกลุ่ม</Text> */}
            </LinearGradient>
            <View style={styles.content}>
                <Text style={styles.text}>64070014 นายจิรโรจน์ เลิศอัครนานนท์</Text>
                <Text style={styles.text}>64070025 นางสาวฐิติภา เอี่ยมสิริวงศ์</Text>
                <Text style={styles.text}>64070149 นางสาวดวงกมล พบสูงเนิน{`\n`}</Text>
                <Text style={styles.text}>คณะเทคโนโลยีสารสนเทศ</Text>
                <Text style={styles.text}>สาขาเทคโนโลยีสารสนเทศ ชั้นปีที่ 3</Text>
                <Text style={styles.text}>แขนง Software Engineering{`\n`}</Text>
                <Text style={styles.text}>สถาบันเทคโนโลยีพระจอมเกล้า</Text>
                <Text style={styles.text}>เจ้าคุณทหารลาดกระบัง</Text>
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
    alignItems: "center",
    margin: 50,
    fontSize: 20,
},
text: {
    fontFamily: 'MitrRegular',
    fontSize: 17,
    lineHeight: 30,
},
});

export default ContactScreen
