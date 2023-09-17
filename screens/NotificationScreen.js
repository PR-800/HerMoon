import React from 'react'
import { StyleSheet, Text, View, Image, Pressable, Switch } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import { Button } from 'react-native-web';


const NotificationScreen = ({ route, navigation }) => {
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
                <Text>General Notification</Text>
                <Switch
                trackColor={{ true: "#9F79EB", false: "lightgray" }}
                thumbColor={"blue"}
                value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text>Sound</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text>Vibrate</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
                />
            </View>
            <Text style={styles.subHead}>
                System & Service updates</Text>
            <View style={styles.filterContainer}>
                <Text>App updates</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text>Reminder</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text>Promotion</Text>
                <Switch
                trackColor={{ true: "#ff6f00", false: "lightgray" }}
                thumbColor={"#ff6f00"}
                value={false}
            />
      </View>

        <Text style={styles.subHead}>
            Others
        </Text>
        <ToggleSwitch
            isOn={false}
            onColor="#FC7D7B"
            offColor="#9F79EB"
            label="New Service Availiable"
            labelStyle={{ color: "black", fontWeight: "800" }}
            size="medium"
            onToggle={isOn => console.log("changed to : ", isOn)}
        />

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
        fontWeight: "700",
        lineHeight: 50,
    },
    subHead: {
        fontSize: 20,
        fontWeight: "bold",
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
});

export default NotificationScreen
