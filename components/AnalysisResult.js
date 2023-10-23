import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    View,  
    ScrollView,  
    TouchableOpacity,
    Text
} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Font from 'expo-font';

import firebase from '../data/firebaseDB';

const AnalysisResult = (props) => {

    const route = useRoute();

    const { startDate, endDate } = props;

    const [activeUser, setActiveUser] = useState({});
    const [queryResult, setQueryResult] = useState([]);

    useEffect(() => {

        { route.params.activeUser ? setActiveUser(route.params.activeUser) : ""}
        console.log("--- Result")
        console.log(activeUser)

        if (startDate && endDate) {
            console.log(startDate, endDate, activeUser.key)
            const monthlyDoc = firebase.firestore().collection("dailyRecord")
            .where("date", ">=", startDate)
            .where("date", "<=", endDate)
            .where("user_id", "==", activeUser.key ? activeUser.key : route.params.activeUser);

            const unsubscribe = monthlyDoc.onSnapshot((querySnapshot) => {
                const allData = [];
                querySnapshot.forEach((res) => {
                    const { 
                        date, 
                        menstrual_color, 
                        menstrual_volumn,
                        menstrual_notes,
                    } = res.data();
                    allData.push({ 
                        key: res.id,
                        date, 
                        menstrual_color, 
                        menstrual_volumn,
                        menstrual_notes,
                    });
                });
                setQueryResult(allData);
            },
            (error) => {}
            );

            return () => {
                unsubscribe();
            };
        }
        
    }, [route.params, startDate, endDate]);

    return (
        <View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>เราตรวจพบว่าคุณมีภาวะประจำเดือนที่ผิดปกติ</Text>
                <Text style={styles.text}>เป็นเวลา {queryResult.length} วัน </Text>
                {queryResult.map((item, i) => (
                    <Text style={styles.text} key={i}>{"  "} {item.date} ( {item.menstrual_color} )</Text>
                ))}
                <Text style={styles.text}>บทความแนะนำ : </Text>
                <Text></Text>
                <Text style={styles.text}>และ {queryResult.length} อาการร่วมอื่น ๆ ที่พบเจอ</Text>
                {queryResult.map((item, i) => (
                    <View key={i}>
                        {item.menstrual_notes && Array.isArray(item.menstrual_notes) && item.menstrual_notes.map((data, j) => (
                            <Text style={styles.text} key={j}>
                                {"  "} {item.date} {data}
                            </Text>
                        ))}
                    </View>
                ))}
                <Text style={styles.text}>บทความแนะนำ : </Text>
                <Text></Text>
                <Text style={styles.helper}>หมายเหตุ : การวิเคราะห์ดังกล่าวเป็นเพียงส่วนหนึ่งสำหรับการติดตามและเข้าใจความผิดปกติของรอบประจำเดือนของคุณ อย่างไรก็ตาม หากคุณรู้สึกว่ามีปัญหาหรือความกังวลใด ๆ ควรปรึกษาแพทย์เพิ่มเติม</Text>
                
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1, 
        backgroundColor: "white", 
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "black",
        fontSize: 16,
        fontFamily: 'MitrRegular',
    },
    helper: {
        width: 330,
        fontFamily: 'MitrRegular',
        color: '#FC7D7B'
    },
});

export default AnalysisResult;

