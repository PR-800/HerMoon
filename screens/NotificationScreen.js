import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable, Switch } from 'react-native';
// import ToggleSwitch from 'toggle-switch-react-native'
// import { Button } from 'react-native-web';
import * as Notifications from 'expo-notifications';

import { useFonts } from 'expo-font';

const NotificationScreen = ({ route, navigation }) => {

    // ตั้งเวลาแจ้งเตือน
    const scheduleNotificationAtDate = async (title, body, targetDate) => {
        try {
            const currentDate = new Date();
            const timeDiff = targetDate - currentDate;
            // แปลงความต่างเวลาให้เป็นวินาที
            const secondsFromNow = timeDiff / 1000;

            if (secondsFromNow > 0) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: title,
                        body: body,
                        sound: 'default',
                    },
                    trigger: {
                        seconds: secondsFromNow,
                    },
                });
            } else {
                console.log('ไม่สามารถตั้งเวลาแจ้งเตือนในอดีต');
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการตั้งเวลาการแจ้งเตือน:', error);
        }
    };

    // ตรวจสอบและขออนุญาตใช้การแจ้งเตือน
    const askForNotificationPermission = async () => {
        try {
            const { status } = await Notifications.getPermissionsAsync();

            if (status === 'granted') {
                // ผู้ใช้มีสิทธิ์การแจ้งเตือนแล้ว
                // จากที่นี้คุณสามารถเรียกใช้ `scheduleNotification`
                const targetDate = new Date('2023-10-24T02:38:40'); // ตั้งเวลาในอนาคต (ให้แก้ไขค่านี้ตามวันที่และเวลาที่ต้องการ)
                scheduleNotificationAtDate('คำเตือน', 'อย่าลืมพกผ้าอนามัยนะ', targetDate);
                console.log('อย่าลืมพกผ้าอนามัยนะ')
            } else {
                // ผู้ใช้ไม่ได้รับสิทธิ์การแจ้งเตือน
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการขอสิทธิ์การแจ้งเตือน: askForNotificationPermission', error);
        }
    };


    useEffect(() => {
        // ขออนุญาตการแจ้งเตือนและตั้งเวลาการแจ้งเตือน
        const setupNotification = async () => {
            await askForNotificationPermission();
        };
        setupNotification();
    }, []);

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
                }}>
                    <Image
                        source={require('../assets/profile/arrow-left.png')}
                        style={styles.arrowleft}
                    />
                </Pressable>
                <Text style={styles.header}>การแจ้งเตือน</Text>
            </View>

            <Text style={styles.subHead}>
                ทั่วไป
            </Text>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>การแจ้งเตือนทั้งหมด</Text>
                <Switch
                    trackColor={{ true: "#9F79EB", false: "lightgray" }}
                    thumbColor={"blue"}
                    value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>รอบประจำเดือน</Text>
                <Switch
                    trackColor={{ true: "#ff6f00", false: "lightgray" }}
                    thumbColor={"#ff6f00"}
                    value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>เสียง</Text>
                <Switch
                    trackColor={{ true: "#ff6f00", false: "lightgray" }}
                    thumbColor={"#ff6f00"}
                    value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>การสั่น</Text>
                <Switch
                    trackColor={{ true: "#ff6f00", false: "lightgray" }}
                    thumbColor={"#ff6f00"}
                    value={false}
                />
            </View>
            <Text style={styles.subHead}>อัพเดตระบบและบริการ</Text>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>อัพเดตแอปพลิเคชัน</Text>
                <Switch
                    trackColor={{ true: "#ff6f00", false: "lightgray" }}
                    thumbColor={"#ff6f00"}
                    value={false}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.text}>บทความใหม่</Text>
                <Switch
                    trackColor={{ true: "#ff6f00", false: "lightgray" }}
                    thumbColor={"#ff6f00"}
                    value={false}
                />
            </View>

            {/* <Text style={styles.subHead}>
            Others
        </Text> */}

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
