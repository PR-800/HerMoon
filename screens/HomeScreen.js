import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Button, ScrollView } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import firebase from '../data/firebaseDB';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';

//import component
import MenstrualLevelModal from '../components/MenstrualLevelModal';
import MenstrualVolumeLevelModel from '../components/MenstrualVolumeLevelModal';
import NotesModal from '../components/NotesModal';
import CalendarStripC from '../components/CalendarStrip';

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [activeUser, setActiveUser] = useState({});
    const [name, setName] = useState(); //เก็บชื่อที่ให้แสดง
    const [image, setImage] = useState(); //เก็บรูปปัจจุบัน
    const [dataImage, setDataImage] = useState(); //เก็บรุปที่อัพเดต

    const [modalVisibleBlood, setModalVisibleBlood] = useState(false); //เก็บค่า boolean เพื่อใช้ในการการเปิดและปิด component MenstrualLevelModal
    const [modalVisibleSanitaryPad, setModalVisibleSanitaryPad] = useState(false); //เก็บค่า boolean เพื่อใช้ในการการเปิดและปิด component MenstrualVolumeLevelModel
    const [modalVisibleNotes, setModalVisibleNotes] = useState(false); //เก็บค่า boolean เพื่อใช้ในการการเปิดและปิด component NotesModal

    const [colorM, setColorM] = useState('เลือกสีประจำเดือน'); //เก็บค่าสีของประจำเดือนที่ส่งผ่าน route
    const [volumM, setVolumM] = useState('เลือกปริมาณประจำเดือน'); //เก็บค่าปริมาณประจำเดือนที่ส่งผ่าน route
    const [notesM, setNoteM] = useState('บันทึกข้อมูลเพิ่มเติม'); //เก็บบันทึกข้อมูลเพิ่มเติมของประจำเดือนที่ส่งผ่าน route
    // console.log('notesM :>> ', notesM);

    const date = new Date(); //สำหรับแสดงวันที่

    //เก็บค่าลงใน state
    useEffect(() => {

        { route.params.activeUser ? setActiveUser(route.params.activeUser) : "" }
        // console.log("--- Home")
        // console.log(activeUser)

        if (route.params) {
            //ค่าที่ส่งมาจาก component ใช้ route.params ในการเอาค่ามาแสดง
            const { dataColorModal, dataVolumeModel, selectedTags } = route.params;
            if (dataColorModal) {
                setColorM(dataColorModal);
            }
            if (dataVolumeModel) {
                setVolumM(dataVolumeModel);
            }
            if (selectedTags) {
                setNoteM(selectedTags);
            }
        }

        if (route.params.activeUser) {
            const accountDoc = firebase.firestore().collection("accounts")
                .doc(route.params.activeUser.key);

            accountDoc.get().then((res) => {
                if (res.exists) {
                    const doc = res.data();
                    setName(doc.name);
                    setImage(doc.img)
                }
                else {
                    console.log("Document does not exist");
                }
            });
        }

        if (route.params.dataImage) {
            setDataImage(route.params.dataImage);
        }

    }, [route.params]);

    //สำหรับ open, close => MenstrualLevelModal
    const BloodIcon = () => {
        setModalVisibleBlood(!modalVisibleBlood);
    };

    //สำหรับ open, close => MenstrualVolumeLevelModel
    const SanitaryPadIcon = () => {
        setModalVisibleSanitaryPad(!modalVisibleSanitaryPad);
    };

    //สำหรับ open, close => NotesModal
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

        // สร้าง reference ไปยัง collection "dailyRecord"
        const databaseRef = firebase.firestore().collection("dailyRecord");

        //เรียกข้อมูลที่ตรงกับ formattedDate
        const query = databaseRef
            .where("date", "==", formattedDate)
            .where("user_id", "==", activeUser.key);

        // ดึงข้อมูลที่ตรงกับเงื่อนไข
        query.get().then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("ไม่พบข้อมูลที่ตรงกับวันที่ " + formattedDate);
                // ข้อมูลที่ต้องการเพิ่ม
                if (colorM == 'เลือกสีประจำเดือน' || volumM == 'เลือกปริมาณประจำเดือน') {
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: (
                            <Text style={styles.textNormal}>กรุณากรอกข้อมูลให้ครบถ้วน</Text>
                        ),
                        button: 'OK',
                    });
                }
                else {
                    if (notesM == 'บันทึกข้อมูลเพิ่มเติม') {
                        notesM = '';
                        // const dataToAdd = {
                        //     date: moment(desiredDate).format("DD/MM/YYYY"),
                        //     menstrual_color: colorM,
                        //     menstrual_volume: volumM,
                        //     menstrual_notes: null,
                        //     user_id: activeUser.key
                        // };
                    }
                    // else {
                    // }
                    const dataToAdd = {
                        date: moment(desiredDate).format("DD/MM/YYYY"),
                        menstrual_color: colorM,
                        menstrual_volume: volumM,
                        menstrual_notes: notesM,
                        user_id: activeUser.key
                    };
                    // () => {
                    //     // Call forceUpdate to trigger a re-render
                    //     this.forceUpdate();
                    // }
                    console.log("User Id")
                    console.log(activeUser.key)

                    //สร้าง collection
                    const databaseRef = firebase.firestore().collection("dailyRecord");

                    // เพิ่มข้อมูลลง firebase
                    databaseRef.add(dataToAdd)
                        .then((docRef) => {
                            // เรียก Dialog.show ที่นี่เพื่อแสดง Dialog หลังจากที่พบข้อมูลที่ตรงกัน
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
                    const data = doc.data();
                    // เรียก Dialog.show ที่นี่เพื่อแสดง Dialog หลังจากที่พบข้อมูลที่ตรงกัน
                    Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: (
                            <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>คุณได้เพิ่มรอบเดือนประจำวันแล้ว</Text>
                        ),
                        textBody: (
                            <Text style={{ fontFamily: 'MitrRegular', fontSize: 14 }}>หากคุณต้องการแก้ไขข้อมูล {'\n'} สามารถแก้ไขได้ที่หน้า Calendar ค่</Text>
                        ),
                        button: 'OK',
                    });
                    // console.log("มีข้อมูลที่ตรงกับวันที่นี้แล้ว", data);
                });
            }
        }).catch((error) => {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
        });
    }

    return (
        <View style={styles.screen}>

            <CalendarStripC />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -110 }}>
                <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.todayborder}>
                    <Text style={styles.textHeader}>Today</Text>
                </LinearGradient>
                <Text style={[styles.textHeader, { paddingHorizontal: 22, color: 'black' }]}>{formatDate(date)}</Text>
            </View>

            <View style={{ marginBottom: 20, marginTop: 80, width: '80%' }}>
                <Text style={{ fontSize: 15, color: "#8461D5", fontFamily: 'MitrRegular', }}>สวัสดี !</Text>
                <Text style={{ fontSize: 20, fontFamily: 'MitrRegular', left: 0 }}>
                    {/* {activeUser.username} */}
                    {name}
                </Text>
            </View>

            <View style={{ marginLeft: -250 }}>
                <Pressable onPress={() => {
                    navigation.navigate("History", {
                        activeUser: activeUser
                    });
                }}>
                    <Image
                        source={require('../assets/Home/clock-icon.png')}
                        style={[styles.image, { width: 50, height: 50 }]}
                    /></Pressable>
            </View>

            <View style={{ marginTop: -30, marginBottom: 20 }}>
                <Image
                    source={{ uri: dataImage ? dataImage : image}}
                    style={{ width: 230, height: 230, borderRadius: 115 }}
                />
            </View>


            <Text style={styles.textNormal}>บันทึกข้อมูลรอบเดือน</Text>
            <View style={{ marginTop: -40, marginBottom: 5, marginLeft: 250 }}>
                <TouchableOpacity onPress={AddMonthlySummary}>
                    <Image
                        source={require('../assets/Home/save04-icon.png')}
                        style={{ width: 50, height: 50, marginLeft: 10, }}
                    />
                </TouchableOpacity></View>

            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ marginBottom: 20 }}>
                    <TouchableOpacity onPress={BloodIcon}>
                        <View style={[styles.textBox, { height: 45, borderColor: '#FFB4BF' }]}>
                            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                <Image

                                    source={require('../assets/Home/blood01-icon.png')}
                                    style={{ width: 30, height: 35 }}
                                /></View>
                            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                <Text style={styles.textNormal}>{colorM}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <MenstrualLevelModal visible={modalVisibleBlood} onClose={BloodIcon} navigation={navigation} />
                    <TouchableOpacity onPress={SanitaryPadIcon}>
                        <View style={[styles.textBox, { height: 45, borderColor: '#89DCFF' }]}>
                            <View style={{ justifyContent: 'center' }}>
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
                        <View style={[styles.textBox, { borderColor: '#B579CF' }]}>
                            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                <Image
                                    source={require('../assets/Home/notes02-icon.png')}
                                    style={{ width: 30, height: 30 }}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', paddingLeft: 10, paddingRight: 5, flex: 1 }}>
                                <Text style={styles.textNormal}>
                                    {notesM == 'บันทึกข้อมูลเพิ่มเติม' || null ? 'บันทึกข้อมูลเพิ่มเติม' : notesM.map(note => `\u2022 ${note}`).join('\n')}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <NotesModal visible={modalVisibleNotes} onClose={NotesIcon} navigation={navigation}></NotesModal>
                </View>
            </ScrollView>
            {/* เรียกใช้ alert */}
            <AlertNotificationRoot>
            </AlertNotificationRoot>
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
        flex: 0, flexDirection: 'row',
        marginVertical: 4,
        backgroundColor: 'white',
        width: 300,
        // height: 45,
        borderRadius: 30,
        padding: 5,
        borderWidth: 1.5,
        textAlign: 'center'
    },
    textNormal: {
        fontFamily: 'MitrRegular',
        fontSize: 16
    },

});

export default HomeScreen;