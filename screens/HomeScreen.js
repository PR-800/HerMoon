import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

import MenstrualLevelModel from '../components/MenstrualLevelModel';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const BloodIcon = () => {
        setModalVisible(!modalVisible);
    };
    return (
        <View style={styles.screen}>
            <View style={styles.leftAlignedText}>
                <Text style={{ fontSize: 15, color: "#8461D5", fontWeight: 'bold' }}>welcome</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Leslie Alexander</Text>  
            </View>

            <View style={{marginLeft: -250}}>
                <Image
                    source={require('../assets/clock-icon.png')}
                    style={styles.image}
                />
            </View>

            <View>
                <Image
                    source={require('../assets/Profile-icon.png')}
                    style={{ width: 300, height: 300 }}
                />
            </View>

            <View style={{ marginLeft: 250 }}>
                <Image
                    source={require('../assets/edit-icon.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.groupimage}>
                <TouchableOpacity onPress={BloodIcon}>
                <Image
                    
                    source={require('../assets/blood-icon.png')}
                    style={styles.image}
                    />
                </TouchableOpacity>
                <MenstrualLevelModel visible={modalVisible} onClose={BloodIcon} />
                <Image
                    source={require('../assets/sanitarypad-icon.png')}
                    style={styles.image}
                />
                <Image
                    source={require('../assets/notes-icon.png')}
                    style={styles.image}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    groupimage: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 20
    },
    image: {
        width: 50, 
        height: 50, 
        marginHorizontal: 10, // ระยะห่างแนวนอนระหว่างรูปภาพ
    },
    leftAlignedText: {
        marginLeft: -180,
        marginBottom: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
    },
});

export default HomeScreen;