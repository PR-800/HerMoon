import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as Font from 'expo-font';

import firebase from "../data/firebaseDB";

class LoginScreen extends Component {

    constructor() {
        super();
        this.accountCollection = firebase.firestore().collection("accounts");
        this.state = {
            username: "", 
            password: "",
            all_data: [], 
            showPassword: true, 
            appIsReady: false, 
            activeUser: null,
        };
    }
       
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    getCollection = (querySnapshot) => {
        querySnapshot.forEach((res) => {
            const { username, password, new_user } = res.data();
            this.state.all_data.push({ key: res.id, username, password, new_user });
        });
    };

    componentDidMount() {
        this.prepareResources()
        this.unsubscribe = this.accountCollection.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();    
    }   

    prepareResources = async () => {
        await cacheAssets();
        this.setState({ appIsReady: true });
    };

    render() {

        if (!this.state.appIsReady) {
            return <Text>loading...</Text>;
        }

        let match = false;

        return (
            <View style={styles.screen}>
                <LinearGradient
                    colors={['#FC7D7B', '#9F79EB']}
                    style={styles.gradientBackground}
                >
                    <View style={styles.header}>
                        <Image
                            source={ require('../assets/logo.png') }
                        />
                        <View>
                            <Text style={[styles.headerText, {
                                textShadowColor: '#9F79EB',
                                textShadowOffset: {width: 1, height: 0.5},
                                textShadowRadius: 35,
                                marginTop: 15,
                            }]}>Her</Text>
                            <Text style={[styles.headerText, {
                                textShadowColor: '#9F79EB',
                                textShadowOffset: {width: 1, height: 0.5},
                                textShadowRadius: 35,
                            }]}>Moon</Text>
                        </View>
                    </View>
                    
                    <TextInput 
                        style={[styles.input, {fontFamily: 'MitrRegular',}]} 
                        theme={{ 
                            roundness: 50, 
                            colors: { onSurfaceVariant: 'grey'} ,
                        }} 
                        underlineColor="transparent"
                        activeUnderlineColor="grey"
                        textColor="black"
    
                        label="ชื่อผู้ใช้"
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
        
                            label="รหัสผ่าน"
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
    
                    {/* <TouchableOpacity 
                        onPress={() => {
                            // navigation.navigate("tutorial", {});
                            alert("นึกให้ออกสิ สู้ ๆ นะ")
                        }}
                    >
                        <Text style={[styles.text, { 
                                left: 80, 
                                bottom: 5,
                                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                textShadowOffset: {width: -1, height: 2},
                                textShadowRadius: 15,
                            }]}>
                            ลืมรหัสผ่าน
                        </Text>
                    </TouchableOpacity> */}
    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.state.all_data.map((item, i) => {
                                if (this.state.username === item.username && this.state.password === item.password) {
                                    match = true
                                    if(item.new_user == false) {
                                        this.props.navigation.navigate("homePage", {
                                            screen: "Profile",
                                            params: {
                                                activeUser: item,
                                            },
                                        });
                                    }
                                    else {
                                        this.props.navigation.navigate("tutorial", {
                                            activeUser: item,
                                        });
                                    }
                                    
                                    this.state.username = ""
                                    this.state.password = ""
                                    console.log('-- ActiveUser from Login : ', item);
                                } 
                            })  
                            if (!match) {
                                alert('Invalid username or password')
                            }                      
                        }}
                    >
                        <Text style={styles.textButton}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>

                    {/* <HomeScreen user={this.state.activeUser} /> */}
    
                    <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.navigate("register", {});
                        }}
                    >
                        <Text style={[styles.text, { 
                            top: 15,
                            textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            textShadowOffset: {width: -1, height: 2},
                            textShadowRadius: 15,
                        }]}>
                            ไม่มีบัญชีผู้ใช้ ?{" "}
                            <Text style={{ textDecorationLine: "underline"}}>
                                สมัครสมาชิก
                            </Text>
                        </Text>
                    </TouchableOpacity>
                        
                </LinearGradient>
            </View>
        );
    }
}

async function cacheAssets() {
    const fontAssets = cacheFonts([
        { "MitrMedium": require("../assets/fonts/Mitr-Medium.ttf") },
        { "MitrRegular": require("../assets/fonts/Mitr-Regular.ttf") },
    ]);
  
    await Promise.all([...fontAssets]);
}

function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
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
        fontSize: 55,
        lineHeight: 65,
        marginLeft: 30,
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
        fontFamily: 'MitrRegular',
        
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
        marginTop: 30,
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
  
export default LoginScreen;