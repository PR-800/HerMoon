import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const MenstrualLevelModel = ({ visible, onClose, navigation }) => {
    const [checked, setChecked] = React.useState(''); //initial choice
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <LinearGradient colors={['#F77D80', '#FFEAEA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Image

                            source={require('../assets/Home/blood01-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.modalText}>ระดับความเข้มของสี</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 40, padding: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงสด'
                                status={checked === 'สีแดงสด' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('สีแดงสด')}
                                color='#FF0000'
                            />
                            <Text style={styles.modalText01}>สีแดงสด</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงส้ม'
                                status={checked === 'สีแดงส้ม' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('สีแดงส้ม')}
                                color='#FD4400'
                            />
                            <Text style={styles.modalText01}>สีแดงส้ม</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงเข้ม'
                                status={checked === 'สีแดงเข้ม' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('สีแดงเข้ม')}
                                color='#BE0A01'
                            />
                            <Text style={styles.modalText01}>สีแดงเข้ม</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีชมพู'
                                status={checked === 'สีชมพู' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('สีชมพู')}
                                color='#FF97C5'
                            />
                            <Text style={styles.modalText01}>สีชมพู</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีน้ำตาล'
                                status={checked === 'สีน้ำตาล' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('สีน้ำตาล')}
                                color='#7A601C'
                            />
                            <Text style={styles.modalText01}>สีน้ำตาล</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงอมเทาปนและสีเขียว'
                                status={checked === 'สีแดงอมเทาปนและสีเขียว' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('สีแดงอมเทาปนและสีเขียว')}
                                color='#576458'
                            />
                            <Text style={styles.modalText01}>สีแดงอมเทาปนและสีเขียว</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีดำ'
                                status={checked === 'สีดำ' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('สีดำ')}
                                color='black'
                            />
                            <Text style={styles.modalText01}>สีดำ</Text>
                        </View>
                        {/* <Text style={styles.modalText02}> {checked} </Text> */}
                    </View>
                    <View style={{ marginLeft: 130, marginTop: -60 }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Home", { checked });
                            return console.log("Home =>", checked)
                        }}>
                            <Image

                                source={require('../assets/Home/save01-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 190, marginTop: -300 }}>
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
        height: 400
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
    modalText01: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'MitrRegular'
    },
    modalText02: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'MitrRegular',
        width: 180
    },
})

export default MenstrualLevelModel;