import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import * as Font from 'expo-font';

import firebase from "../data/firebaseDB";

class SignUpScreen extends Component {

    constructor() {
        super();
        this.accountCollection = firebase.firestore().collection("accounts");
        this.state = {
            username: "", 
            password: "", 
            confirmPassword: "", 
            img: '',
            all_data: [], 
            showPassword: true, 
            showConfirmPassword: true};
    }

    getCollection = (querySnapshot) => {
        querySnapshot.forEach((res) => {
            const { username } = res.data();
            this.state.all_data.push({ username });
        });
    };
       
    async componentDidMount() {
        await Font.loadAsync({
            MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
            MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
        });

        this.unsubscribe = this.accountCollection.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();    
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
            name: "",
            img: '',
            height: null,
            weight: null,
            dob: null,
            periodCycle: 0,
            new_user: true,
        })
        .then((res) => {
            this.setState({username: "", password: ""});
        });
    }

    render() {

        let match = false

        return (
            <View style={styles.screen}>
                <LinearGradient
                    colors={['#FC7D7B', '#9F79EB']}
                    style={styles.gradientBackground}
                >
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerText}>สมัคร</Text>
                            <Text style={styles.headerText}>สมาชิกใหม่</Text>
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

                            label="ยืนยันรหัสผ่าน"
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
                            this.state.all_data.map((item, i) => {
                                // console.log(this.state.username + " " + item.username)
                                if (this.state.username === item.username) {
                                    match = true
                                    
                                }
                            })  
                            if (this.state.username != "" && this.state.password != "" && this.state.confirmPassword != "") {
                                if (match === true) {
                                    Dialog.show({
                                        type: ALERT_TYPE.WARNING,
                                        title: (
                                            <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>ขออภัย ชื่อผู้ใช้นี้ถูกใช้แล้ว</Text>
                                        ),
                                        button: 'OK',
                                    });
                                }
                                else if ((this.state.password != this.state.confirmPassword)) {
                                    Dialog.show({
                                        type: ALERT_TYPE.WARNING,
                                        title: (
                                            <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>โปรดตรวจสอบความถูกต้องของข้อมูล</Text>
                                        ),
                                        button: 'OK',
                                    });
                                }
                                else {
                                    this.storeAccount()
                                    this.state.username = ""
                                    this.state.password = ""
                                    this.state.confirmPassword = ""
                                    Dialog.show({
                                        type: ALERT_TYPE.SUCCESS,
                                        title: (
                                            <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>สมัครสมาชิกสำเร็จ</Text>
                                        ),
                                        button: 'OK',
                                    });
                                    // alert("sssss")
                                    // this.props.navigation.navigate("login", {});
                                }
                            }
                            else {
                                Dialog.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: (
                                        <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>โปรดกรอกข้อมูลให้ครบถ้วน</Text>
                                    ),
                                    button: 'OK',
                                });
                            }
                        }}
                    >
                        <Text style={styles.textButton}>สมัครสมาชิก</Text>
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
                            มีบัญชีผู้ใช้อยู่แล้ว ?{" "}
                            <Text style={{ textDecorationLine: "underline"}}>
                                เข้าสู่ระบบ
                            </Text>
                        </Text>
                    </TouchableOpacity>
                        
                </LinearGradient>
                            {/* เรียกใช้ alert */}
            <AlertNotificationRoot>
            </AlertNotificationRoot>
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
        // flexDirection: "row",
        alignItems: "flex-start",
        width: "65%",
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