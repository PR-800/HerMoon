import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
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
});
  
export default LoginScreen;