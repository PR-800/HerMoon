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
    const [queryDetailResult, setQueryDetailResult] = useState([]);
    const [activeUser, setActiveUser] = useState({});
    const [dataPreapare, setDataPreapare] = useState();
    const [detail, setDetail] = useState();

    const route = useRoute();

    useEffect(() => {
        { route.params.activeUser ? setActiveUser(route.params.activeUser) : ""}

        if(isShowResult) {
            prepareData()
        }

        if (route.params.activeUser) {
            const accountDoc = firebase.firestore().collection("accounts")
            .doc(route.params.activeUser.key);
      
            accountDoc.get().then((res) => {
                if (res.exists) {
                    const doc = res.data();
                    setDetail(doc.detail);
                }
                else {
                    
                }
            });
        }
        
    }, [isShowResult, queryColorResult, queryNotesResult]);

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
        if (dateString && typeof dateString === 'string') {
            const parts = dateString.split('/');
            if (parts.length === 3) {
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);
            
                if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                    return new Date(year, month - 1, day);
                }
            }
            return null;
        }
    };

    analyst = () => {
        const abnormalColor = [
            {color: "สีแดงส้ม", tips: "ควรระวังเป็นพิเศษ มีความเสี่ยงติดเชื้อในช่องคลอด หรือโรคติดต่อทางเพศสัมพันธ์ แนะนำให้รีบพบแพทย์"}, 
            {color: "สีชมพู", tips: "อาจเกิดจากบาดแผลภายใน หรือการผันผวนของระดับฮอร์โมนเอสโตรเจนต่ำ ซึ่งเป็นสัญญาณของการตั้งท้องอ่อน ๆ"}, 
            {color: "สีแดงอมเทาปนเขียว", tips: "อาจเกิดจากการติดเชื้อแบคทีเรีย การติดเชื้อในอุ้งเชิงกราน"}, 
            {color: "สีดำ", tips: "เป็นเพียงเลือดตกค้างในร่างกายเป็นระยะเวลานาน แต่มีความเป็นไปได้ที่อาจเกี่ยวข้องกับปัญหาสุขภาพหรือการติดเชื้อแบคทีเรีย"},
        ];
        const colorCheck = abnormalColor.map(item => item.color);

        const abnormalNotes = [
            {note: "มามาก เปลี่ยนทุกชม.", tips: "อาจเกิดจากความเครียด ความไม่สมดุลของฮอร์โมน หรือความผิดปกติของระบบอวัยวะสืบพันธุ์"},
            {note: "มาน้อย ไม่เคยเต็มผ้าอนามัย", tips: "อาจเกิดจากความเครียด ความไม่สมดุลของฮอร์โมน หรือภาวะเลือดออกในช่องคลอด แนะนำให้ควบคุมน้ำหนัก รับประทานอาหารที่มีประโยชน์"},
            {note: "มีกลิ่น", tips: "อาจเกิดจากการติดเชื้อในช่องคลอด หมั่นดูแลและรักษาความสะอาด"}, 
            {note: "มีอาการคัน", tips: "อาจเกิดจากความอับชื้น แนะนำให้เปลี่ยนผ้าอนามัยบ่อย ๆ"}, 
            {note: "ปวดท้องอย่างรุนแรง", tips: "เกิดจากกล้ามเนื้อมดลูกบีบตัว แนะนำให้ใช้การประคบร้อน"}, 
            {note: "ปวดหลังส่วนล่างอย่างรุนแรง", tips: "อาจเป็นผลจากความผิดปกติในมดลูก รังไข่ หรือปีกมดลูก แนะนำให้อาบน้ำอุ่น หรืออาจใช้แผ่นแปะชนิดร้อนแปะ"}, 
            {note: "มีลิ่มเลือดก้อนใหญ่กว่า 1 นิ้ว", tips: "อาจมีเนื้องอก ซีสต์ หรือพังผืดในมดลูก พยายามลดความเครียด ดื่มน้ำมาก ๆ กินอาหารเสริมธาตุเหล็กและแคลเซียม"},  
            {note: "มีเลือดหยดช่วงที่ไม่มีประจำเดือน", tips: "อาจบ่งบอกถึงปัญหาสุขภาพ เช่น โรคติดต่อทางเพศสัมพันธ์ ปากมดลูกอักเสบ ช่องคลอดอักเสบ สามารถหายได้เอง"}, 
            {note: "ประจำเดือนมานานเกิน 8 วัน", tips: "เกิดจากระดับฮอร์โมนไม่สมดุล การตกไข่ไม่สม่ำเสมอ ควรปรึกษาแพทย์เพื่อตรวจสุขภาพและรับคำแนะนำ"}, 
        ];
        const notesCheck = abnormalNotes.map(item => item.note);

        const abnormalDetail = [
            {detail: "การใช้ยาคุมกำเนิด", tips: "สามารถมีผลต่อระบบประจำเดือนได้ขึ้นอยู่กับประเภทของยาและตัวยาเอง เช่น ประจำเดือนไม่มีหรือมีน้อยลง รอบประจำเดือนมีการเคลื่อนที่ ประจำเดือนหมดเร็วกว่าปกติ"}, 
            {detail: "โรคอ้วน", tips: "ส่งผลต่อระบบการทำงานของร่างกายและฮอร์โมนที่ควบคุมระบบประจำเดือน เช่น รอบเดือนมาไม่ปกติ อาการปวดรอบเดือนเพิ่มมากขึ้น ผลกระทบต่อสมดุลฮอร์โมน ประจำเดือนไม่มีหรือมีน้อยลง"}, 
            {detail: "โรคโลหิตจาง", tips: "มีสาเหตุจากขาดฮีมโฟลิลิสในระบบโลหิต ซึ่งมีผลต่อการมีประจำเดือน เช่น รอบเดือนมีระยะเวลายาวนานกว่าปกติ รอบเดือนมีปริมาณมาก มีอาการปวดท้องกว่าปกติ"}, 
            {detail: "โรคกระดูกพรุน", tips: "การมีรอบประจำเดือนแปรปรวน การมีปริมาณประจำเดือนมากขึ้นหรือน้อยลงผิดปกติ มีอาการปวดท้องรุนแรง"},
            {detail: "โรคต่อมใต้สมองขาดเลือด", tips: "ประจำเดือนไม่มา รอบประจำเดือนยาวหรือสั้นลง รอบเดือนมีการเคลื่อนที่ การควบคุมฮอร์โมน"},
            {detail: "โรคเกี่ยวกับต่อมไทรอยด์", tips: "อาจส่งผลให้เกิดประจำเดือนขาดหรือมามากผิดปกติได้ แต่เมื่อรักษาจนฮอร์โมนไทรอยด์คงที่แล้ว ประจำเดือนจะเริ่มกลับมาเป็นปกติอีกครั้ง"},
            {detail: "โรคช็อกโกแลตซีสต์", tips: "เกิดการปวดท้องประจำเดือนอย่างรุนแรง ประจำเดือนมามาก และมีบุตรยาก พบในสตรีวัยเจริญพันธุ์"},
            {detail: "โรคเยื่อบุในมดลูกเจริญผิดที่", tips: "มีอาการปวดท้องน้อยบริเวณอุ้งเชิงกราน โดยจะมีอาการปวดเกร็งเกิดขึ้นในช่วงมีประจำเดือน ในหลายรายมีอาการหนัก และอาการปวดอาจเพิ่มขึ้นเรื่อย ๆ ในแต่ละรอบประจำเดือน "},
            {detail: "ประจำเดือนไม่ค่อยมาตามรอบ", tips: "อาจเกิดขึ้นเนื่องจากความผันผวนของระดับฮอร์โมนในร่างกาย ซึ่งอาจส่งผลกระทบต่อระบบการมีบุตร"},
            {detail: "มีการใช้ยาฮอร์โมน", tips: "ทำให้ประจำเดือนมีการเปลี่ยนแปลง มามาก มาน้อย หรืออาจไม่มาเลย การรักษาปัญหาสุขภาพ การรักษาโรคและอาการอื่นๆ"},
            {detail: "มีฮอร์โมนเอสโตเจนต่ำ", tips: "ทำให้ประจำเดือนมาไม่สม่ำเสมอ ทำให้เกิดอาการก่อนมีประจำเดือนผิดปกติ เช่น อยากรับประทานของหวาน ตัวบวม น้ำหนักขึ้นไว ปวดไมเกรน คัดตึงเต้านม"},
        ];
        const detailCheck = abnormalDetail.map(item => item.detail);

        const colorDoc = firebase.firestore().collection("dailyRecord")
        .where("user_id", "==", activeUser.key ? activeUser.key : route.params.activeUser)
        .where("menstrual_color", "in", colorCheck)

        const unsubscribeColor = colorDoc.onSnapshot((querySnapshot) => {
            const allData = [];
            querySnapshot.forEach((res) => {
                const { 
                    date, 
                    menstrual_color,
                } = res.data();
                const colorTips = abnormalColor.find(item => item.color === menstrual_color)?.tips;
                if (parseDate(date) >= parseDate(startDate) && parseDate(date) <= parseDate(endDate)) {
                    allData.push({ 
                        key: res.id,
                        date, 
                        menstrual_color,
                        colorTips,
                    });
                }   
            });
            setQueryColorResult(allData);
        },
        (error) => {}
        );

        const notesDoc = firebase.firestore().collection("dailyRecord")
        .where("user_id", "==", activeUser.key ? activeUser.key : route.params.activeUser)
        .where("menstrual_notes", "array-contains-any", notesCheck)

        const unsubscribeNotes = notesDoc.onSnapshot((querySnapshot) => {
            const allData = [];
            querySnapshot.forEach((res) => {
                const { 
                    date, 
                    menstrual_notes,
                } = res.data();

                const filteredNotes = menstrual_notes.filter(note => notesCheck.includes(note));
                const noteTips = filteredNotes.map(note => {
                    const matchingNote = abnormalNotes.find(item => item.note === note);
                    return matchingNote ? matchingNote.tips : "";
                });
                if (parseDate(date) >= parseDate(startDate) && parseDate(date) <= parseDate(endDate)) {
                    allData.push({ 
                        key: res.id,
                        date, 
                        menstrual_notes: filteredNotes,
                        noteTips
                    });
                }
            });
            setQueryNotesResult(allData);
        },
        (error) => {}
        );

        detail.forEach((detail, i) => {
            const isDetailInDetailCheck = detailCheck.includes(detail);
        
            if (isDetailInDetailCheck) {
                const matchingDetail = abnormalDetail.find(item => item.detail === detail);
                if (matchingDetail) {
                    const { detail, tips } = matchingDetail;
                    const allDetailData = {
                        key: i, 
                        detail: detail,
                        detailTips: tips
                    };
                    queryDetailResult.push(allDetailData);
                } 
            } 
        });

        return () => {
            unsubscribeColor();
            unsubscribeNotes();
        };
    }

    prepareData = () => {
        setDataPreapare({
            date: getDate(new Date()),
            timeStamp: new Date(),
            startDate: startDate,
            endDate: endDate,
            queryColorResult: queryColorResult,
            queryNotesResult: queryNotesResult,
            queryDetailResult: queryDetailResult,
            user_id: activeUser.key
        })
    }

    addHistory = () => {
        const historyCollection = firebase.firestore().collection("histories");
        historyCollection
        .add(dataPreapare)
        .then((res) => {});
    }

    const showResult = () => {
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
                            {queryColorResult
                                .sort((a, b) => parseDate(b.date) - parseDate(a.date))
                                .map((item, i) => (   
                                <View key={i}>
                                    <Text style={[styles.text, {marginTop: 15, fontFamily:'MitrMedium'}]}>{"   "}{item.date}</Text>
                                    <Text style={[styles.text, {marginVertical: 3}]}>{"     \u2022 "}{item.menstrual_color}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20 }}>
                                        <MaterialCommunityIcons
                                            name={'alert-circle'}
                                            size={15}
                                            color='#9F79EB'
                                            style={{ marginRight: 5, marginTop: 5 }}
                                        />
                                        <Text style={[styles.text, { color: '#9F79EB', width: 285 }]}>
                                        คำแนะนำ: {item.colorTips}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                            <Text></Text>

                            <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>และอาการร่วมอื่น ๆ ที่พบเจอ</Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                colors={['#9F79EB', '#FC7D7B']}
                                style={{
                                    borderRadius: 10, 
                                    padding: 2, 
                                    marginTop: 2,
                                }}
                            >
                            </LinearGradient>
                            {queryNotesResult
                                .sort((a, b) => parseDate(b.date) - parseDate(a.date))
                                .map((item, i) => (
                                <View key={i}>
                                    <Text style={[styles.text, { marginTop: 15, fontFamily: 'MitrMedium' }]}>{"   "}{item.date}</Text>
                                    {item.menstrual_notes.map((note, j) => (
                                        <View key={j}>
                                            <Text style={[styles.text, { marginVertical: 3 }]}>{"     \u2022 "}{note}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20 }}>
                                                <MaterialCommunityIcons
                                                    name={'alert-circle'}
                                                    size={15}
                                                    color='#9F79EB'
                                                    style={{ marginRight: 5, marginTop: 5 }}
                                                />
                                                <Text style={[styles.text, { color: '#9F79EB', width: 285 }]}>คำแนะนำ: {item.noteTips[j]}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ))}

                            {queryDetailResult.length > 0? (
                                <>
                                    <Text></Text>
                                    <View>
                                        <Text style={[styles.text, { fontFamily: 'MitrMedium', fontSize: 17}]}>
                                            นอกจากนี้ ยังมี {queryDetailResult.length} ปัจจัยอื่นที่อาจส่งผลกระทบต่อการมีประจำเดือนของคุณ
                                        </Text>
                                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                            colors={['#9F79EB', '#FC7D7B']}
                                            style={{
                                                borderRadius: 10, 
                                                padding: 2, 
                                                marginTop: 2,
                                            }}
                                        >
                                        </LinearGradient>
                                        {queryDetailResult
                                            .map((item, i) => (
                                            <View key={i}>
                                                <Text style={[styles.text, { marginTop: 15, fontFamily: 'MitrMedium' }]}>{" \u2022 "}{item.detail}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20 }}>
                                                <MaterialCommunityIcons
                                                    name={'alert-circle'}
                                                    size={15}
                                                    color='#9F79EB'
                                                    style={{ marginRight: 5, marginTop: 5 }}
                                                />
                                                <Text style={[styles.text, { color: '#9F79EB', width: 285 }]}>ผลกระทบ: {item.detailTips}</Text>
                                        </View>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : ""}  
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
                            {queryColorResult
                                .sort((a, b) => parseDate(b.date) - parseDate(a.date))
                                .map((item, i) => (   
                                <View key={i}>
                                    <Text style={[styles.text, {marginTop: 15, fontFamily:'MitrMedium'}]}>{"   "}{item.date}</Text>
                                    <Text style={[styles.text, {marginVertical: 3}]}>{"     \u2022 "}{item.menstrual_color}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20 }}>
                                        <MaterialCommunityIcons
                                            name={'alert-circle'}
                                            size={15}
                                            color='#9F79EB'
                                            style={{ marginRight: 5, marginTop: 5 }}
                                        />
                                        <Text style={[styles.text, { color: '#9F79EB', width: 285 }]}>
                                        คำแนะนำ: {item.colorTips}
                                        </Text>
                                    </View>
                                </View>
                            ))}

                            {queryDetailResult.length > 0? (
                                <>
                                    <Text></Text>
                                    <View>
                                        <Text style={[styles.text, { fontFamily: 'MitrMedium', fontSize: 17}]}>
                                            นอกจากนี้ ยังมี {queryDetailResult.length} ปัจจัยอื่นที่อาจส่งผลกระทบต่อการมีประจำเดือนของคุณ
                                        </Text>
                                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                            colors={['#9F79EB', '#FC7D7B']}
                                            style={{
                                                borderRadius: 10, 
                                                padding: 2, 
                                                marginTop: 2,
                                            }}
                                        >
                                        </LinearGradient>
                                        {queryDetailResult
                                            .map((item, i) => (
                                            <View key={i}>
                                                <Text style={[styles.text, { marginTop: 15, fontFamily: 'MitrMedium' }]}>{" \u2022 "}{item.detail}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20 }}>
                                                <MaterialCommunityIcons
                                                    name={'alert-circle'}
                                                    size={15}
                                                    color='#9F79EB'
                                                    style={{ marginRight: 5, marginTop: 5 }}
                                                />
                                                <Text style={[styles.text, { color: '#9F79EB', width: 285 }]}>ผลกระทบ: {item.detailTips}</Text>
                                        </View>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : ""}  
                        </>
                    ) : ((queryColorResult.length <= 0) && (queryNotesResult.length > 0)) ? (
                        <>
                            <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>เราตรวจพบว่าคุณมีอาการร่วมอื่น ๆ ที่สามารถพบเจอได้ในระหว่างเป็นประจำเดือน</Text>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                colors={['#9F79EB', '#FC7D7B']}
                                style={{
                                    borderRadius: 10, 
                                    padding: 2, 
                                    marginTop: 2,
                                }}
                            >
                            </LinearGradient>
                            {queryNotesResult
                                .sort((a, b) => parseDate(b.date) - parseDate(a.date))
                                .map((item, i) => (
                                <View key={i}>
                                    <Text style={[styles.text, { marginTop: 15, fontFamily: 'MitrMedium' }]}>{"   "}{item.date}</Text>
                                    {item.menstrual_notes.map((note, j) => (
                                        <View key={j}>
                                            <Text style={[styles.text, { marginVertical: 3 }]}>{"     \u2022 "}{note}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20 }}>
                                                <MaterialCommunityIcons
                                                    name={'alert-circle'}
                                                    size={15}
                                                    color='#9F79EB'
                                                    style={{ marginRight: 5, marginTop: 5 }}
                                                />
                                                <Text style={[styles.text, { color: '#9F79EB', width: 285 }]}>คำแนะนำ: {item.noteTips[j]}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ))}

                            {queryDetailResult.length > 0? (
                                <>
                                    <Text></Text>
                                    <View>
                                        <Text style={[styles.text, { fontFamily: 'MitrMedium', fontSize: 17}]}>
                                            นอกจากนี้ ยังมี {queryDetailResult.length} ปัจจัยอื่นที่อาจส่งผลกระทบต่อการมีประจำเดือนของคุณ
                                        </Text>
                                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                            colors={['#9F79EB', '#FC7D7B']}
                                            style={{
                                                borderRadius: 10, 
                                                padding: 2, 
                                                marginTop: 2,
                                            }}
                                        >
                                        </LinearGradient>
                                        {queryDetailResult
                                            .map((item, i) => (
                                            <View key={i}>
                                                <Text style={[styles.text, { marginTop: 15, fontFamily: 'MitrMedium' }]}>{" \u2022 "}{item.detail}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 20 }}>
                                                <MaterialCommunityIcons
                                                    name={'alert-circle'}
                                                    size={15}
                                                    color='#9F79EB'
                                                    style={{ marginRight: 5, marginTop: 5 }}
                                                />
                                                <Text style={[styles.text, { color: '#9F79EB', width: 285 }]}>ผลกระทบ: {item.detailTips}</Text>
                                        </View>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : ""}                    
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
                        const format = this.getDate(date)
                        setStartDate(format)
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
                        name={'calendar'} isShowResult
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
                                setTimeout(() => {
                                    addHistory()
                                }, 1000);
                                
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
