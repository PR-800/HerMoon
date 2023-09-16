import React from "react";
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TextInput } from 'react-native-paper';

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Image
                    source={ require('../assets/logo.png') }
                />
                <View>
                    <Text style={styles.headerText}>Her</Text>
                    <Text style={styles.headerText}>Moon</Text>
                </View>
            </View>
            <TextInput 
                style={styles.input} 
                theme={{ roundness: 25 }} 
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                placeholder="Username"
                placeholderTextColor={{ color: "aliceblue" }}

                value={username}
                onChangeText={username => setUsername(username)}
            />
            <TextInput 
                style={styles.input} 
                theme={{ roundness: 25 }} 
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                placeholder="Password"
                placeholderTextColor={{ color:"aliceblue" }}
                
                value={password}
                onChangeText={password => setPassword(password)}
            />
            <Text>Login Screen !</Text>
            <Text style={{fontSize: 20}}></Text>
            <Text
                onPress={() => {
                    navigation.navigate("tutorial", {});
                }}
             >x Go to tutorial</Text>
            <Text style={{fontSize: 20}}></Text>
            <Text
                onPress={() => {
                    navigation.navigate("register", {});
                }}
            >x Register now</Text>
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
        margin: 40,
    },
    headerText: {
        fontSize: 50,
        fontWeight: "900",
        lineHeight: 50,
        marginLeft: 30,
    },
    input: {
        width: 300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 25,
    }
});
  
export default LoginScreen;