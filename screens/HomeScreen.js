import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MenstrualLevelModel from '../components/MenstrualLevelModel';
import MenstrualVolumeLevelModel from '../components/MenstrualVolumeLevelModel';
import NotesModel from '../components/NotesModel';
import CalendarStripC from '../components/CalendarStrip';
import moment from 'moment';
import { useFonts } from 'expo-font';
import firebase from '../data/firebaseDB';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation, route }) => {
    const [modalVisibleBlood, setModalVisibleBlood] = useState(false);
    const [modalVisibleSanitaryPad, setModalVisibleSanitaryPad] = useState(false);
    const [modalVisibleNotes, setModalVisibleNotes] = useState(false);

    const [color_m, setColorM] = useState('เลือกสีประจำเดือน');
    const [volum_m, setVolumM] = useState('เลือกปริมาณประจำเดือน');
    const [note_m, setNoteM] = useState('ข้อมูลเพิ่มเติม');

    //เก็บค่าลงใน state
    useEffect(() => {
        if (route.params) {
            const { checked, checkedVL, notes } = route.params;
            if (checked) {
                setColorM(checked);
            }
            if (checkedVL) {
                setVolumM(checkedVL);
            }
            if (notes) {
                setNoteM(notes);
            }
        }
    }, [route.params]);

    const date = new Date();

    const BloodIcon = () => {
        setModalVisibleBlood(!modalVisibleBlood);
    };

    const SanitaryPadIcon = () => {
        setModalVisibleSanitaryPad(!modalVisibleSanitaryPad);
    };

    const NotesIcon = () => {
        setModalVisibleNotes(!modalVisibleNotes)
    }

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);
        const [month, day, year] = formattedDate.split(' ');
        const capitalizedMonth = month.toUpperCase();
        return `${month} ${year}`;
    }

    const [loaded] = useFonts({
        MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
        MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    const AddMonthlySummary = () => {
        // ข้อมูลที่ต้องการเพิ่ม
        const dataToAdd = {
            date: firebase.firestore.FieldValue.serverTimestamp(),
            menstrual_color: color_m,
            menstrual_volume: volum_m,
            menstrual_notes: note_m,
        };

        //สร้าง collection
        const databaseRef = firebase.firestore().collection("monthly_summary");

        // เพิ่มข้อมูลลง db
        databaseRef.add(dataToAdd)
            .then((docRef) => {
                console.log("เพิ่มข้อมูลสำเร็จ: ", docRef.id);
            })
            .catch((error) => {
                console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล: ", error);
            });
    }
    return (
        <View style={styles.screen}>
            <CalendarStripC />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -110 }}>
                <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.todayborder}>
                    <Text style={styles.modalText01}>Today</Text>
                </LinearGradient>
                <Text style={[styles.modalText01, { paddingHorizontal: 22, color: 'black' }]}>{formatDate(date)}</Text>
            </View>

            <View style={[styles.leftAlignedText, { marginTop: 80 }]}>
                <Text style={{ fontSize: 15, color: "#8461D5", fontFamily: 'MitrRegular', }}>Welcome</Text>
                <Text style={{ fontSize: 20, fontFamily: 'MitrRegular', }}>Leslie Alexander</Text>
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
            <Text style={styles.textF}>เพิ่มข้อมูลและบันทึกรอบเดือน</Text>
            <View style={{ marginTop: -40, marginBottom: 5, marginLeft: 250 }}>
                <TouchableOpacity onPress={AddMonthlySummary}>
                <Image
                                source={require('../assets/Home/save04-icon.png')}
                                style={{ width: 50, height: 50 }}
                            />
                </TouchableOpacity></View>

            <View>
                <TouchableOpacity onPress={BloodIcon}>
                    <View style={[styles.textBox, { flex: 0, flexDirection: 'row', borderColor: '#FFB4BF' }]}>
                        <View style={{ paddingTop: 2, paddingLeft: 10 }}>
                            <Image

                                source={require('../assets/Home/blood01-icon.png')}
                                style={{ width: 30, height: 35 }}
                            /></View>
                        <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                            <Text style={styles.textF}>{color_m}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <MenstrualLevelModel visible={modalVisibleBlood} onClose={BloodIcon} navigation={navigation} />
                <TouchableOpacity onPress={SanitaryPadIcon}>
                    <View style={[styles.textBox, { flex: 0, flexDirection: 'row', borderColor: '#89DCFF' }]}>
                        <View style={{ marginTop: -6 }}>
                            <Image
                                source={require('../assets/Home/sanitarypad01-icon.png')}
                                style={{ width: 45, height: 45 }}
                            />
                        </View>
                        <View style={{ paddingTop: 4, paddingLeft: 5 }}>
                            <Text style={styles.textF}>{volum_m}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <MenstrualVolumeLevelModel visible={modalVisibleSanitaryPad} onClose={SanitaryPadIcon} navigation={navigation} />
                <TouchableOpacity onPress={NotesIcon}>
                    <View style={[styles.textBox, { flex: 0, flexDirection: 'row', borderColor: '#B579CF' }]}>
                        <View style={{ paddingTop: 2, paddingLeft: 10 }}>
                            <Image
                                source={require('../assets/Home/notes02-icon.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                        <View style={{ paddingTop: 4, paddingLeft: 10 }}>
                            <Text style={styles.textF}>{note_m}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <NotesModel visible={modalVisibleNotes} onClose={NotesIcon} navigation={navigation}></NotesModel>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    groupimage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    leftAlignedText: {
        marginLeft: -180,
        marginBottom: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    todayborder: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
    modalText01: {
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
    textF: {
        fontFamily: 'MitrRegular',
        fontSize: 16
    },

});

export default HomeScreen;