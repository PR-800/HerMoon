import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// import { useFonts, VarelaRound_400Regular, } from '@expo-google-fonts/varela-round';

const LoginScreen = ({navigation}) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    // let [fontsLoaded, fontError] = useFonts({
    //     VarelaRound_400Regular,
    // });
    
    // if (!fontsLoaded && !fontError) {
    //     return null;
    // }

    return (
        <View style={[styles.screen, {
            // fontFamily: 'VarelaRound_400Regular',
        }]}>
            <LinearGradient
                colors={['#FC7D7B', '#9F79EB']}
                style={styles.gradientBackground}
            >
                <View style={styles.header}>
                    <Image
                        source={ require('../assets/logo.png') }
                    />
                    <View>
                        <Text style={[styles.headerText, {
                            textShadowColor: '#9F79EB',
                            textShadowOffset: {width: 1, height: 0.5},
                            textShadowRadius: 35,
                        }]}>Her</Text>
                        <Text style={[styles.headerText, {
                            textShadowColor: '#9F79EB',
                            textShadowOffset: {width: 1, height: 0.5},
                            textShadowRadius: 35,
                        }]}>Moon</Text>
                    </View>
                </View>

                <TextInput 
                    style={styles.input} 
                    // mode='outlined'
                    theme={{ 
                        roundness: 50, 
                        colors: { onSurfaceVariant: 'grey'} ,
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
                    // mode='outlined'
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

                <TouchableOpacity 
                    // onPress={() => {
                    //     navigation.navigate("tutorial", {});
                    // }}
                >
                    <Text style={[styles.text, { 
                            left: 80, 
                            bottom: 5,
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: -1, height: 2},
                            // textShadowRadius: 15,
                        }]}>
                        Forgot password
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("tutorial", {});
                    }}
                >
                    <Text style={styles.textButton}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate("register", {});
                    }}
                >
                    <Text style={[styles.text, { 
                        top: 15,
                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                        textShadowOffset: {width: -1, height: 2},
                        textShadowRadius: 15,
                    }]}>
                        Doesn't have an account? {" "}
                        <Text style={{ textDecorationLine: "underline"}}>
                            Register
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
        // fontFamily: "VarelaRound_400Regular",
        fontSize: 50,
        fontWeight: "bold",
        lineHeight: 50,
        marginLeft: 30,
        color: "white"
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
        fontWeight: "bold",
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        width: 300,
        borderRadius: 50,
        marginTop: 30,
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
        fontWeight: "bold",
        fontSize: 20,
    }
});
  
export default LoginScreen;