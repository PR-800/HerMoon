import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';

import * as Font from 'expo-font';

import firebase from "../data/firebaseDB";

class TutorialScreen extends Component {

    constructor() {
        super();
        this.state = {name: "", dob: new Date(), activeUser: null};
        
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    async componentDidMount() {
        await Font.loadAsync({
            MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
            MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
        });

        const accountDoc = firebase.firestore().collection("accounts")
        .doc(this.props.route.params.activeUser.key);

        accountDoc.get().then((res) => {
            if (res.exists) {
                const doc = res.data();
                this.setState({
                    key: res.id, 
                    name: doc.name, 
                });
            }
            else {
                console.log("Document does not exist");
            }
        });
    }

    render() {
        this.state.activeUser = this.props.route.params.activeUser;
        console.log("-- Tutorial ")
        console.log(this.state.activeUser)
        return (
            <View style={styles.screen}>
                <LinearGradient
                    colors={['#FC7D7B', '#9F79EB']}
                    style={styles.gradientBackground}
                >
                    <View style={styles.top}>
                        <Text>progress bar</Text>
                    </View>
    
                    <View style={styles.content}>
                        <Text style={styles.text}>{this.state.activeUser.key}</Text>
                        <TextInput 
                            style={styles.input} 
                            theme={{ 
                                roundness: 50, 
                                colors: { onSurfaceVariant: 'grey'} 
                            }} 
                            underlineColor="transparent"
                            activeUnderlineColor="grey"
                            textColor="black"

                            label="ชื่อ (สำหรับใช้แสดง)"
                            onChangeText={(val) => this.inputValueUpdate(val, "name")}
                            value={this.state.name}
                        />
                        
                        <TextInput 
                            style={styles.input} 
                            theme={{ 
                                roundness: 50, 
                                colors: { onSurfaceVariant: 'grey'} 
                            }} 
                            underlineColor="transparent"
                            activeUnderlineColor="grey"
                            textColor="black"

                            label="วันเกิด"
                            onChangeText={(val) => this.inputValueUpdate(val, "name")}
                            value={this.state.username}
                        />
                    </View>
    
                    <View style={styles.bottom}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => {
                                this.props.navigation.navigate("stepOne", {
                                    
                                });
                            }}
                        >
                            <Text style={styles.textButton}>เริ่มต้นใช้งาน</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity 
                            onPress={() => {
                                this.props.navigation.navigate("homePage", {
                                    screen: "Profile",
                                    params: {
                                        activeUser: this.state.activeUser,
                                    },
                                });
                            }}
                        >
                            <Text style={[styles.text, { 
                                top: 15,
                                fontSize: 15,
                                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                textShadowOffset: {width: -1, height: 2},
                                textShadowRadius: 15,
                            }]}>
                                Skip for now
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </LinearGradient>
            </View>
        );
    }
}

// const TutorialScreen = ({navigation, images}) => {

    // const [loaded] = useFonts({
    //     MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
    //     MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    // });

    // if (!loaded) {
    //     return null;
    // }
// };

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    top: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        height: "70%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    gradientBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "white",
        fontSize: 23,
        fontFamily: 'MitrRegular',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        width: 300,
        borderRadius: 50,
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 5,
    },
    textButton: {
        color:"#FF9B80", 
        fontSize: 20,
        fontFamily: 'MitrMedium',
    },
    bottom: {
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: 300,
        height: 55,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 50,
        overflow: 'hidden',
        paddingLeft: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 5,
    },
});
  
export default TutorialScreen;