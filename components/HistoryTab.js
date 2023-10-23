import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    View,  
    ScrollView,  
    TouchableOpacity,
    Text
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem } from '@rneui/themed';

import { useNavigation, useRoute } from '@react-navigation/native';

import firebase from '../data/firebaseDB';

const HistoryTab = () => {
    const historyCollection = firebase.firestore().collection("histories");
    const [historyList, setHistoryList] = useState([]);
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [detailItems, setDetailItems] = useState([]);

    const getCollection = (querySnapshot) => {
        const allData = [];
        querySnapshot.forEach((res) => {
            const { 
                date,
                startDate,
                endDate,
                queryColorResult,
                queryNotesResult,
            } = res.data();
            allData.push({ 
                key: res.id, 
                date,
                startDate,
                endDate,
                queryColorResult,
                queryNotesResult,
            });
        });
        setHistoryList(allData);
    };

    useEffect(() => {
        const unsubscribe = historyCollection.onSnapshot(getCollection);

        return () => {
            unsubscribe();
        };

    }, []);

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

    showDetails = (detailItems) => {
        console.log(detailItems)        
        return (
            <>
                <TouchableOpacity 
                    style={styles.backButton}
                    width='80'
                    onPress={() => {
                        setIsViewDetails(false)
                    }}
                >
                    <MaterialCommunityIcons
                        name={'backspace'}
                        size={18}
                        color='#9F79EB'
                        style={{ marginRight: 8, marginTop: 7 }}
                    />
                    <Text style={[styles.text, { color: '#9F79EB', width: 285, fontSize: 17, marginTop: 2 }]}>
                        กลับ
                    </Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ width: '100%' }} showsVerticalScrollIndicator={false}>               
                    <View style={[styles.tabContainer, { marginTop: 10, width: 350 }]}>
                        {((detailItems.queryColorResult.length > 0) && (detailItems.queryNotesResult.length > 0)) ? (
                            <View>
                                <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>เราตรวจพบว่าคุณมีสีประจำเดือน</Text>
                                <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>ที่ผิดปกติเป็นเวลา {detailItems.queryColorResult.length} วัน </Text>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                    colors={['#9F79EB', '#FC7D7B']}
                                    style={{
                                        borderRadius: 10, 
                                        padding: 2, 
                                        marginTop: 2,
                                    }}
                                >
                                </LinearGradient>
                                {detailItems.queryColorResult.map((item, i) => (   
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
                                {detailItems.queryNotesResult.map((item, i) => (
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
                            </View>
                        ) : ((detailItems.queryColorResult.length > 0) && (detailItems.queryNotesResult.length <= 0)) ? (
                            <View>
                                <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>เราตรวจพบว่าคุณมีสีประจำเดือน</Text>
                                <Text style={[styles.text, {fontFamily: 'MitrMedium', fontSize: 17}]}>ที่ผิดปกติเป็นเวลา {detailItems.queryColorResult.length} วัน </Text>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                                    colors={['#9F79EB', '#FC7D7B']}
                                    style={{
                                        borderRadius: 10, 
                                        padding: 2, 
                                        marginTop: 2,
                                    }}
                                >
                                </LinearGradient>
                                {detailItems.queryColorResult.map((item, i) => (   
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
                            </View>
                        ) : ((detailItems.queryColorResult.length <= 0) && (detailItems.queryNotesResult.length > 0)) ? (
                            <View>
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
                                {detailItems.queryNotesResult.map((item, i) => (
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
                            </View>
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
                </ScrollView>
            </>
        )
    }

    return (
        <View style={styles.tabContainer}>
            {isViewDetails ? (
                showDetails(detailItems)
            ) : (
                    <ScrollView contentContainerStyle={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                        {historyList
                            .sort((a, b) => parseDate(b.date) - parseDate(a.date))
                            .map((item, i) => (
                            <View style={{flex: 1, width: 380 }} key={item.key}>
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => {
                                        setDetailItems(item)
                                        setIsViewDetails(true)
                                        console.log(item)
                                    }}
                                >
                                    <ListItem bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title style={styles.listTitle}>{item.startDate} - {item.endDate}</ListItem.Title>
                                            <ListItem.Subtitle style={styles.listSubTitle}>วันที่บันทึก {item.date}</ListItem.Subtitle>
                                        </ListItem.Content>
                                        <ListItem.Chevron color="black" />
                                    </ListItem>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )
            }
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
    listTitle: {
        fontSize: 17,
        fontFamily: 'MitrMedium',
    },
    listSubTitle: {
        fontSize: 16,
        fontFamily: 'MitrRegular',
        color: 'grey'
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
    backButton: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
        alignSelf: 'flex-start', 
        marginLeft: 35, 
        marginVertical: 15,

        width: 80,
    },
});

export default HistoryTab;