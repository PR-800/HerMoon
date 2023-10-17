import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import firebase from '../data/firebaseDB';
import moment from 'moment';

// Import component
import MenstrualLevelModel from '../components/MenstrualLevelModel';
import MenstrualVolumeLevelModel from '../components/MenstrualVolumeLevelModel';
import NotesModel from '../components/NotesModel';
import CalendarStripC from '../components/CalendarStrip';

class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            modalVisibleBlood: false,
            modalVisibleSanitaryPad: false,
            modalVisibleNotes: false,
            colorM: 'เลือกสีประจำเดือน',
            volumM: 'เลือกปริมาณประจำเดือน',
            notesM: 'ข้อมูลเพิ่มเติม',

            //Fluk
            key: "",
            username: "",
        };
    }


    //Fluk
    componentDidMount() {
        const accountDoc = firebase

            .firestore()
            .collection("accounts")
            .doc(this.props.route.params.key);
        console.log("this.props.root.params()", this.props.route.params.key)
        accountDoc.get().then((res) => {
            if (res.exists) {
                const account = res.data();
                this.setState({
                    key: res.id,
                    username: account.username,
                });
                console.log('account.username : ', this.state.username)
            } else {
                console.log("Document does not exist!!");
            }
        });
    }
    

    componentDidMount() {
        
        // const { key, username } = this.props.route.params;

        // const accountDoc = firebase
        //     .firestore()
        //     .collection("accounts")
        //     .doc(key);

        // console.log("Key received in HomeScreen:", key);
        // console.log("Username received in HomeScreen:", username);

        // accountDoc.get().then((res) => {
        //     if (res.exists) {
        //         const account = res.data();
        //         this.setState({
        //             key: res.id,
        //             username: account.username,
        //         });
        //         console.log('account.username : ', this.state.username);
        //     } else {
        //         console.log("Document does not exist!!");
        //     }
        // });

        
        // Check if route.params is available and set state accordingly
        if (this.props.route.params) {
            const { dataColorModel, dataVolumeModel, dataNotesModel } = this.props.route.params;
            if (dataColorModel) {
                this.setState({ colorM: dataColorModel });
            }
            if (dataVolumeModel) {
                this.setState({ volumM: dataVolumeModel });
            }
            if (dataNotesModel) {
                this.setState({ notesM: dataNotesModel });
            }
        }
    }

    BloodIcon = () => {
        this.setState({ modalVisibleBlood: !this.state.modalVisibleBlood });
    };

    SanitaryPadIcon = () => {
        this.setState({ modalVisibleSanitaryPad: !this.state.modalVisibleSanitaryPad });
    };

    NotesIcon = () => {
        this.setState({ modalVisibleNotes: !this.state.modalVisibleNotes });
    }

    formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);
        const [month, day, year] = formattedDate.split(' ');
        const capitalizedMonth = month.toUpperCase();
        return `${month} ${year}`;
    }

    AddMonthlySummary = () => {
        const desiredDate = new Date();
        const formattedDate = moment(desiredDate).format("DD/MM/YYYY");
        const databaseRef = firebase.firestore().collection("monthly_summary");
        const query = databaseRef.where("date", "==", formattedDate);

        query.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                if (this.state.colorM == 'เลือกสีประจำเดือน' || this.state.volumM == 'เลือกปริมาณประจำเดือน' || this.state.notesM == 'ข้อมูลเพิ่มเติม') {
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: (
                            <Text style={styles.textNormal}>กรุณากรอกข้อมูลให้ครบถ้วน</Text>
                        ),
                        button: 'OK',
                    });
                } else {
                    const dataToAdd = {
                        date: moment(desiredDate).format("DD/MM/YYYY"),
                        menstrual_color: this.state.colorM,
                        menstrual_volume: this.state.volumM,
                        menstrual_notes: this.state.notesM,
                    };

                    const databaseRef = firebase.firestore().collection("monthly_summary");

                    databaseRef.add(dataToAdd)
                        .then((docRef) => {
                            Dialog.show({
                                type: ALERT_TYPE.SUCCESS,
                                title: (
                                    <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>เพิ่มข้อมูลรอบเดือนประจำวันสำเร็จ</Text>
                                ),
                                button: 'OK',
                            });
                            console.log("เพิ่มข้อมูลสำเร็จ: ", docRef.id);
                        })
                        .catch((error) => {
                            console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล: ", error);
                        });
                }
            } else {
                querySnapshot.forEach((doc) => {
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: (
                            <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>คุณได้เพิ่มรอบเดือนประจำวันแล้ว</Text>
                        ),
                        textBody: (
                            <Text style={{ fontFamily: 'MitrRegular', fontSize: 14 }}>หากคุณต้องการแก้ไขข้อมูล {'\n'} สามารถแก้ไขได้ที่หน้า Calendar ค่ะ</Text>
                        ),
                        button: 'OK',
                    });
                });
            }
        }).catch((error) => {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
        });
    }

    render() {
        const {navigation} = this.props
        console.log("Home: " + this.props.route.params)
        return (
            <View style={styles.screen}>
    
                <CalendarStripC />
    
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -110 }}>
                    <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.todayborder}>
                        <Text style={styles.textHeader}>Today</Text>
                    </LinearGradient>
                    <Text style={[styles.textHeader, { paddingHorizontal: 22, color: 'black' }]}>{this.formatDate(new Date())}</Text>
                </View>
    
                <View style={{ marginLeft: -180, marginBottom: 20, marginTop: 80 }}>
                    <Text style={{ fontSize: 15, color: "#8461D5", fontFamily: 'MitrRegular', }}>Welcome</Text>
                    <Text style={{ fontSize: 20, fontFamily: 'MitrRegular', }}>
                        {this.state.username}
                    </Text>
                </View>
    
                <View style={{ marginLeft: -250 }}>
                    <Pressable onPress={() => {
                        navigation.navigate("History", {});
                        return console.log("History")
                    }}>
                        <Image
                            source={require('../assets/Home/clock-icon.png')}
                            style={[styles.image, { width: 50, height: 50 }]}
                        /></Pressable>
                </View>
    
                <View style={{ marginTop: -40, marginBottom: 10 }}>
                    <Image
                        source={require('../assets/Home/Profile-icon.png')}
                        style={{ width: 240, height: 240 }}
                    />
                </View>
    
                <Text style={styles.textNormal}>เพิ่มข้อมูลและบันทึกรอบเดือน</Text>
                <View style={{ marginTop: -40, marginBottom: 5, marginLeft: 250 }}>
                    <TouchableOpacity onPress={this.AddMonthlySummary}>
                        <Image
                            source={require('../assets/Home/save04-icon.png')}
                            style={{ width: 50, height: 50 }}
                        />
                    </TouchableOpacity></View>
    
                <View>
                    <TouchableOpacity onPress={this.BloodIcon}>
                        <View style={[styles.textBox, { flex: 0, flexDirection: 'row', borderColor: '#FFB4BF' }]}>
                            <View style={{ paddingTop: 2, paddingLeft: 10 }}>
                                <Image
    
                                    source={require('../assets/Home/blood01-icon.png')}
                                    style={{ width: 30, height: 35 }}
                                /></View>
                            <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                                <Text style={styles.textNormal}>{this.state.colorM}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <MenstrualLevelModel visible={this.state.modalVisibleBlood} onClose={this.BloodIcon} navigation={navigation} />
                    <TouchableOpacity onPress={this.SanitaryPadIcon}>
                        <View style={[styles.textBox, { flex: 0, flexDirection: 'row', borderColor: '#89DCFF' }]}>
                            <View style={{ marginTop: -6 }}>
                                <Image
                                    source={require('../assets/Home/sanitarypad01-icon.png')}
                                    style={{ width: 45, height: 45 }}
                                />
                            </View>
                            <View style={{ paddingTop: 4, paddingLeft: 5 }}>
                                <Text style={styles.textNormal}>{this.state.volumM}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <MenstrualVolumeLevelModel visible={this.state.modalVisibleSanitaryPad} onClose={this.SanitaryPadIcon} navigation={navigation} />
                    <TouchableOpacity onPress={this.NotesIcon}>
                        <View style={[styles.textBox, { flex: 0, flexDirection: 'row', borderColor: '#B579CF' }]}>
                            <View style={{ paddingTop: 2, paddingLeft: 10 }}>
                                <Image
                                    source={require('../assets/Home/notes02-icon.png')}
                                    style={{ width: 30, height: 30 }}
                                />
                            </View>
                            <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                                <Text style={styles.textNormal}>{this.state.notesM}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <NotesModel visible={this.state.modalVisibleNotes} onClose={this.NotesIcon} navigation={navigation}></NotesModel>
                </View>
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
        backgroundColor: "white",
    },
    todayborder: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'MitrRegular',
        color: 'white'
    },
    textBox: {
        margin: 4,
        backgroundColor: 'white',
        width: 300,
        height: 45,
        borderRadius: 30,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
    },
    textNormal: {
        fontFamily: 'MitrRegular',
        fontSize: 16
    },

});

export default HomeScreen;