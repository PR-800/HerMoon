import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MenstrualLevelModel from '../components/MenstrualLevelModel';
import MenstrualVolumeLevelModel from '../components/MenstrualVolumeLevelModel';
import NotesModel from '../components/NotesModel';
import CalendarStripC from '../components/CalendarStrip';
import moment from 'moment';

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
        return `${capitalizedMonth} ${year}`;
    }
    
    return (
        <View style={styles.screen}>
            <View style={{ marginTop: 20 }}>
            <CalendarStripC/>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -140 }}>
                <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.todayText}>
                    <Text style={{ fontSize: 24, color: "white", fontWeight: 'bold' }}>TODAY</Text>
                </LinearGradient>
                <Text style={{ fontSize: 24, fontWeight: 'bold', paddingHorizontal: 22 }}>{formatDate(date)}</Text>
            </View>

            <View style={[styles.leftAlignedText, { marginTop: 100 }]}>
                <Text style={{ fontSize: 15, color: "#8461D5", fontWeight: 'bold' }}>welcome</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Leslie Alexander</Text>
            </View>

            <View style={{ marginLeft: -250 }}>
                <Image
                    source={require('../assets/Home/clock-icon.png')}
                    style={styles.image}
                />
            </View>

            <View style={{marginTop: -50}}>
                <Image
                    source={require('../assets/Home/Profile-icon.png')}
                    style={{ width: 300, height: 300 }}
                />
            </View>

            <View style={{ marginLeft: 250, marginTop: -20 }}>
                <Image
                    source={require('../assets/Home/edit-icon.png')}
                    style={styles.image}
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    groupimage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    image: {
        width: 50,
        height: 50,
        marginHorizontal: 10, // ระยะห่างแนวนอนระหว่างรูปภาพ
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
    todayText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
    },
});

export default HomeScreen;