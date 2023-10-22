import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, HelperText } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as Font from 'expo-font';

import firebase from "../data/firebaseDB";

class TutorialScreen extends Component {

    constructor() {
        super();
        this.state = {
            name: "", 
            height: null,
            weight: null,
            cycle: null, 
            freq: null,
            dob: null, 
            new_user: true,
            img: "",
            cycleList: [
                {
                    label: "20 - 23 วัน",
                    value: 20,
                },
                {
                    label: "24 - 27 วัน",
                    value: 24,
                },
                {
                    label: "28 - 31 วัน",
                    value: 28,
                },
                {
                    label: "32 - 35 วัน",
                    value: 32,
                },
            ],
            freqList: [
                {
                    label: "2 - 4 วัน",
                    value: 2,
                },
                {
                    label: "3 - 5 วัน",
                    value: 3,
                },
                {
                    label: "4 - 6 วัน",
                    value: 4,
                },
                {
                    label: "5 - 7 วัน",
                    value: 5,
                },
            ],
            cycleDropDown: false,
            freqDropDown: false,
            nameHelper: false,
            cycleHelper: false,
            freqHelper: false,
            activeUser: null,
            isDatePickerVisible: false,
        };
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

        { this.props.route.params.activeUser ? this.setState({ activeUser: this.props.route.params.activeUser }) : ""}
        console.log("-- Tutorial ")
        console.log(this.state.activeUser)

        const accountDoc = firebase.firestore().collection("accounts")
        .doc(this.props.route.params.activeUser ? this.props.route.params.activeUser.key : this.state.activeUser.key);

        accountDoc.get().then((res) => {
            if (res.exists) {
                const doc = res.data();
                this.setState({
                    key: res.id, 
                    name: doc.name, 
                    height: doc.height,
                    weight: doc.weight,
                    dob: doc.dob,
                    cycle: doc.periodCycle,
                    freq: doc.freq,
                    new_user: doc.new_user,
                    img: doc.img,
                });
            }
            else {
                console.log("Document does not exist");
            }
        });
    }

    getDate = () => {
        if (this.state.dob instanceof Date) {
            const day = this.state.dob.getDate();
            const month = this.state.dob.getMonth() + 1;
            const year = this.state.dob.getFullYear();
        
            const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
            return formattedDate;
        } 
        else {
            return '';
        }
    };

    updateAccount() {
        const accountDoc = firebase.firestore().collection("accounts")
        .doc(this.props.route.params.activeUser ? this.props.route.params.activeUser.key : this.state.activeUser.key);

        console.log("accDoc" + accountDoc)

        accountDoc
        .set({
            username: this.state.activeUser.username,
            password: this.state.activeUser.password,
            name: this.state.name, 
            height: this.state.height,
            weight: this.state.weight,
            dob: this.state.dob,
            periodCycle: this.state.cycle,
            freq: this.state.freq,
            new_user: false,
            img: this.state.img,
        })
    }

    render() {
        return (
            <View style={styles.screen}>
                <LinearGradient
                    colors={['#FC7D7B', '#9F79EB']}
                    style={styles.gradientBackground}
                >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.headerText}>ลงทะเบียน</Text>
                                <Text style={styles.headerText}>ข้อมูลผู้ใช้</Text>
                            </View>
                        </View>
                        {/* <Text style={styles.text}>{this.state.activeUser.key}</Text> */}
                        <View >
                            <TextInput 
                                style={styles.input} 
                                theme={{ 
                                    roundness: 50, 
                                    colors: { onSurfaceVariant: 'grey'} 
                                }} 
                                underlineColor="transparent"
                                activeUnderlineColor="grey"
                                textColor="black"

                                label="ชื่อที่แสดง"
                                onChangeText={(val) => this.inputValueUpdate(val, "name")}
                                value={this.state.name != null ? this.state.name : ""} 
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons 
                                    name={'information'} 
                                    size={24} 
                                    color="white"
                                    onPress={() => this.setState({ nameHelper: !this.state.nameHelper })}
                                    style={{ left: 24, marginTop: -5 }}
                                />
                                <HelperText type="info" visible={this.state.nameHelper}
                                    style={{ width: 250, fontFamily: "MitrRegular", color:"white", fontSize: 14, marginTop: -10, marginLeft: 18}}>
                                    ใช้สำหรับแสดงผลบนแอปพลิเคชัน สามารถเปลี่ยนแปลงได้ภายหลัง
                                </HelperText>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', marginBottom: 15, marginTop: -10}}>
                            <TextInput 
                                style={[styles.input, {width: 140, marginHorizontal: 10}]} 
                                theme={{ 
                                    roundness: 50, 
                                    colors: { onSurfaceVariant: 'grey'} 
                                }} 
                                underlineColor="transparent"
                                activeUnderlineColor="grey"
                                textColor="black"

                                label="ส่วนสูง (ซม.)"
                                onChangeText={(val) => this.inputValueUpdate(val, "height")}
                                value={this.state.height != null ? this.state.height + "" : ""}
                            />
                            <TextInput 
                                style={[styles.input, {width: 140, marginHorizontal: 10}]}
                                theme={{ 
                                    roundness: 50, 
                                    colors: { onSurfaceVariant: 'grey'} 
                                }} 
                                underlineColor="transparent"
                                activeUnderlineColor="grey"
                                textColor="black"
                                keyboardType = 'numeric'

                                label="นํ้าหนัก (กก.)"
                                onChangeText={(val) => this.inputValueUpdate(val, "weight")}
                                value={this.state.weight != null ? this.state.weight + "" : ""}
                            />
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                style={[styles.input, {marginTop: -5, width: 240}]} 
                                theme={{ 
                                    roundness: 50, 
                                    colors: { onSurfaceVariant: 'grey'} 
                                }} 
                                underlineColor="transparent"
                                activeUnderlineColor="grey"
                                textColor="black"
                                editable={false}

                                label="วันเกิด"
                                onChangeText={(val) => this.inputValueUpdate(val, "dob")}
                                value={this.state.dob != null ? this.state.dob + "" : ""} 
                            />
                            <MaterialCommunityIcons 
                                name={'calendar'} 
                                size={24} 
                                color="white"
                                onPress={() => this.setState({ isDatePickerVisible: true })}
                                style={{fontSize: 40, marginRight: 20,}}
                            />
                        </View>
                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => {
                                this.setState({ dob: date });
                                const format = this.getDate()
                                this.setState({ dob: format });
                                this.setState({ isDatePickerVisible: false });
                            }}
                            onCancel={() => {
                                this.setState({ isDatePickerVisible: false });
                            }}
                        />
                    
