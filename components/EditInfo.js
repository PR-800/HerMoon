import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const EditInfo = ({ visible, onClose, selectedColor, selectedVolume, selectedNotes }) => {
    const [dataColor, setDataColor] = useState(''); //เก็บข้อมูลสีประจำเดือนที่ต้องการอัพเดต
    const [dataVolume, setDataVolume] = useState(''); //เก็บข้อมูลปริมาณประจำเดือนที่ต้องการอัพเดต
    const [dataNotes, setDataNotes] = useState(''); //เก็บข้อมูลอาการเพิ่มเติมที่ต้องการอัพเดต
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center', marginLeft: -90 }}>
                        <Image

                            source={require('../assets/Home/edit01-icon.png')}
                            style={{ width: 25, height: 25 }}
                        />
                        <Text style={[{ fontFamily: 'MitrRegular', fontSize: 20, color: 'white' }]}>  แก้ไขข้อมูล</Text>
                    </View>

                    {/* เลือกสีประจำเดือนที่ต้องการอัพเดต */}
                    <View style={{ backgroundColor: 'white', borderRadius: 40, paddingVertical: 20, paddingHorizontal: 10 }}>
                        <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
                            <Image
                                source={require('../assets/Home/blood01-icon.png')}
                            />
                            <View style={{ paddingTop: 3, paddingLeft: 5 }}>
                                <Text style={{ color: 'gray', }}>{selectedColor}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีแดงสด'
                                        status={dataColor === 'สีแดงสด' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีแดงสด')}
                                        color='#FF0000'
                                    />
                                    <Text style={styles.modalText}>สีแดงสด</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีแดงส้ม'
                                        status={dataColor === 'สีแดงส้ม' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีแดงส้ม')}
                                        color='#FD4400'
                                    />
                                    <Text style={styles.modalText}>สีแดงส้ม</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีแดงเข้ม'
                                        status={dataColor === 'สีแดงเข้ม' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีแดงเข้ม')}
                                        color='#BE0A01'
                                    />
                                    <Text style={styles.modalText}>สีแดงเข้ม</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 30 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีชมพู'
                                        status={dataColor === 'สีชมพู' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีชมพู')}
                                        color='#FF97C5'
                                    />
                                    <Text style={styles.modalText}>สีชมพู</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีน้ำตาล'
                                        status={dataColor === 'สีน้ำตาล' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีน้ำตาล')}
                                        color='#7A601C'
                                    />
                                    <Text style={styles.modalText}>สีน้ำตาล</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีดำ'
                                        status={dataColor === 'สีดำ' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีดำ')}
                                        color='black'
                                    />
                                    <Text style={styles.modalText}>สีดำ</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงอมเทาปนและสีเขียว'
                                status={dataColor === 'สีแดงอมเทาปนและสีเขียว' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColor('สีแดงอมเทาปนและสีเขียว')}
                                color='#576458'
                            />
                            <Text style={styles.modalText}>สีแดงอมเทาปนและสีเขียว</Text>
                        </View>
                        {/* <Text> {dataColor} </Text> */}

                        {/* เลือกปริมาณประจำเดือนที่ต้องการอัพเดต */}
                        <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
                            <Image style={{ marginTop: -5, marginLeft: -5 }}
                                source={require('../assets/Home/sanitarypad02-icon.png')}
                            />
                            <Text style={{ paddingTop: 3, paddingLeft: 2, color: 'gray' }}>
                                {selectedVolume}
                            </Text>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 40 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="ปริมาณมาก"
                                    status={dataVolume === 'ปริมาณมาก' ? 'checked' : 'unchecked'}
                                    onPress={() => setDataVolume('ปริมาณมาก')}
                                    color='#BE0A01'
                                />
                                <Text style={styles.modalText}>ปริมาณมาก</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="ปริมาณปานกลาง (ปกติ)"
                                    status={dataVolume === 'ปริมาณปานกลาง (ปกติ)' ? 'checked' : 'unchecked'}
                                    onPress={() => setDataVolume('ปริมาณปานกลาง (ปกติ)')}
                                    color='#FF0000'
                                />
                                <Text style={styles.modalText}>ปริมาณปานกลาง (ปกติ)</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="ปริมาณน้อย"
                                    status={dataVolume === 'ปริมาณน้อย' ? 'checked' : 'unchecked'}
                                    onPress={() => setDataVolume('ปริมาณน้อย')}
                                    color='#F98585'
                                />
                                <Text style={styles.modalText}>ปริมาณน้อย</Text>
                            </View>
                            {/* <Text> {dataVolume} </Text> */}
                        </View>

                        {/* เลือกสีอาการเพิ่มเติมที่ต้องการอัพเดต */}
                        <View>
                            <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
                                <Image
                                    source={require('../assets/Home/notes02-icon.png')}
                                />
                                <Text style={{ paddingTop: 3, paddingLeft: 10, color: 'gray' }} numberOfLines={1} ellipsizeMode="tail">
                                    {selectedNotes}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', fontSize: 14 }}>
                                <RadioButton
                                    value='อาการปวดท้องรุนแรง'
                                    status={dataNotes === 'อาการปวดท้องรุนแรง' ? 'checked' : 'unchecked'}
                                    onPress={() => setDataNotes('อาการปวดท้องรุนแรง')}
                                    color='#FF0000'
                                />
                                <Text style={styles.modalText}>อาการปวดท้องรุนแรง</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value='ประจำเดือนมาหลายวันเกินไป'
                                    status={dataNotes === 'ประจำเดือนมาหลายวันเกินไป' ? 'checked' : 'unchecked'}
                                    onPress={() => setDataNotes('ประจำเดือนมาหลายวันเกินไป')}
                                    color='#FF0000'
                                />
                                <Text style={styles.modalText}>ประจำเดือนมาหลายวันเกินไป</Text>
                            </View>
                            {/* <Text> {dataNotes} </Text> */}
                        </View>

                        <View style={{ marginLeft: 170 }}>
                            <TouchableOpacity>
                                <Image

                                    source={require('../assets/Home/save01-icon.png')}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginLeft: 210, marginTop: -590 }}>
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
        width: 320,
        height: 650
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'MitrRegular'
    },
    textBox: {
        margin: 2,
        backgroundColor: 'white',
        width: 250,
        height: 40,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: 'pink',
        borderWidth: 1
    },
    textF: {
        fontFamily: 'MitrRegular',
        fontSize: 16,
    },

})

export default EditInfo;