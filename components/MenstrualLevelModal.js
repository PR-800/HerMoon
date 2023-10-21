import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// component สำหรับเลือกสีประจำเดือนที่ต้องการ
const MenstrualLevelModal = ({ visible, onClose, navigation }) => {
    const [dataColorModal, setDataColorModal] = useState(''); //เก็บข้อมูลสีประจำเดือนเพื่อนำไปแสดงหน้า Home
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
                    <View style={{ backgroundColor: 'white', borderRadius: 40, padding: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงสด'
                                status={dataColorModal === 'สีแดงสด' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColorModal('สีแดงสด')}
                                color='#FF0000'
                            />
                            <Text style={styles.textNormal}>สีแดงสด</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงส้ม'
                                status={dataColorModal === 'สีแดงส้ม' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColorModal('สีแดงส้ม')}
                                color='#FD4400'
                            />
                            <Text style={styles.textNormal}>สีแดงส้ม</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงเข้ม'
                                status={dataColorModal === 'สีแดงเข้ม' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColorModal('สีแดงเข้ม')}
                                color='#BE0A01'
                            />
                            <Text style={styles.textNormal}>สีแดงเข้ม</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีชมพู'
                                status={dataColorModal === 'สีชมพู' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColorModal('สีชมพู')}
                                color='#FF97C5'
                            />
                            <Text style={styles.textNormal}>สีชมพู</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีน้ำตาล'
                                status={dataColorModal === 'สีน้ำตาล' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColorModal('สีน้ำตาล')}
                                color='#7A601C'
                            />
                            <Text style={styles.textNormal}>สีน้ำตาล</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงอมเทาปนและสีเขียว'
                                status={dataColorModal === 'สีแดงอมเทาปนและสีเขียว' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColorModal('สีแดงอมเทาปนและสีเขียว')}
                                color='#576458'
                            />
                            <Text style={styles.textNormal}>สีแดงอมเทาปนและสีเขียว</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีดำ'
                                status={dataColorModal === 'สีดำ' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColorModal('สีดำ')}
                                color='black'
                            />
                            <Text style={styles.textNormal}>สีดำ</Text>
                        </View>
                        {/* <Text style={styles.modalText02}> {dataColorModal} </Text> */}
                    </View>
                    <View style={{position:'absolute', bottom: 10, right: 10}}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Home", { dataColorModal });
                            return console.log("dataColorModal to home =>", dataColorModal)
                        }}>
                            <Image

                                source={require('../assets/Home/save01-icon.png')}
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

export default MenstrualLevelModal;