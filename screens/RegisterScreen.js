import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const SignUpScreen = ({navigation}) => {

    return (
        <View style={styles.screen}>
            <Text>Register Screen !</Text>
            <Text style={{fontSize: 20}}></Text>
            <Text
                onPress={() => {
                    navigation.navigate("login", {});
                }}
            >x Go login</Text>
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
  
export default SignUpScreen;