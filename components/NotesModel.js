import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity } from 'react-native';;
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';

// component สำหรับบันทึกข้อมูลเพิ่มเติมของประจำเดือน
const NotesModel = ({ visible, onClose, navigation }) => {
    const [dataNotesModel, setDataNotesModel] = useState(''); //เก็บข้อมูลเพิ่มเติมของประจำเดือนเพื่อนำไปแสดงหน้า Home
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.screen}>
                <LinearGradient colors={['#BF89FF', '#E8D9F1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 25, flexDirection: 'row', alignItems: 'center' }}>
                        <Image

                            source={require('../assets/Home/notes01-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.textHeader}> บันทึกข้อมูลเพิ่มเติม</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 40, paddingBottom: 150, paddingHorizontal: 20, paddingTop: 30 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='อาการปวดท้องรุนแรง'
                                status={dataNotesModel === 'อาการปวดท้องรุนแรง' ? 'checked' : 'unchecked'}
                                onPress={() => setDataNotesModel('อาการปวดท้องรุนแรง')}
                                color='#FF0000'
                            />
                            <Text style={styles.textNormal}>อาการปวดท้องรุนแรง</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='ประจำเดือนมาหลายวันเกินไป'
                                status={dataNotesModel === 'ประจำเดือนมาหลายวันเกินไป' ? 'checked' : 'unchecked'}
                                onPress={() => setDataNotesModel('ประจำเดือนมาหลายวันเกินไป')}
                                color='#FF0000'
                            />
                            <Text style={styles.textNormal}>ประจำเดือนมาหลายวันเกินไป</Text>
                        </View>
                        {/* <Text> {dataNotesModel} </Text> */}
                    </View>
                    
                    <View style={{ marginLeft: 140, marginTop: -70 }}>
                        <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Home", { dataNotesModel });
                            return console.log("dataNotesModel to home =>", dataNotesModel)
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
    screen: {
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
    textHeader: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'MitrMedium'
    },
    textNormal: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'MitrRegular',
    },
})

export default NotesModel;