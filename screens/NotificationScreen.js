import React from 'react'
import { StyleSheet, Text, View, Image, Pressable, Switch } from 'react-native';
// import ToggleSwitch from 'toggle-switch-react-native'
// import { Button } from 'react-native-web';

import { useFonts } from 'expo-font'; 

const NotificationScreen = ({ route, navigation }) => {

    const [loaded] = useFonts({
        MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
        MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return ( 
        <View style={styles.screen}>
            <View style={styles.headerGroup}>
                <Pressable onPress={() => {
                            navigation.navigate("Profile", {});
                            return console.log("go Profile")
                        }}>
                    <Image
                    source={require('../assets/profile/arrow-left.png')}
                    style={styles.arrowleft}
                    />
                </Pressable>
                <Text style={styles.header}>Notifications</Text>
            </View>
            
            <Text style={styles.subHead}>
                General
            </Text>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>General Notification</Text>
                <Switch
                trackColor={{ true: "#9F79EB", false: "lightgray" }}
                thumbColor={"blue"}
                value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>Sound</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>Vibrate</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
                />
            </View>
            <Text style={styles.subHead}>
                System & Service updates</Text>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>App updates</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>Reminder</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>Promotion</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
            />
            </View>

        <Text style={styles.subHead}>
            Others
        </Text>
        {/* <ToggleSwitch
            isOn={false}
            onColor="#FC7D7B"
            offColor="#9F79EB"
            label="New Service Availiable"
            labelStyle={{ color: "black", fontWeight: "800" }}
            size="medium"
            onToggle={isOn => console.log("changed to : ", isOn)}
        /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    header: {
        display: "flex",
        fontSize: 25,
        fontFamily: 'MitrMedium',
        lineHeight: 50,
    },
    subHead: {
        fontSize: 20,
        fontFamily: 'MitrMedium',
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginVertical: 20,
    },
    linearGradient: {
        width: 350,
        height: 50,
        marginTop: 10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    headerGroup: {
        flexDirection: "row",
        marginVertical: 20,
        marginTop: 60,
    },
    arrowleft: {
        display: "flex",
        top: 15,
        right: 90,
        width: 25,
        height: 25,
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        marginVertical: 5,
    },
    text: {
        fontFamily: 'MitrRegular',
        fontSize: 17,
    },
});

export default NotificationScreen
