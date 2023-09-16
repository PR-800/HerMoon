import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TextInput, Image, TouchableOpacity } from 'react-native';;

const NotesModel = ({ visible, onClose }) => {
    const [text, setText] = useState('');
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ margin: 25, flexDirection: 'row', alignItems: 'center' }}>
                        <Image

                            source={require('../assets/Home/notes-icon.png')}
                            style={styles.image}
                        />
                        <Text style={styles.modalText}> บันทึกข้อมูลเพิ่มเติม</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 40, paddingBottom: 150, paddingHorizontal: 20, paddingTop: 20 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setText(text)}
                            value={text}
                            multiline={true}
                            numberOfLines={10}
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
        backgroundColor: '#BF89FF',
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