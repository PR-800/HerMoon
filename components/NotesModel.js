import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, Image, TouchableOpacity } from 'react-native';;
import { LinearGradient } from 'expo-linear-gradient';

const NotesModel = ({ visible, onClose }) => {
    const [text, setText] = useState('');
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <LinearGradient colors={['#BF89FF', '#E8D9F1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 25, flexDirection: 'row', alignItems: 'center' }}>
                        <Image

                            source={require('../assets/Home/notes01-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.modalText}>  บันทึกข้อมูลเพิ่มเติม</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 40, paddingBottom: 150, paddingHorizontal: 20, paddingTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setText(text)}
                            value={text}
                            multiline={true}
                            placeholder="Tap here to continue..."
                        />
                        {/* <Text >You entered: {text}</Text> */}
                    </View>
                    <View style={{ marginLeft: 130, marginTop: -60 }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/Home/save03-icon.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 190, marginTop: -280 }}>
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
    },
    input: {
        height: 100,
        width: 170,
      },
})

export default NotesModel;