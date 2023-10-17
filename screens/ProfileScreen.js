import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Pressable  } from 'react-native';
import { Button } from 'react-native-web';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts } from 'expo-font';

import firebase from "../data/firebaseDB";
import { Icon } from '@iconify/react';

class ProfileScreen extends Component {

    constructor() {
        super();
        this.accountCollection = firebase.firestore().collection("accounts");
        // this.state = {data};
    }

    componentDidMount() {

        const accountDoc = firebase.firestore().collection("accounts")
        // .doc(this.props.route.params.key);

        console.log(this.props.route)

        // subjDoc.get().then((res) => {
        //         const subj = res.data();
        //         this.setState({
        //             key: res.id, 
        //             id: subj.id,
        //             name: subj.name, 
        //             GPA: subj.GPA,
        //         });
        //     }
        //     else {
        //         console.log("Document does not exist");
        //     }
        // });
    }
    // inputValueUpdate = (val, prop) => {
    //     const state = this.state;
    //     state[prop] = val;
    //     this.setState(state);
    // };

    // getCollection = (querySnapshot) => {
    //     querySnapshot.forEach((res) => {
    //         const { username, password } = res.data();
    //         this.state.all_data.push({ key: res.id, username, password });
    //     });
    // };

    // componentDidMount() {
    //     this.unsubscribe = this.accountCollection.onSnapshot(this.getCollection);
    // }

    // componentWillUnmount() {
    //     this.unsubscribe();    
    // }   

    // findAccount() {
    //     this.state.all_data.map((item, i) => {
    //         console.log(item)
    //     })
    // }

    // storeAccount() {
    //     this.accountCollection.add({
    //         username: this.state.username,
    //         password: this.state.password,
    //     })
    //     .then((res) => {
    //         this.setState({username: "", password: ""});
    //     });
    // }

    render() {
        const {navigation} = this.props
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

                    <View style={{...styles.logoutButton, justifyContent: 'flex-end'}}>
                        <Pressable onPress={() => {
                            // navigation.navigate("privacy", {});
                        }}>
                            <View style={styles.group}>
                                <Image
                                    source={require('../assets/profile/logout.png')}
                                    style={styles.icon}
                                />
                                <Text style={{...styles.content, color:'white'}}>Logout</Text>
                            </View>
                            
                        </Pressable>
                    </View>


                </LinearGradient>
            </View>
        )
    }
}

// const ProfileScreen = ({ route, navigation }) => {

//     const [loaded] = useFonts({
//         MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
//         MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
//     });

//     if (!loaded) {
//         return null;
//     }

// }

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 150, 
        height: 150, 
        resizeMode: "contain", 
        // borderRadius: "50%",
        borderRadius: 75,
        marginTop: 20,
    },
    headers: {
        fontSize: 25,
        fontFamily: "MitrMedium",
        marginTop: -40,
        margin: 3,
        color: "white",

        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 2},
        textShadowRadius: 15,
    },
    subheader: {
        fontSize: 17,
        color: "white",
        fontFamily: "MitrRegular",

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
        fontFamily: "MitrRegular",
        margin: 4,
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
    gradientNavbar: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
    },
    logoutButton: {
        marginTop: 25, paddingHorizontal: 10, backgroundColor: '#E67B95', borderRadius: 25,
        // shadow
        // borderWidth: 2,
        // borderColor: "black",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2,
        elevation: 5,
    }
});

export default ProfileScreen
