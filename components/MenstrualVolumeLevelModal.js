import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// component สำหรับเลือกปริมาณประจำเดือนที่ต้องการ
const MenstrualVolumeLevelModel = ({ visible, onClose, navigation }) => {
    const [dataVolumeModel, setDataVolumeModel] = useState(''); //เก็บข้อมูลปริมาณประจำเดือนเพื่อนำไปแสดงหน้า Home
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.screen}>
                <LinearGradient colors={['#7ED8FF', '#CCF2FE']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ marginVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Image

                            source={require('../assets/Home/sanitarypad01-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.textHeader}>ระดับปริมาณของประจำเดือน</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 40, paddingBottom: 150, paddingHorizontal: 20, paddingTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="ปริมาณมาก"
                                status={dataVolumeModel === 'ปริมาณมาก' ? 'checked' : 'unchecked'}
                                onPress={() => setDataVolumeModel('ปริมาณมาก')}
                                color='#BE0A01'
                            />
                            <Text style={styles.textNormal} >ปริมาณมาก</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="ปริมาณปานกลาง (ปกติ)"
                                status={dataVolumeModel === 'ปริมาณปานกลาง (ปกติ)' ? 'checked' : 'unchecked'}
                                onPress={() => setDataVolumeModel('ปริมาณปานกลาง (ปกติ)')}
                                color='#FF0000'
                            />
                            <Text style={styles.textNormal} >ปริมาณปานกลาง (ปกติ)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="ปริมาณน้อย"
                                status={dataVolumeModel === 'ปริมาณน้อย' ? 'checked' : 'unchecked'}
                                onPress={() => setDataVolumeModel('ปริมาณน้อย')}
                                color='#F98585'
                            />
                            <Text style={styles.textNormal} >ปริมาณน้อย</Text>
                        </View>
                        {/* <Text> {dataVolume} </Text> */}
                    </View>
                    <View style={{position:'absolute', bottom: 10, right: 10}}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Home", {dataVolumeModel});
                            console.log("dataVolumeModel to home =>", dataVolumeModel)
                            onClose()
                        }}>
                            <Image
                                source={require('../assets/Home/save02-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{position:'absolute', top: -30, right: 10 }}>
                        <TouchableOpacity onPress={onClose}>
                            <Image

                                source={require('../assets/Home/arrow-left-icon.png')}
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
        height: 400
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'MitrMedium'
    },
    textNormal: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'MitrRegular'
    },
})

export default MenstrualVolumeLevelModel;