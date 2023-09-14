import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';

const MenstrualLevelModel = ({ visible, onClose }) => {
    const [checked, setChecked] = React.useState('Apple'); //initial choice
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>ระดับความเข้มของสี</Text>
                    <View >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <RadioButton
                            value="ฺBright red"
                            status={checked === 'ฺBright red' ? 'checked' : 'unchecked'} 
                            onPress={() => setChecked('ฺBright red')} 
                        />
                            <Text>Bright red</Text>  
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="Apple"
                                status={checked === 'Apple' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('Apple')}
                            />
                            <Text>Apple</Text>
                        </View>
                        <Text> {checked}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onClose}>
                            <Text style={styles.textStyle}>close</Text>
                        </Pressable>
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
    },
    modalView: {
        backgroundColor: 'pink',
        borderRadius: 20,
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
        height:500
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },
})

export default MenstrualLevelModel;