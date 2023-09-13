import React from 'react'
import { StyleSheet, Text, View, Image, Pressable  } from 'react-native';
import { Button } from 'react-native-web';


const ProfileScreen = ({ route, navigation }) => {
    return ( 
        <View style={styles.screen}>
            <Image
                source={require('../assets/profile/blank-profile.jpg')}
                style={styles.image}
            />
            <Pressable onPress={() => {
                    return console.log("Edit image")
                }}>
                <Image
                    source={require('../assets/profile/edit-profile.png')}
                    style={{width:50, height:50,bottom:0, left:55,}}
                />
            </Pressable>
            <Text style={styles.headers}>
                Name Surname
            </Text>
            <Text style={styles.subheader}>
                fluk@gmail.component | 012 344 5567
            </Text>
            <View style={styles.box} >
                <Pressable onPress={() => {
                    return console.log("Edit profile")
                }}>
                    <Image
                        source={require('../assets/profile/profile.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.content}>Edit profile</Text>
                </Pressable>

                <Pressable onPress={() => {
                    return console.log("Notifications")
                }}>
                    <Image
                        source={require('../assets/profile/notification.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.content}>Notifications</Text>
                </Pressable>

                <Pressable onPress={() => {
                    return console.log("Language")
                }}>
                    <Image
                        source={require('../assets/profile/translate.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.content}>Language</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "monospace",
    },
    image: {
        width: 150, 
        height: 150, 
        resizeMode: "contain", 
        // borderRadius: "50%",
        borderRadius: 50
    },
    headers: {
        fontSize: 25,
        // fontWeight: 700,
        fontWeight: 'bold',
        fontFamily: "monospace",
    },
    subheader: {
        fontSize: 17,
    },
    content: {
        fontFamily: "monospace",
        flex: 1,
        fontSize: 17,
        margin: 5,
    },
    box: {
        display: "flex",
        width: 350,
        margin: 40,
        padding: 20,

        // shadow
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 15,
        shadowColor: "gray",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
    },
    icon: {
        display: "flex",
        flex: 1,
        width: 25,
        height: 25,
    }
});

export default ProfileScreen
