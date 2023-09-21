import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const MenstrualLevelModel = ({ visible, onClose }) => {
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
                                value='Bright red'
                                status={checked === 'Bright red' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Bright red')}
                                color='#FF0000'
                            />
                            <Text style={styles.modalText01}>สีแดงสด</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Reddish Orange'
                                status={checked === 'Reddish Orange' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Reddish Orange')}
                                color='#FD4400'
                            />
                            <Text style={styles.modalText01}>สีแดงส้ม</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Dark red'
                                status={checked === 'Dark red' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Dark red')}
                                color='#BE0A01'
                            />
                            <Text style={styles.modalText01}>สีแดงเข้ม</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Pink'
                                status={checked === 'Pink' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Pink')}
                                color='#FF97C5'
                            />
                            <Text style={styles.modalText01}>สีชมพู</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Brown'
                                status={checked === 'Brown' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Brown')}
                                color='#7A601C'
                            />
                            <Text style={styles.modalText01}>สีน้ำตาล</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Reddish gray'
                                status={checked === 'Reddish gray' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Reddish gray')}
                                color='#576458'
                            />
                            <Text style={styles.modalText01}>สีแดงอมเทาปนและสีเขียว</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='Black'
                                status={checked === 'Black' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Black')}
                                color='black'
                            />
                            <Text style={styles.modalText01}>สีดำ</Text>
                        </View>
                        {/* <Text> {checked} </Text> */}
                    </View>
                    <View style={{ marginLeft: 130, marginTop: -60 }}>
                        <TouchableOpacity>
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
                    <View style={{ marginLeft: 110, marginTop: -30}}>
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
})

export default MenstrualLevelModel;