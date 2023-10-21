import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// component สำหรับเลือกสีประจำเดือนที่ต้องการ
const MenstrualLevelModal = ({ visible, onClose, navigation }) => {
    const [dataColorModal, setDataColorModal] = useState(''); //เก็บข้อมูลสีประจำเดือนเพื่อนำไปแสดงหน้า Home

    const colors = [
        { value: 'สีแดงสด', hex: '#FF0000' },
        { value: 'สีแดงส้ม', hex: '#FD4400' },
        { value: 'สีแดงเข้ม', hex: '#BE0A01' },
        { value: 'สีชมพู', hex: '#FF97C5' },
        { value: 'สีน้ำตาล', hex: '#7A601C' },
        { value: 'สีแดงอมเทาปนเขียว', hex: '#576458' },
        { value: 'สีดำ', hex: 'black' },
    ];

    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.screen}>
                <LinearGradient colors={['#F77D80', '#FFEAEA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Image

                            source={require('../assets/Home/blood01-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.textHeader}>ระดับความเข้มของสี</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 20, width: 250, height: 300, paddingHorizontal: 10, paddingVertical: 20, alignSelf: 'center' }}>

                        {colors.map((color) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} key={color.value}>
                                <RadioButton
                                    value={color.value}
                                    status={dataColorModal === color.value ? 'checked' : 'unchecked'}
                                    onPress={() => setDataColorModal(color.value)}
                                    color={color.hex}
                                />
                                <Text style={styles.textNormal}>{color.value}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={{position:'absolute', bottom: 10, right: 10}}>
                        <TouchableOpacity onPress={() => {
                            setDataColorModal(dataColorModal)
                            navigation.navigate("Home", { dataColorModal });
                            console.log("dataColorModal to home =>", dataColorModal)
                        }}>
                            <Image

                                source={require('../assets/Home/save01-icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{position:'absolute', top: -30, right: 10 }}>
                        <TouchableOpacity onPress={onClose}>
                            <Image

                                source={require('../assets/Home/arrow-left-icon.png')}
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

export default MenstrualLevelModal;