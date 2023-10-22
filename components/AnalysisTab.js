import React, { useState } from 'react'
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

import AnalysisResult from './AnalysisResult';

const AnalysisTab = () => {
    const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [fullDate, setFullDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showResult, setShowResult] = useState(false);

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

    return (
        <View style={styles.tabContainer}>
            <ScrollView contentContainerStyle={{ width: '100%' }}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20}}>
                    <TextInput 
                        style={[styles.input, {width: 240}]} 
                        theme={{ 
                            roundness: 50, 
                            colors: { onSurfaceVariant: 'grey'} 
                        }} 
                        underlineColor="transparent"
                        activeUnderlineColor="grey"
                        textColor="black"
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
                    color="grey"
                    onPress={() => {
                        setIsStartDatePickerVisible(!isStartDatePickerVisible)
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
                        textColor="black"
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
                    color="grey"
                    onPress={() => {
                        setIsEndDatePickerVisible(!isEndDatePickerVisible)
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
                        console.log(fullDate)
                        console.log("end date : " + endDate)
                        setIsEndDatePickerVisible(!isEndDatePickerVisible)

                    }}
                    onCancel={() => {
                        setIsEndDatePickerVisible(!isEndDatePickerVisible)
                    }}
                />

                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={['#9F79EB', '#FC7D7B',]}
                    style={styles.linearGradient}
                >
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            if(startDate != null && endDate != null) {
                                setShowResult(true)
                            }
                            else {
                                alert('โปรดระบุข้อมูลให้ครบถ้วน')
                            }
                        }}
                    >
                    <Text style={styles.textButton}>เริ่มต้นวิเคราะห์</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {showResult && <AnalysisResult startDate={startDate} endDate={endDate}/>}
                {/* <AnalysisResult startDate={startDate} endDate={endDate}/> */}
            
            {/* {history_list.map((item, i) => {
                const timestamp = item.date;
                const rawDate = timestamp.toDate(); // Convert Firebase Timestamp to JavaScript Date
                const formattedDate = rawDate.toLocaleDateString('en-GB');

                return (
                <TouchableOpacity style={styles.boxList} key={i}>
                    <Text style={{textAlign: 'center'}}>
                    <Text>{formattedDate}</Text>
                    <Text>สถานะ : {item.status}</Text>
                    </Text>
                </TouchableOpacity>
                );
            })} */}
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
});

export default AnalysisTab;

