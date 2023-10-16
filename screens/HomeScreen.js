import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import firebase from '../data/firebaseDB';
import moment from 'moment';

//import component
import MenstrualLevelModel from '../components/MenstrualLevelModel';
import MenstrualVolumeLevelModel from '../components/MenstrualVolumeLevelModel';
import NotesModel from '../components/NotesModel';
import CalendarStripC from '../components/CalendarStrip';



const HomeScreen = ({ navigation, route }) => {
    const [modalVisibleBlood, setModalVisibleBlood] = useState(false); //เก็บค่า boolean เพื่อใช้ในการการเปิดและปิด component MenstrualLevelModel
    const [modalVisibleSanitaryPad, setModalVisibleSanitaryPad] = useState(false); //เก็บค่า boolean เพื่อใช้ในการการเปิดและปิด component MenstrualVolumeLevelModel
    const [modalVisibleNotes, setModalVisibleNotes] = useState(false); //เก็บค่า boolean เพื่อใช้ในการการเปิดและปิด component NotesModel

    const [colorM, setColorM] = useState('เลือกสีประจำเดือน'); //เก็บค่าสีของประจำเดือนที่ส่งผ่าน route
    const [volumM, setVolumM] = useState('เลือกปริมาณประจำเดือน'); //เก็บค่าปริมาณประจำเดือนที่ส่งผ่าน route
    const [notesM, setNoteM] = useState('ข้อมูลเพิ่มเติม'); //เก็บข้อมูลเพิ่มเติมของประจำเดือนที่ส่งผ่าน route

    const date = new Date(); //สำหรับแสดงวันที่
    //เก็บค่าลงใน state
    useEffect(() => {
        if (route.params) {
            //ค่าที่ส่งมาจาก component ใช้ route.params ในการเอาค่ามาแสดง
            const { dataColorModel, dataVolumeModel, dataNotesModel } = route.params;
            if (dataColorModel) {
                setColorM(dataColorModel);
            }
            if (dataVolumeModel) {
                setVolumM(dataVolumeModel);
            }
            if (dataNotesModel) {
                setNoteM(dataNotesModel);
            }
        }
    }, [route.params]);

    //สำหรับ open, close => MenstrualLevelModel
    const BloodIcon = () => {
        setModalVisibleBlood(!modalVisibleBlood);
    };

    //สำหรับ open, close => MenstrualVolumeLevelModel
    const SanitaryPadIcon = () => {
        setModalVisibleSanitaryPad(!modalVisibleSanitaryPad);
    };

    //สำหรับ open, close => NotesModel
    const NotesIcon = () => {
        setModalVisibleNotes(!modalVisibleNotes)
    }

    //จัด format วันที่
    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);
        const [month, day, year] = formattedDate.split(' ');
        const capitalizedMonth = month.toUpperCase();
        return `${month} ${year}`;
    }

    //เรียกใช้ฟ้อนต์
    const [loaded] = useFonts({
        MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
        MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    const AddMonthlySummary = () => {
    // สร้างวันที่
    const desiredDate = new Date();
    const formattedDate = moment(desiredDate).format("DD/MM/YYYY");

    // สร้าง reference ไปยัง collection "monthly_summary"
    const databaseRef = firebase.firestore().collection("monthly_summary");

    //เรียกข้อมูลที่ตรงกับ formattedDate
    const query = databaseRef.where("date", "==", formattedDate);

    // ดึงข้อมูลที่ตรงกับเงื่อนไข
    query.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log("ไม่พบข้อมูลที่ตรงกับวันที่ " + formattedDate);
            // ข้อมูลที่ต้องการเพิ่ม
            const dataToAdd = {
                date: moment(desiredDate).format("DD/MM/YYYY"),
                menstrual_color: colorM,
                menstrual_volume: volumM,
                menstrual_notes: notesM,
            };

            //สร้าง collection
            const databaseRef = firebase.firestore().collection("monthly_summary");

            // เพิ่มข้อมูลลง firebase
            databaseRef.add(dataToAdd)
                .then((docRef) => {
                    console.log("เพิ่มข้อมูลสำเร็จ: ", docRef.id);
                })
                .catch((error) => {
                    console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล: ", error);
                });
        } else {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log("มีข้อมูลที่ตรงกับวันที่นี้แล้ว", data);
            });
        }
    }).catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
    });}

    return (
        <View style={styles.screen}>
            <CalendarStripC />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -110 }}>
                <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.todayborder}>
                    <Text style={styles.textHeader}>Today</Text>
                </LinearGradient>
                <Text style={[styles.textHeader, { paddingHorizontal: 22, color: 'black' }]}>{formatDate(date)}</Text>
            </View>

            <View style={{ marginLeft: -180, marginBottom: 20, marginTop: 80 }}>
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

            <Text style={styles.textNormal}>เพิ่มข้อมูลและบันทึกรอบเดือน</Text>
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
                            <Text style={styles.textNormal}>{colorM}</Text>
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
                            <Text style={styles.textNormal}>{volumM}</Text>
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
                            <Text style={styles.textNormal}>{notesM}</Text>
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