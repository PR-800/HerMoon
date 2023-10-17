import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Font from 'expo-font';

import firebase from "../data/firebaseDB";

class SignUpScreen extends Component {

    constructor() {
        super();
        this.accountCollection = firebase.firestore().collection("accounts");
        this.state = {username: "", password: "", confirmPassword: "", showPassword: true, showConfirmPassword: true};
    }
       
    async componentDidMount() {
        await Font.loadAsync({
            MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
            MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
        });
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    storeAccount() {
        this.accountCollection.add({
            username: this.state.username,
            password: this.state.password,
        })
        .then((res) => {
            this.setState({username: "", password: ""});
        });
    }

    render() {

        return (
            <View style={styles.screen}>
                <LinearGradient
                    colors={['#FC7D7B', '#9F79EB']}
                    style={styles.gradientBackground}
                >
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerText}>Create</Text>
                            <Text style={styles.headerText}>an account</Text>
                        </View>
                    </View>

                    <TextInput 
                        style={styles.input} 
                        theme={{ 
                            roundness: 50, 
                            colors: { onSurfaceVariant: 'grey'} 
                        }} 
                        underlineColor="transparent"
                        activeUnderlineColor="grey"
                        textColor="black"

                        label="Username"
                        onChangeText={(val) => this.inputValueUpdate(val, "username")}
                        value={this.state.username}
                    />

                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                                style={styles.input} 
                                theme={{ 
                                    roundness: 50, 
                                    colors: { onSurfaceVariant: 'grey'} 
                                }} 
                                underlineColor="transparent"
                                activeUnderlineColor="grey"
                                textColor="black"
                                secureTextEntry={this.state.showPassword} 

                                label="Password"
                                onChangeText={(val) => this.inputValueUpdate(val, "password")}
                                value={this.state.password}
                            />
                            <MaterialCommunityIcons 
                                name={this.state.showPassword ? 'eye-off' : 'eye'} 
                                size={24} 
                                color="#aaa"
                                onPress={() => this.setState({ showPassword: !this.state.showPassword })} 
                                style={{position:'absolute', right: 40, top: 30}}
                            />
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                            style={styles.input} 
                            theme={{ 
                                roundness: 50, 
                                colors: { onSurfaceVariant: 'grey'} 
                            }} 
                            underlineColor="transparent"
                            activeUnderlineColor="grey"
                            textColor="black"
                            secureTextEntry={this.state.showConfirmPassword}

                            label="Confirm Password"
                            onChangeText={(val) => this.inputValueUpdate(val, "confirmPassword")}
                            value={this.state.confirmPassword}
                        />
                        <MaterialCommunityIcons 
                            name={this.state.showConfirmPassword ? 'eye-off' : 'eye'} 
                            size={24} 
                            color="#aaa"
                            onPress={() => this.setState({ showConfirmPassword: !this.state.showConfirmPassword })} 
                            style={{position:'absolute', right: 40, top: 30}}
                        />
                    </View>
                    

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            if ((this.state.password === this.state.confirmPassword) && this.state.username != "" && this.state.password != "" && this.state.confirmPassword != "") {
                                this.storeAccount()
                                alert('Sign Up Successfully')
                                this.props.navigation.navigate("login", {});
                            }
                            else {
                                alert('Invalid username or password')
                            }
                        }}
                    >
                        <Text style={styles.textButton}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.navigate("login", {});
                        }}
                    >
                        <Text style={[styles.text, { 
                            top: 15,
                            textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            textShadowOffset: {width: -1, height: 2},
                            textShadowRadius: 15,
                        }]}>
                            Have an account already? {" "}
                            <Text style={{ textDecorationLine: "underline"}}>
                                Login
                            </Text>
                        </Text>
                    </TouchableOpacity>
                        
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
    },
    headerText: {
        fontSize: 50,
        lineHeight: 60,
        color: "white",
        fontFamily: 'MitrMedium',
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
        marginTop: 40,
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
    }
});
  
export default SignUpScreen;