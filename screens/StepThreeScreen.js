import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StepThreeScreen = ({navigation, images}) => {
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
                    <Text>Step 3</Text>
                </View>

                <View style={styles.bottom}>
                    <View style={styles.buttons}>
                        <TouchableOpacity 
                            style={styles.backButton}
                            onPress={() => {
                                navigation.navigate("stepTwo", {});
                            }}
                        >
                            <Text style={styles.textBackButton}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.nextButton}
                            onPress={() => {
                                navigation.navigate("homePage", {});
                            }}
                        >
                            <Text style={styles.textNextButton}>Get Started</Text>
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
        fontWeight: "bold",
    },
    backButton: {
        alignItems: 'center',
        backgroundColor: '#DCBCE5',
        height: 55,
        width: 130,
        borderRadius: 50,
        justifyContent: 'center',
        right: 40,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 5,
    },
    nextButton: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        width: 150,
        borderRadius: 50,
        justifyContent: 'center',
        left: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 5,
    },
    textBackButton: {
        color: "white", 
        fontWeight: "bold",
        fontSize: 20,
        opacity: 1,
    },
    textNextButton: {
        color: "#FF9B80", 
        fontWeight: "bold",
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
  
export default StepThreeScreen;