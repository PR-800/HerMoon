import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const MenstrualLevelModel = ({ visible, onClose }) => {
    const [checked, setChecked] = React.useState('Apple'); //initial choice
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ margin: 25, flexDirection: 'row', alignItems: 'center' }}>
                        <Image

                            source={require('../assets/Home/blood01-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.modalText}>ระดับความเข้มของสี</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 40, padding: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="ฺBright red"
                                status={checked === 'ฺBright red' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('ฺBright red')}
                            />
                            <Text>สีแดงสด</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Reddish Orange"
                                status={checked === 'Reddish Orange' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Reddish Orange')}
                            />
                            <Text>สีแดงส้ม</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Dark red"
                                status={checked === 'Dark red' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Dark red')}
                            />
                            <Text>สีแดงเข้ม</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Pink"
                                status={checked === 'Pink' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Pink')}
                            />
                            <Text>สีชมพู</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Brown"
                                status={checked === 'Brown' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Brown')}
                            />
                            <Text>สีน้ำตาล</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Reddish gray"
                                status={checked === 'Reddish gray' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Reddish gray')}
                            />
                            <Text>สีแดงอมเทาปนและสีเขียว</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Black"
                                status={checked === 'Black' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Black')}
                            />
                            <Text>สีดำ</Text>
                        </View>
                        {/* <Text> {checked} </Text> */}
                    </View>
                    <View style={{ marginLeft: 130, marginTop: -60 }}>
                        <TouchableOpacity>
                            <Image

                                source={require('../assets/Home/save-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 190, marginTop: -300 }}>
                        <TouchableOpacity>
                            <Image

                                source={require('../assets/Home/question-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 110, marginTop: -30 }}>
                        <TouchableOpacity onPress={onClose}>
                            <Image

                                source={require('../assets/Home/arrow-left-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: 'pink',
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
    },
})

export default MenstrualLevelModel;