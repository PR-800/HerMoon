import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

const ProfileScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={{ fontSize: 40 }}>Profile Screen !</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProfileScreen
