import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

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

            // modalChangePass
            modalVisible: false,
            usernameChecking: '',
            newPassword: '',
            confirmPassword: '',
            // oldPasswordShowing: true,
            newPasswordShowing: true,
            confirmPasswordShowing: true,

            name: "",
            img: '',
            height: null,
            weight: null,
            dob: null,
            periodCycle: 0,
            freq: null,
            new_user: true,
            detail: [],
            

        };
    }

    updateAccount = (thisKey) => {

        const accountDoc = firebase.firestore().collection("accounts")
        .doc(thisKey);
    
        accountDoc
        .update({
            username: this.state.usernameChecking,
            password: this.state.newPassword,
        })
        .then(() => {
            console.log("ข้อมูลถูกอัปเดตเรียบร้อย");
        })
        .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ", error);
        });
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    getCollection = (querySnapshot) => {
        querySnapshot.forEach((res) => {
            const { 
                username, 
                password, 
                new_user,
            } = res.data();
            this.state.all_data.push({ 
                key: res.id, 
                username, 
                password, 
                new_user,
            });
        });
    };

    componentDidMount() {
        this.prepareResources()
        this.unsubscribe = this.accountCollection.onSnapshot(this.getCollection);

        console.log(this.state.key, " key")
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
        let checkUsername = false;

        return (
            <View style={styles.screen}>
                <LinearGradient
                    colors={['#FC7D7B', '#9F79EB']}
                    style={styles.gradientBackground}
                >
                    <View style={styles.header}>
                        <Image
                            source={require('../assets/logo.png')}
                        />
                        <View>
                            <Text style={[styles.headerText, {
                                textShadowColor: '#9F79EB',
                                textShadowOffset: { width: 1, height: 0.5 },
                                textShadowRadius: 35,
                                marginTop: 15,
                            }]}>Her</Text>
                            <Text style={[styles.headerText, {
                                textShadowColor: '#9F79EB',
                                textShadowOffset: { width: 1, height: 0.5 },
                                textShadowRadius: 35,
                            }]}>Moon</Text>
                        </View>
                    </View>

                    <TextInput
                        style={[styles.input, { fontFamily: 'MitrRegular', }]}
                        theme={{
                            roundness: 50,
                            colors: { onSurfaceVariant: 'grey' },
                        }}
                        underlineColor="transparent"
                        activeUnderlineColor="grey"
                        textColor="black"

                        label="ชื่อผู้ใช้"
                        onChangeText={(val) => this.inputValueUpdate(val, "username")}
                        value={this.state.username}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.input}
                            theme={{
                                roundness: 50,
                                colors: { onSurfaceVariant: 'grey' }
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
                            style={{ position: 'absolute', right: 40, top: 30 }}
                        />
                    </View>

                    <TouchableOpacity 
                        onPress={() => {
                            this.setState((prevState) => ({
                                modalVisible: !prevState.modalVisible,
                            }));
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
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.state.all_data.map((item, i) => {
                                if (this.state.username === item.username && this.state.password === item.password) {
                                    console.log('valid')
                                    match = true
                                    
                                    if (item.new_user == false) {
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
                                console.log('!match')
                                Dialog.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</Text>,
                                    button: 'OK',
                                });
                            }
                            else {
                                console.log('match')
                                Dialog.show({
                                    type: ALERT_TYPE.SUCCESS,
                                    title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>เข้าสู่ระบบเรียบร้อย</Text>,
                                    button: 'OK',
                                });
                            }
                        }}
                    >
                        <Text style={styles.textButton}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>

                    {/* <HomeScreen user={this.state.activeUser} /> */}

                    <Text style={[styles.text, {
                            top: 15,
                            textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            textShadowOffset: { width: -1, height: 2 },
                            textShadowRadius: 15,
                        }]}>
                            ไม่มีบัญชีผู้ใช้ ?{" "}

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("register", {});
                        }}
                    >
                            <Text style={{...styles.text, 
                                top: 3,
                                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                textShadowOffset: { width: -1, height: 2 },
                                textShadowRadius: 15,
                                textDecorationLine: "underline"
                            }}>
                                สมัครสมาชิก
                            </Text>
                    </TouchableOpacity>
                    </Text>

                </LinearGradient>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    statusBarTranslucent={false}
                    onRequestClose={() => {
                        this.setState((prevState) => ({
                            modalVisible: !prevState.modalVisible,
                        }));
                        console.log('this.state.modalVisible :>> ', this.state.modalVisible);
                    }}>
                    <TouchableOpacity
                        style={styles.modalBackdrop}
                        activeOpacity={1}
                    >
                        <View style={[styles.modalView, { paddingVertical: 30 }]}>
                            <Text style={[styles.modalText, { marginVertical: 10 }]}>เปลี่ยนรหัสผ่าน</Text>

                            <View style={{ backgroundColor: 'white', borderRadius: 20, width: '90%', height: 275, alignSelf: 'center' }}>
                                {/* <ScrollView vertical showsVerticalScrollIndicator={false}> */}
                                <TextInput
                                    style={[styles.input, { alignSelf: 'center', width: 265 }]}
                                    theme={{
                                        roundness: 50,
                                        colors: { onSurfaceVariant: 'grey' }
                                    }}
                                    underlineColor="transparent"
                                    activeUnderlineColor="grey"
                                    label="ชื่อผู้ใช้"
                                    onChangeText={(text) => this.setState({ usernameChecking: text })}
                                    value={this.state.usernameChecking}
                                />

                                    <TextInput
                                        style={[styles.input, { alignSelf: 'center', width: 265 }]}
                                        theme={{
                                            roundness: 50,
                                            colors: { onSurfaceVariant: 'grey' }
                                        }}
                                        underlineColor="transparent"
                                        activeUnderlineColor="grey"
                                        label="รหัสผ่านใหม่"
                                        secureTextEntry={this.state.newPasswordShowing}
                                        onChangeText={(text) => this.setState({ newPassword: text })}
                                        value={this.state.newPassword}
                                    />
                                    <MaterialCommunityIcons
                                        name={this.state.newPasswordShowing ? 'eye-off' : 'eye'}
                                        size={25}
                                        color="#aaa"
                                        onPress={() => {
                                            this.setState((prevState) => ({
                                                newPasswordShowing: !prevState.newPasswordShowing,
                                            }));
                                        }}
                                        style={{ position: 'absolute', right: 30, top: 115 }}
                                    />

                                    <TextInput
                                        style={[styles.input, { alignSelf: 'center', width: 265 }]}
                                        theme={{
                                            roundness: 50,
                                            colors: { onSurfaceVariant: 'grey' }
                                        }}
                                        underlineColor="transparent"
                                        activeUnderlineColor="grey"
                                        label="ยืนยันรหัสผ่านใหม่"
                                        secureTextEntry={this.state.confirmPasswordShowing}
                                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                                        value={this.state.confirmPassword}
                                    />
                                    <MaterialCommunityIcons
                                        name={this.state.confirmPasswordShowing ? 'eye-off' : 'eye'}
                                        size={25}
                                        color="#aaa"
                                        onPress={() => {
                                            this.setState((prevState) => ({
                                                confirmPasswordShowing: !prevState.confirmPasswordShowing,
                                            }));
                                        }}
                                        style={{ position: 'absolute', right: 30, top: 200 }}
                                    />

                                {/* </ScrollView> */}
                            </View>

                            {/* Button */}
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable
                                    onPress={() => {
                                        var thisKey = "";
                                        this.state.all_data.map((item, i) => {
                                            console.log(this.state.usernameChecking + " + " + item.username)
                                            if (this.state.usernameChecking === item.username) {
                                                checkUsername = true
                                                console.log(item.key)
                                                this.setState({ key: item.key })
                                                thisKey = item.key
                                                console.log("key ", this.state.key)
                                            }
                                        })
                                        if (this.state.usernameChecking != "" && this.state.newPassword != "" && this.state.confirmPassword != "") {
                                            if (checkUsername === true) {
                                                if (this.state.newPassword == this.state.confirmPassword) {

                                                    console.log("thisKey ", thisKey)

                                                    this.updateAccount(thisKey)

                                                    this.setState({
                                                        usernameChecking: '',
                                                        oldPassword: '',
                                                        newPassword: '',
                                                        confirmPassword: '',
                                                    })

                                                    Dialog.show({
                                                        type: ALERT_TYPE.SUCCESS,
                                                        title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>เปลี่ยนรหัสผ่านสำเร็จ</Text>,
                                                        button: 'OK',
                                                    });

                                                }
                                                else {
                                                    Dialog.show({
                                                        type: ALERT_TYPE.WARNING,
                                                        title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>โปรดตรวจสอบความถูกต้องของข้อมูล</Text>,
                                                        button: 'OK',
                                                    });
                                                }
                                            }
                                            else {
                                                this.setState({
                                                    usernameChecking: '',
                                                    oldPassword: '',
                                                    newPassword: '',
                                                    confirmPassword: '',
                                                })

                                                Dialog.show({
                                                    type: ALERT_TYPE.WARNING,
                                                    title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>ขออภัย ไม่พบผู้ใช้ดังกล่าว</Text>,
                                                    button: 'OK',
                                                });
                                            }
                                        }
                                        else {
                                            Dialog.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>โปรดระบุข้อมูลให้ครบถ้วน</Text>,
                                                button: 'OK',
                                            });
                                        }

                                        this.setState((prevState) => ({
                                            modalVisible: !prevState.modalVisible,
                                        }));

                                    }}>

                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                        colors={['#9F79EB', '#FC7D7B',]}
                                        style={[styles.linearGradientModal, { width: 130, marginHorizontal: 10 }]}
                                    >
                                        <Text style={styles.buttonClose}>ยืนยัน</Text>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        this.setState({
                                            usernameChecking: '',
                                            oldPassword: '',
                                            newPassword: '',
                                            confirmPassword: '',
                                        })
                                        this.setState((prevState) => ({
                                            modalVisible: !prevState.modalVisible,
                                        }));
                                    }}>
                                    <View
                                        style={[styles.linearGradientModal, { width: 130, marginHorizontal: 10, backgroundColor: '#cfcaca', }]}
                                    >
                                        <Text style={[styles.buttonClose, {}]}>ยกเลิก</Text>
                                    </View>
                                </Pressable>

                            </View>


                        </View>

                    </TouchableOpacity>
                </Modal>

                {/* เรียกใช้ alert */}
                <AlertNotificationRoot>
                </AlertNotificationRoot>
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
        color: "#FF9B80",
        fontSize: 20,
        fontFamily: 'MitrMedium',
    },

    // modal zone
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%'
  },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//     borderRadius: 15,
//     width: 320,
//     // height: 55,
//     margin: 20,

//     justifyContent: 'center',
//     // alignItems: 'flex-start',
//     // overflow : "hidden",
//   },
  buttonOpen: {
    backgroundColor: '#e7e0ec',

  },
  buttonClose: {
    color: 'white',
    fontFamily: "MitrMedium",
    fontSize: 17,
  },
  linearGradientModal: {
    width: 250,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: 'black',
    fontFamily: "MitrMedium",
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 21,
    fontFamily: "MitrMedium",
  },
});

export default LoginScreen;