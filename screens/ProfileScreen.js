import React from 'react'
import { StyleSheet, Text, View, Image, Pressable  } from 'react-native';
import { Button } from 'react-native-web';
import { LinearGradient } from 'expo-linear-gradient';


const ProfileScreen = ({ route, navigation }) => {
    return ( 
        <View style={styles.screen}>
            <LinearGradient
                colors={['#FC7D7B', '#9F79EB']}
                style={[styles.gradientBackground, {}]}
            >
            <Image
                source={require('../assets/profile/blank-profile.jpg')}
                style={styles.image}
            />
            <Pressable onPress={() => {
                    return console.log("Edit image")
                }}>
                <Image
                    source={require('../assets/profile/edit-profile.png')}
                    style={{width:50, height:50,bottom:50, left:55,}}
                />
            </Pressable>
            <Text style={styles.headers}>
                Name
            </Text>
            <Text style={styles.subheader}>
                Description 1 | Description 2
            </Text>
            <View style={styles.box} >
                <Pressable onPress={() => {
                    navigation.navigate("editProfile", {});
                    return console.log("Edit profile")
                }}>
                    <View style={styles.group}>
                        <Image
                            source={require('../assets/profile/editprofile.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.content}>Edit profile</Text>
                    </View>
                
                </Pressable> 
                
                <Pressable onPress={() => {
                    navigation.navigate("notification", {});
                    return console.log("Notifications")
                }}>
                    <View style={styles.group}>
                        <Image
                            source={require('../assets/profile/notification.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.content}>Notifications</Text>
                    </View>
                </Pressable>

                {/* <Pressable onPress={() => {
                    return console.log("Language")
                }}>
                    <View style={styles.group}>
                        <Image
                            source={require('../assets/profile/translate.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.content}>Language</Text>
                    </View>
                    
                </Pressable> */}

            </View>

            <View style={styles.box} >
                <Pressable onPress={() => {
                    navigation.navigate("tutorial", {});
                    return console.log("tutorial")
                }}>
                    <View style={styles.group}>
                        <Image
                            source={require('../assets/profile/support.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.content}>Tutorial</Text>
                    </View>
                
                </Pressable> 
                
                <Pressable onPress={() => {
                    navigation.navigate("contact", {});
                    return console.log("Contact")
                }}>
                    <View style={styles.group}>
                        <Image
                            source={require('../assets/profile/contact.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.content}>Contact us</Text>
                    </View>
                </Pressable>

                <Pressable onPress={() => {
                    navigation.navigate("privacy", {});
                }}>
                    <View style={styles.group}>
                        <Image
                            source={require('../assets/profile/privacy.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.content}>Privacy policy</Text>
                    </View>
                    
                </Pressable>

            </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        // marginTop: 50,
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
        borderRadius: 75
    },
    headers: {
        fontSize: 25,
        fontWeight: '700',
        fontFamily: "monospace",
        marginTop: -30,
        color: "white",

        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 2},
        textShadowRadius: 15,
    },
    subheader: {
        fontSize: 17,
        color: "white",

        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 2},
        textShadowRadius: 15,
    },
    box: {
        display: "flex",
        // flex: 1,
        width: 350,
        marginTop: 30,
        padding: 15,
        backgroundColor: "white",

        // shadow
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2,
        elevation: 5,
    },
    content: {
        // fontFamily: "monospace",
        fontSize: 17 ,
        fontWeight: "500",
        margin: 5,
    },
    icon: {
        display: "flex",
        top: 5,
        width: 25,
        height: 25,
        marginHorizontal: 5,
    },
    group: {
        flexDirection: "row",
        margin: 7,
    },
    gradientBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // opacity: 0.5
    },
});

export default ProfileScreen
