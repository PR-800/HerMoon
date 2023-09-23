import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts } from 'expo-font';

const StepOneScreen = ({navigation, images}) => {

    const [loaded] = useFonts({
        MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
        MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.screen}>
            <LinearGradient
                colors={['#FC7D7B', '#9F79EB']}
                style={styles.gradientBackground}
            >
                <View style={styles.top}>
                    <Text>progress bar</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.text}>Step 1</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.buttons}>
                        <TouchableOpacity 
                            style={styles.nextButton}
                            onPress={() => {
                                navigation.navigate("stepTwo", {});
                            }}
                        >
                            <Text style={styles.textNextButton}>Next</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    top: {
        height: "10%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        height: "70%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    gradientBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "white",
        fontSize: 15,
        fontFamily: 'MitrRegular',
    },
    nextButton: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        width: 130,
        borderRadius: 50,
        justifyContent: 'center',
        left: 105,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 5,
    },
    textNextButton: {
        color: "#FF9B80", 
        fontFamily: 'MitrMedium',
        fontSize: 20,
    },
    bottom: {
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        flexDirection: "row",
    }
});
  
export default StepOneScreen;