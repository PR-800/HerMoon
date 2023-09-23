import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts } from 'expo-font';

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

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
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>Create</Text>
                        <Text style={styles.headerText}>an account</Text>
                    </View>
                </View>

                <TextInput 
                    style={styles.input} 
                    theme={{ 
                        roundness: 50, 
                        colors: { onSurfaceVariant: 'grey'} 
                    }} 
                    underlineColor="transparent"
                    activeUnderlineColor="grey"
                    textColor="black"

                    label="Username"
                    value={username}
                    onChangeText={username => setUsername(username)}
                />

                <TextInput 
                    style={styles.input} 
                    theme={{ 
                        roundness: 50, 
                        colors: { onSurfaceVariant: 'grey'} 
                    }} 
                    underlineColor="transparent"
                    activeUnderlineColor="grey"
                    textColor="black"

                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                />

                <TextInput 
                    style={styles.input} 
                    theme={{ 
                        roundness: 50, 
                        colors: { onSurfaceVariant: 'grey'} 
                    }} 
                    underlineColor="transparent"
                    activeUnderlineColor="grey"
                    textColor="black"

                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("login", {});
                    }}
                >
                    <Text style={styles.textButton}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate("login", {});
                    }}
                >
                    <Text style={[styles.text, { 
                        top: 15,
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: {width: -1, height: 2},
                        textShadowRadius: 15,
                    }]}>
                        Have an account already? {" "}
                        <Text style={{ textDecorationLine: "underline"}}>
                            Login
                        </Text>
                    </Text>
                </TouchableOpacity>
                    
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
    },
    headerText: {
        fontSize: 50,
        lineHeight: 60,
        color: "white",
        fontFamily: 'MitrMedium',
    },
    input: {
        width: 300,
        height: 55,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 50,
        overflow: 'hidden',
        paddingLeft: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 5,

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
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        width: 300,
        borderRadius: 50,
        marginTop: 40,
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 5,
    },
    textButton: {
        color:"#FF9B80", 
        fontSize: 20,
        fontFamily: 'MitrMedium',
    }
});
  
export default SignUpScreen;