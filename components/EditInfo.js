import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const EditInfo = ({ visible, onClose }) => {
    const [checked, setChecked] = React.useState(''); //initial choice
    const [checkedVL, setCheckedVL] = React.useState(''); //initial choice
    const [notes, setNotes] = React.useState(''); //initial choice
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
                        <Text style={styles.modalText}>  แก้ไขข้อมูล</Text>
                    </View>

                    <View style={{ backgroundColor: 'white', borderRadius: 40, padding: 20 }}>
                        <View style={styles.textBox}>
                            <Image
                                source={require('../assets/Home/blood01-icon.png')}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='Bright red'
                                        status={checked === 'Bright red' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('Bright red')}
                                        color='#FF0000'
                                    />
                                    <Text style={styles.modalText}>สีแดงสด</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='Reddish Orange'
                                        status={checked === 'Reddish Orange' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('Reddish Orange')}
                                        color='#FD4400'
                                    />
                                    <Text style={styles.modalText}>สีแดงส้ม</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='Dark red'
                                        status={checked === 'Dark red' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('Dark red')}
                                        color='#BE0A01'
                                    />
                                    <Text style={styles.modalText}>สีแดงเข้ม</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 30 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='Pink'
                                        status={checked === 'Pink' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('Pink')}
                                        color='#FF97C5'
                                    />
                                    <Text style={styles.modalText}>สีชมพู</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='Brown'
                                        status={checked === 'Brown' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('Brown')}
                                        color='#7A601C'
                                    />
                                    <Text style={styles.modalText}>สีน้ำตาล</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='Black'
                                        status={checked === 'Black' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('Black')}
                                        color='black'
                                    />
                                    <Text style={styles.modalText}>สีดำ</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Reddish gray'
                                status={checked === 'Reddish gray' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Reddish gray')}
                                color='#576458'
                            />
                            <Text style={styles.modalText}>สีแดงอมเทาปนและสีเขียว</Text>
                        </View>
                        {/* <Text> {checked} </Text> */}
                        <View style={styles.textBox}>
                            <Image style={{ marginTop: -5, marginLeft: -5 }}
                                source={require('../assets/Home/sanitarypad02-icon.png')}
                            />
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 40 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="large quantity"
                                    status={checkedVL === 'large quantity' ? 'checked' : 'unchecked'}
                                    onPress={() => setCheckedVL('large quantity')}
                                    color='#BE0A01'
                                />
                                <Text style={styles.modalText}>ปริมาณมาก</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="moderate quantity"
                                    status={checkedVL === 'moderate quantity' ? 'checked' : 'unchecked'}
                                    onPress={() => setCheckedVL('moderate quantity')}
                                    color='#FF0000'
                                />
                                <Text style={styles.modalText}>ปริมาณปานกลาง (ปกติ)</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="small quantity"
                                    status={checkedVL === 'small quantity' ? 'checked' : 'unchecked'}
                                    onPress={() => setCheckedVL('small quantity')}
                                    color='#F98585'
                                />
                                <Text style={styles.modalText}>ปริมาณน้อย</Text>
                            </View>
                            {/* <Text> {checkedVL} </Text> */}
                        </View>
                        <View>
                            <View style={styles.textBox}>
                                <Image
                                    source={require('../assets/Home/notes02-icon.png')}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Severe abdominal pain'
                                status={notes === 'Severe abdominal pain' ? 'checked' : 'unchecked'}
                                onPress={() => setNotes('Severe abdominal pain')}
                                color='#FF0000'
                            />
                            <Text style={styles.modalText}>อาการปวดท้องรุนแรง</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Menstruating for an extended period'
                                status={notes === 'Menstruating for an extended period' ? 'checked' : 'unchecked'}
                                onPress={() => setNotes('Menstruating for an extended period')}
                                color='#FF0000'
                            />
                            <Text style={styles.modalText}>ประจำเดือนมาหลายวันเกินไป</Text>
                        </View>
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
        margin: 5,
        backgroundColor: 'white',
        width: 210,
        height: 40,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: 'pink',
        borderWidth: 1
    },

})

export default EditInfo;