import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, Image, TouchableOpacity } from 'react-native';;
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';
const NotesModel = ({ visible, onClose, navigation }) => {
    const [text, setText] = useState('');
    const [notes, setNotes] = React.useState(''); //initial choice
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <LinearGradient colors={['#BF89FF', '#E8D9F1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 25, flexDirection: 'row', alignItems: 'center' }}>
                        <Image

                            source={require('../assets/Home/notes01-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.modalText}> บันทึกข้อมูลเพิ่มเติม</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 40, paddingBottom: 150, paddingHorizontal: 20, paddingTop: 30 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='อาการปวดท้องรุนแรง'
                                status={notes === 'อาการปวดท้องรุนแรง' ? 'checked' : 'unchecked'}
                                onPress={() => setNotes('อาการปวดท้องรุนแรง')}
                                color='#FF0000'
                            />
                            <Text style={styles.modalText01}>อาการปวดท้องรุนแรง</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='ประจำเดือนมาหลายวันเกินไป'
                                status={notes === 'ประจำเดือนมาหลายวันเกินไป' ? 'checked' : 'unchecked'}
                                onPress={() => setNotes('ประจำเดือนมาหลายวันเกินไป')}
                                color='#FF0000'
                            />
                            <Text style={styles.modalText01}>ประจำเดือนมาหลายวันเกินไป</Text>
                        </View>
                        {/* <Text> {notes} </Text> */}
                    </View>
                    
                    <View style={{ marginLeft: 140, marginTop: -70 }}>
                        <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Home", { notes });
                            return console.log("Home =>", notes)
                        }}
                        >
                            <Image
                                source={require('../assets/Home/save03-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 190, marginTop: -250 }}>
                        <TouchableOpacity onPress={onClose}>
                            <Image

                                source={require('../assets/Home/arrow-left-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 110, marginTop: -30 }}>
                        <TouchableOpacity>
                            <Image

                                source={require('../assets/Home/question-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </Modal>)
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalView: {
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300,
        height: 350
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'MitrMedium'
    },
    input: {
        height: 100,
        width: 180,
      },
      modalText01: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'MitrRegular',
    },
})

export default NotesModel;