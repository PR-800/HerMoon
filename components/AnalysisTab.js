import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    View,  
    ScrollView,  
    TouchableOpacity,
    Text
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';


import AnalysisResult from './AnalysisResult';

import * as Font from 'expo-font';

import firebase from '../data/firebaseDB';

const AnalysisTab = () => {
    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [fullDate, setFullDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isShowResult, setIsShowResult] = useState(false);
    const [canAnalyst, setCanAnalyst] = useState(true);
    const [queryColorResult, setQueryColorResult] = useState([]);
    const [queryNotesResult, setQueryNotesResult] = useState([]);
    const [activeUser, setActiveUser] = useState({});

    const route = useRoute();

    useEffect(() => {
        { route.params.activeUser ? setActiveUser(route.params.activeUser) : ""}
        console.log("--- Analyst")
        console.log(activeUser)
        
    }, []);

    getDate = (date) => {
        if (date instanceof Date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
        
            const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
            return formattedDate;
        } 
        else {
            return '';
        }
    };

    const parseDate = (dateString) => {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
        
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                console.log("parse", new Date(year, month - 1, day))
                return new Date(year, month - 1, day);
            }
        }
        return null;
    };

    analyst = () => {
        // if (startDate && endDate) {
            // console.log(startDate, endDate, activeUser.key)
            console.log("10/09/2023 > 17/09/2023", "10/09/2023" > "17/09/2023")
            console.log("19/09/2023 > 17/09/2023", "19/09/2023" > "17/09/2023")
            console.log("10/12/2023 > 17/09/2023", "10/12/2023" > "17/09/2023")
            console.log("10/01/2023 > 17/09/2023", "10/01/2023" > "17/09/2023")
            console.log("-----------------------------------------------------")
            console.log("2023-09-10 > 2023-09-17", "2023-09-10" > "2023-09-17")
            console.log("2023-09-19 > 2023-09-17", "2023-09-19" > "2023-09-17")
            console.log("2023-12-10 > 2023-09-17", "2023-09-19" > "2023-09-17")
            console.log("2023-01-10 > 2023-09-17", "2023-09-19" > "2023-09-17")

            const start = parseDate(startDate);
            const end = parseDate(endDate);

            const abnormalColor = [
                {color: "สีแดงส้ม", tips: "A"}, 
                {color: "สีชมพู", tips: "B"}, 
                {color: "สีแดงอมเทาปนเขียว", tips: "C"}, 
                {color: "สีดำ", tips: "D"},
            ];
            const colorCheck = abnormalColor.map(item => item.color);

            const abnormalNotes = [
                {note: "มีกลิ่น อาการคัน", tips: "AA"}, 
                {note: "ปวดท้องอย่างรุนแรง", tips: "BB"}, 
                {note: "มีลิ่มเลือดก้อนใหญ่กว่า 1 นิ้ว", tips: "CC"},  
                {note: "ประจำเดือนมานานเกิน 8 วัน", tips: "DD"}, 
            ];
            const notesCheck = abnormalNotes.map(item => item.note);

            const colorDoc = firebase.firestore().collection("dailyRecord")
            .where("date", ">=", startDate)
            .where("date", "<=", endDate)
            .where("user_id", "==", activeUser.key ? activeUser.key : route.params.activeUser)
            .where("menstrual_color", "in", colorCheck)

            const unsubscribeColor = colorDoc.onSnapshot((querySnapshot) => {
                const allData = [];
                querySnapshot.forEach((res) => {
                    // console.log(res)
                    const { 
                        date, 
                        menstrual_color,
                    } = res.data();
                    const colorTips = abnormalColor.find(item => item.color === menstrual_color)?.tips;
                    allData.push({ 
                        key: res.id,
                        date, 
                        menstrual_color,
                        colorTips,
                    });
                });
                console.log(allData)
                setQueryColorResult(allData);
                // console.log(queryColorResult)
            },
            (error) => {}
            );

            const notesDoc = firebase.firestore().collection("dailyRecord")
            .where("date", ">=", startDate)
            .where("date", "<=", endDate)
            .where("user_id", "==", activeUser.key ? activeUser.key : route.params.activeUser)
            .where("menstrual_notes", "array-contains-any", notesCheck)

            const unsubscribeNotes = notesDoc.onSnapshot((querySnapshot) => {
                const allData = [];
                querySnapshot.forEach((res) => {
                    // console.log(res)
                    const { 
                        date, 
                        menstrual_notes,
                    } = res.data();

                    const filteredNotes = menstrual_notes.filter(note => notesCheck.includes(note));
                    const noteTips = filteredNotes.map(note => {
                        const matchingNote = abnormalNotes.find(item => item.note === note);
                        return matchingNote ? matchingNote.tips : "";
                    });

                    allData.push({ 
                        key: res.id,
                        date, 
                        menstrual_notes: filteredNotes,
                        noteTips
                    });
                });
                setQueryNotesResult(allData);
                // console.log(queryNotesResult)
            },
            (error) => {}
            );

            return () => {
                unsubscribeColor();
                unsubscribeNotes();
            };
        // }
    }

    addAccount = () => {
        const historyCollection = firebase.firestore().collection("histories");
        historyCollection.add({
            date: getDate(new Date()),
            details: showResult() + ""
        })
        .then((res) => {
            
        });
    }

    showResult = () => {
        return (
            <View style={{ width: 330}}>
                <View style={{ marginTop: 10 }}>
                    {((queryColorResult.length > 0) && (queryNotesResult.length > 0)) ? (
                        <>
                            <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>เราตรวจพบว่าคุณมีสีประจำเดือน</Text>
                            <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>ที่ผิดปกติเป็นเวลา {queryColorResult.length} วัน </Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                colors={['#9F79EB', '#FC7D7B']}
                                style={{
                                    borderRadius: 10, 
                                    padding: 2, 
                                    marginTop: 2,
                                }}
                            >
                            </LinearGradient>
                            {queryColorResult.map((item, i) => (   
                                <View key={i} style={styles.border}>
                                    <Text style={[styles.text, {marginTop: 15, fontFamily:'MitrMedium'}]}>{"   "}{item.date}</Text>
                                    <Text style={[styles.text, {marginVertical: 3}]}>{"     \u2022 "}{item.menstrual_color}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                        <MaterialCommunityIcons
                                            name={'alert-circle'}
                                            size={15}
                                            color='#9F79EB'
                                            style={{ marginRight: 5, marginTop: 2 }}
                                        />
                                        <Text style={[styles.text, { color: '#9F79EB' }]}>
                                        คำแนะนำ: {item.colorTips}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                            <Text></Text>

                            <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>และ {queryNotesResult.length} อาการร่วมอื่น ๆ ที่พบเจอ</Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                colors={['#9F79EB', '#FC7D7B']}
                                style={{
                                    borderRadius: 10, 
                                    padding: 2, 
                                    marginTop: 2,
                                }}
                            >
                            </LinearGradient>
                            {queryNotesResult.map((item, i) => (
                                <View key={i}>
                                    <Text style={[styles.text, {marginTop: 15, fontFamily:'MitrMedium'}]}>{"   "}{item.date}</Text>
                                    {item.menstrual_notes.map((note, j) => (
                                        <Text style={[styles.text, {marginVertical: 3}]} key={j}>{"     \u2022 "}{note}</Text>
                                    ))}
                                    {item.noteTips.map((tip, k) => (
                                        <View key={k} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                            <MaterialCommunityIcons
                                                name={'alert-circle'}
                                                size={15}
                                                color='#9F79EB'
                                                style={{ marginRight: 5, marginTop: 2 }}
                                            />
                                            <Text style={[styles.text, { color: '#9F79EB' }]}>คำแนะนำ: {tip}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </>
                    ) : ((queryColorResult.length > 0) && (queryNotesResult.length <= 0)) ? (
                        <>
                            <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>เราตรวจพบว่าคุณมีสีประจำเดือน</Text>
                            <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>ที่ผิดปกติเป็นเวลา {queryColorResult.length} วัน </Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                colors={['#9F79EB', '#FC7D7B']}
                                style={{
                                    borderRadius: 10, 
                                    padding: 2, 
                                    marginTop: 2,
                                }}
                            >
                            </LinearGradient>
                            {queryColorResult.map((item, i) => (   
                                <View key={i} style={styles.border}>
                                    <Text style={[styles.text, {marginTop: 15, fontFamily:'MitrMedium'}]}>{"   "}{item.date}</Text>
                                    <Text style={[styles.text, {marginVertical: 3}]}>{"     \u2022 "}{item.menstrual_color}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                        <MaterialCommunityIcons
                                            name={'alert-circle'}
                                            size={15}
                                            color='#9F79EB'
                                            style={{ marginRight: 5, marginTop: 2 }}
                                        />
                                        <Text style={[styles.text, { color: '#9F79EB' }]}>
                                        คำแนะนำ: {item.colorTips}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </>
                    ) : ((queryColorResult.length <= 0) && (queryNotesResult.length > 0)) ? (
                        <>
                            <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>และ {queryNotesResult.length} อาการร่วมอื่น ๆ ที่พบเจอ</Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                colors={['#9F79EB', '#FC7D7B']}
                                style={{
                                    borderRadius: 10, 
                                    padding: 2, 
                                    marginTop: 2,
                                }}
                            >
                            </LinearGradient>
                            {queryNotesResult.map((item, i) => (
                                <View key={i}>
                                    <Text style={[styles.text, {marginTop: 15, fontFamily:'MitrMedium'}]}>{"   "}{item.date}</Text>
                                    {item.menstrual_notes.map((note, j) => (
                                        <Text style={[styles.text, {marginVertical: 3}]} key={j}>{"     \u2022 "}{note}</Text>
                                    ))}
                                    {item.noteTips.map((tip, k) => (
                                        <View key={k} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                            <MaterialCommunityIcons
                                                name={'alert-circle'}
                                                size={15}
                                                color='#9F79EB'
                                                style={{ marginRight: 5, marginTop: 2 }}
                                            />
                                            <Text style={[styles.text, { color: '#9F79EB' }]}>คำแนะนำ: {tip}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </>
                    ) : (
                        <View>
                            <Text style={[styles.text, { fontFamily: 'MitrMedium', fontSize: 17 }]}>
                                เราไม่พบความผิดปกติใด ๆ ในรอบประจำเดือนของคุณ ขอให้รักษาสุขภาพที่ดีนี้ต่อไปและมีร่างกายที่สมบูรณ์แข็งเสมอนะ !
                            </Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                colors={['#9F79EB', '#FC7D7B']}
                                style={{
                                    borderRadius: 10, 
                                    padding: 2, 
                                    marginTop: 15,
                                }}
                            >
                            </LinearGradient>
                        </View>
                    )}
                    
                    <Text></Text>
                    <Text style={styles.helper}>หมายเหตุ : การวิเคราะห์ดังกล่าวเป็นเพียงส่วนหนึ่งสำหรับการติดตามและเข้าใจความผิดปกติของรอบประจำเดือนของคุณ อย่างไรก็ตาม หากคุณรู้สึกว่ามีปัญหาหรือความกังวลใด ๆ ควรปรึกษาแพทย์เพิ่มเติม</Text>
                    
                </View>
            </View>
        )
    }

    return (
        <View style={styles.tabContainer}>
            <ScrollView contentContainerStyle={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20}}>
                    <TextInput 
                        style={[styles.input, {width: 240}]} 
                        theme={{ 
                            roundness: 50, 
                            colors: { onSurfaceVariant: 'grey'} 
                        }} 
                        underlineColor="transparent"
                        activeUnderlineColor="grey"
                        textColor={canAnalyst ? "black" : "grey"}
                        editable={false}

                        label="วันเริ่มต้น"
                        onChangeText={(val) => {
                            setStartDate(val)
                        }}
                        value={startDate ? startDate + '' : ''}
                    />
                    <MaterialCommunityIcons 
                        name={'calendar'} 
                        size={24} 
                        color={canAnalyst ? "grey" : "lightgrey"}
                        onPress={() => {
                            {canAnalyst ? setIsStartDatePickerVisible(!isStartDatePickerVisible) : ''}
                        }}
                        style={{fontSize: 40, marginRight: 20, marginTop: 22}}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={isStartDatePickerVisible}
                    mode="date"
                    maximumDate={new Date()}                 
                    
                    onConfirm={(date) => {
                        setStartDate(date)
                        setFullDate(date)
                        console.log("full : ", fullDate )
                        const format = this.getDate(date)
                        setStartDate(format)
                        console.log("start date : " + startDate)
                        setIsStartDatePickerVisible(!isStartDatePickerVisible)
                    }}
                    onCancel={() => {
                        setIsStartDatePickerVisible(!isStartDatePickerVisible)
                    }}
                />

                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <TextInput 
                        style={[styles.input, {width: 240}]} 
                        theme={{ 
                            roundness: 50, 
                            colors: { onSurfaceVariant: 'grey'} 
                        }} 
                        underlineColor="transparent"
                        activeUnderlineColor="grey"
                        textColor={canAnalyst ? "black" : "grey"}
                        editable={false}

                        label="วันสิ้นสุด"
                        onChangeText={(val) => {
                            setEndDate(val)
                        }}
                        value={endDate ? endDate + '' : ''}
                    />
                    <MaterialCommunityIcons 
                        name={'calendar'} 
                        size={24} 
                        color={canAnalyst ? "grey" : "lightgrey"}
                        onPress={() => {
                            {canAnalyst ? setIsEndDatePickerVisible(!isEndDatePickerVisible) : ''}
                        }}
                        style={{fontSize: 40, marginRight: 20, marginTop: 22}}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="date"
                    minimumDate={fullDate}
                    maximumDate={new Date()}
                    
                    onConfirm={(date) => {
                        setEndDate(date)
                        const format = this.getDate(date)
                        setEndDate(format)
                        console.log("end date : " + endDate)
                        setIsEndDatePickerVisible(!isEndDatePickerVisible)

                    }}
                    onCancel={() => {
                        setIsEndDatePickerVisible(!isEndDatePickerVisible)
                    }}
                />

                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={canAnalyst ? ['#9F79EB', '#FC7D7B',] : ['#9F79EB80', '#FC7D7B80',]}
                    style={styles.linearGradient}
                >
                    <TouchableOpacity 
                        style={styles.button}
                        disabled={!canAnalyst}
                        onPress={() => {
                            if(startDate != null && endDate != null) {
                                setCanAnalyst(false)
                                setIsShowResult(true)
                                analyst()
                                addAccount()
                            }
                            else {
                                alert('โปรดระบุข้อมูลให้ครบถ้วน')
                            }
                        }}
                    >
                    <Text style={styles.textButton}>เริ่มต้นวิเคราะห์</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {!canAnalyst && <TouchableOpacity 
                    style={ styles.againContainer }
                    onPress={() => {
                        setCanAnalyst(true)
                        setIsShowResult(false)
                        console.log(canAnalyst)
                        console.log(isShowResult)
                    }}
                >
                    <MaterialCommunityIcons 
                        name={'restore'} 
                        size={25} 
                        color='#9F79EB'
                        style={{ marginRight: 5 }}
                    />
                    <Text style={styles.again}>วิเคราะห์อีกครั้ง</Text>
                </TouchableOpacity>}      

                {isShowResult ? showResult() : ""}

            </ScrollView>
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
    button: {
        alignItems: 'center',
        height: 55,
        width: 300,
        borderRadius: 50,
        justifyContent: 'center',
        bottom: 0,
    },
    textButton: {
        color:"white", 
        fontSize: 20,
        fontFamily: 'MitrMedium',
    },
    linearGradient: {
        width: 300,
        height: 50,
        marginVertical: 20,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center"
    },
    text: {
        color: "black",
        fontSize: 16,
        fontFamily: 'MitrRegular',
        flexWrap: 'wrap',
    },
    helper: {
        width: 330,
        fontFamily: 'MitrRegular',
        color: '#FC7D7B',
        marginBottom: 30,
    },
    again: {
        color: '#9F79EB',
        fontSize: 16,
        fontFamily: 'MitrRegular',
    },
    againContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: -10,
        marginBottom: 10,
    },
});

export default AnalysisTab;

