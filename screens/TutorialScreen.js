import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import * as Font from 'expo-font';

import firebase from "../data/firebaseDB";

class TutorialScreen extends Component {

    constructor() {
        super();
        this.accountCollection = firebase.firestore().collection("accounts");
    }

    async componentDidMount() {
        await Font.loadAsync({
            MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
            MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
        });
    }

    render() {
        // console.log(this.props.route.params.key)
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
                        <Text>tutorial details</Text>
                    </View>
    
                    <View style={styles.bottom}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => {
                                this.props.navigation.navigate("stepOne", {
                                    
                                });
                            }}
                        >
                            <Text style={styles.textButton}>Start tutorial</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity 
                            onPress={() => {
                                this.props.navigation.navigate("homePage", {
                                    key: this.props.route.params.key
                                });
                            }}
                        >
                            <Text style={[styles.text, { 
                                top: 15,
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
        fontSize: 15,
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
});
  
export default TutorialScreen;