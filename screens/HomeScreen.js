import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.screen}>
            <View style={styles.leftAlignedText}>
                <Text style={{ fontSize: 15, color: "#8461D5", fontWeight: 'bold' }}>welcome</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Leslie Alexander</Text>  
            </View>

            <View>
                <Image
                    source={require('../assets/Profile-icon.png')}
                    style={{ width: 300, height: 300 }}
                />
            </View>
            <View style={styles.groupimage}>
                <Image
                    source={require('../assets/blood-icon.png')}
                    style={styles.image}
                />
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
        marginLeft: -150,
        marginBottom: 20
    },
});

export default HomeScreen;