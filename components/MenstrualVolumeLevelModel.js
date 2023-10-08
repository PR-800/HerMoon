import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const MenstrualVolumeLevelModel = ({ visible, onClose }) => {
    const [checkedVL, setCheckedVL] = React.useState(''); //initial choice
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <LinearGradient colors={['#7ED8FF', '#CCF2FE']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Image

                            source={require('../assets/Home/sanitarypad01-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.modalText}>ระดับปริมาณของประจำเดือน</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 40, paddingBottom: 150, paddingHorizontal: 20, paddingTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="large quantity"
                                status={checkedVL === 'large quantity' ? 'checked' : 'unchecked'}
                                onPress={() => setCheckedVL('large quantity')}
                                color='#BE0A01'
                            />
                            <Text style={styles.modalText01} >ปริมาณมาก</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="moderate quantity"
                                status={checkedVL === 'moderate quantity' ? 'checked' : 'unchecked'}
                                onPress={() => setCheckedVL('moderate quantity')}
                                color='#FF0000'
                            />
                            <Text style={styles.modalText01} >ปริมาณปานกลาง (ปกติ)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="small quantity"
                                status={checkedVL === 'small quantity' ? 'checked' : 'unchecked'}
                                onPress={() => setCheckedVL('small quantity')}
                                color='#F98585'
                            />
                            <Text style={styles.modalText01} >ปริมาณน้อย</Text>
                        </View>
                        {/* <Text> {checkedVL} </Text> */}
                    </View>
                    <View style={{ marginLeft: 130, marginTop: -60 }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/Home/save02-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 190, marginTop: -290}}>
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
    gradientBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalText01: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'MitrRegular'
    },
})

export default MenstrualVolumeLevelModel;