                        <View style={styles.smallDropdown}>
                            <DropDownPicker
                                style={styles.dropdownBox}
                                zIndex={20} 
                                placeholder='รอบเดือน'
                                open={this.state.cycleDropDown}
                                value={this.state.cycle}
                                items={this.state.cycleList}
                                setOpen={(cycleDropDown) => this.setState({ cycleDropDown })}
                                setValue={(valueCallback) => {
                                    const selectedValue = valueCallback();
                                    this.setState({ cycle: selectedValue });
                                    console.log("Selected value: " + selectedValue);
                                }}
                                placeholderStyle={{
                                    marginLeft: 10,
                                    fontSize: 16,
                                    color: 'grey',
                                }}
                                labelStyle={{
                                    marginLeft: 10,
                                    fontSize: 16,
                                }}
                                itemStyle={{
                                    marginLeft: 10,
                                    fontSize: 16,
                                }}
                            />
                            <View style={{ flexDirection: 'row'}}>
                                <MaterialCommunityIcons 
                                    name={'information'} 
                                    size={24} 
                                    color="white"
                                    onPress={() => this.setState({ cycleHelper: !this.state.cycleHelper })}
                                    style={{ left: 10, marginTop: 10}}
                                />
                                <HelperText type="info" visible={this.state.cycleHelper}
                                    style={{ fontFamily: "MitrRegular", color:"white", fontSize: 14, marginTop: 10, marginLeft: 5}}>
                                    ระยะห่างรอบเดือนแต่ละครั้ง
                                </HelperText>
                            </View>
                            
                        </View>
                        <View style={styles.smallDropdown}>
                            <DropDownPicker
                                style={styles.dropdownBox}
                                zIndex={10} 
                                placeholder='จำนวนวัน'
                                placeholderTextColor="grey"
                                open={this.state.freqDropDown}
                                value={this.state.freq}
                                items={this.state.freqList}
                                setOpen={(freqDropDown) => this.setState({ freqDropDown })}
                                setValue={(valueCallback) => {
                                    const selectedValue = valueCallback();
                                    this.setState({ freq: selectedValue });
                                    console.log("Selected value: " + selectedValue);
                                }}
                                placeholderStyle={{
                                    marginLeft: 10,
                                    fontSize: 16,
                                    color: 'grey',
                                }}
                                labelStyle={{
                                    marginLeft: 10,
                                    fontSize: 16,
                                }}
                                itemStyle={{
                                    marginLeft: 10,
                                    fontSize: 16,
                                }}
                            />
                            <View style={{ flexDirection: 'row'}}>
                                <MaterialCommunityIcons 
                                    name={'information'} 
                                    size={24} 
                                    color="white"
                                    onPress={() => this.setState({ freqHelper: !this.state.freqHelper })}
                                    style={{ left: 10, marginTop: 10}}
                                />
                                <HelperText type="info" visible={this.state.freqHelper}
                                    style={{ fontFamily: "MitrRegular", color:"white", fontSize: 14, marginTop: 10, marginLeft: 5}}>
                                    ระยะเวลาที่มีประจำเดือน
                                </HelperText>
                            </View>
                        </View> 
                    </View>

                    <View style={[styles.bottom, {zIndex: 20}]}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={() => {
                                if(this.state.name != "" && this.state.height != null && this.state.weight != null &&
                                    this.state.cycle != null && this.state.freq!= null && this.state.dob != null) {
                                    this.updateAccount()
                                    this.props.navigation.navigate("homePage", {
                                        screen: "Profile",
                                        params: {
                                            activeUser: this.state.activeUser,
                                        },
                                    });
                                }
                                else {
                                    alert("โปรดกรอกข้อมูลให้ครบถ้วน")
                                }
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
                        </TouchableOpacity>
                    </View>
                    
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
    content: {
        // height: "80%",
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
    header: {
        alignItems: "flex-start",
        width: "65%",
        marginBottom: 20,
    },
    headerText: {
        color: "white",
        fontSize: 50,
        fontFamily: 'MitrMedium',
        lineHeight: 60,
    },
    text: {
        color: "white",
        fontSize: 16,
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
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        top: 30,
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
    smallDropdown: {
        width: 300,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    dropdownBox: {
        height: 55,
        backgroundColor:"white",
        borderColor: "white",
        borderRadius: 50,
        paddingLeft: 10,

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