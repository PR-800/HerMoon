import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MenstrualLevelModel from '../components/MenstrualLevelModel';
import MenstrualVolumeLevelModel from '../components/MenstrualVolumeLevelModel';
import NotesModel from '../components/NotesModel';
import CalendarStripC from '../components/CalendarStrip';
import moment from 'moment';
import { useFonts } from 'expo-font';

const HomeScreen = ({ navigation }) => {
    const [modalVisibleBlood, setModalVisibleBlood] = useState(false);
    const [modalVisibleSanitaryPad, setModalVisibleSanitaryPad] = useState(false);
    const [modalVisibleNotes, setModalVisibleNotes] = useState(false);

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

    return (
        <View style={styles.screen}>

            <CalendarStripC />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -140 }}>
                <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.todayborder}>
                    <Text style={styles.modalText01}>Today</Text>
                </LinearGradient>
                <Text style={[styles.modalText01, { paddingHorizontal: 22, color: 'black' }]}>{formatDate(date)}</Text>
            </View>

            <View style={[styles.leftAlignedText, { marginTop: 100 }]}>
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
                    style={[styles.image, { width: 60, height: 60 }]}
                /></Pressable>
            </View>

            <View style={{ marginTop: -40 }}>
                <Image
                    source={require('../assets/Home/Profile-icon.png')}
                    style={{ width: 280, height: 280 }}
                />
            </View>

            <View style={styles.groupimage}>
                <TouchableOpacity onPress={BloodIcon}>
                    <Image

                        source={require('../assets/Home/blood-icon.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <MenstrualLevelModel visible={modalVisibleBlood} onClose={BloodIcon} />
                <TouchableOpacity onPress={SanitaryPadIcon}>
                    <Image
                        source={require('../assets/Home/sanitarypad-icon.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <MenstrualVolumeLevelModel visible={modalVisibleSanitaryPad} onClose={SanitaryPadIcon} />
                <TouchableOpacity onPress={NotesIcon}>
                    <Image
                        source={require('../assets/Home/notes-icon.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <NotesModel visible={modalVisibleNotes} onClose={NotesIcon}></NotesModel>
                {/* <Pressable onPress={() => {
                    navigation.navigate("History", {});
                    return console.log("History")
                }}>
                
                    <Image
                        source={require('../assets/Home/history-icon.png')}
                        style={[styles.image, { width: 58, height: 58 }]}
                    />
                </Pressable> */}
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
    image: {
        width: 50,
        height: 50,
        marginHorizontal: 5, // ระยะห่างแนวนอนระหว่างรูปภาพ
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
});

export default HomeScreen;