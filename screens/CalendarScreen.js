import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { TimeDatePicker, Modes } from "react-native-time-date-picker";
import { LinearGradient } from 'expo-linear-gradient';

import firebase from '../data/firebaseDB';

import moment from 'moment';

import EditInfo from '../components/EditInfo';


const CalendarScreen = () => {
  const databaseRef = firebase.firestore().collection("monthly_summary");


  const [dataMSummary, setDataMSummary] = useState({});

  useEffect(() => {
    const unsubscribe = databaseRef.onSnapshot((querySnapshot) => {
      const dataMSummary = {};
      querySnapshot.forEach((doc) => {
        dataMSummary[doc.id] = doc.data()
      });
      setDataMSummary(dataMSummary)
    });

    return () => {
      unsubscribe(); // ถอดการติดตามเมื่อคอมโพเนนต์ถูกทำลาย
    };
  }, []);


  const now = moment().valueOf();

  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [dateTime, setdateTime] = useState('วันที่และเวลา')

  const EditIcon = () => {
    setModalVisibleEdit(!modalVisibleEdit);
  };

  return (

    <View style={styles.screen}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginLeft: -200 }}>
        <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.todayText}>
          <Text style={{ fontSize: 24, color: "white", fontFamily: 'MitrRegular', }}>Calendar</Text>
        </LinearGradient>
      </View>
      <View>
        <View>
        </View>
      </View>
      <TimeDatePicker
        selectedDate={now}
        mode={Modes.date}
        onMonthYearChange={(month) => {
          // console.log("month: ", month); // 1643366100000
          // console.log("month formatted: ", moment(month).format("MM")); // 04
          // console.log("month formatted: ", moment(month).format("MMM")); // Apr
          // console.log("month formatted: ", moment(month).format("MMMM")); // April
        }}
        onSelectedChange={(selected) => {
          // console.log("selected Date: ", selected); // 1649846100000
          // console.log(
          //   "selected date formatted: ",
          //   moment(selected).format("DD/MM/YYYY HH:mm"),
          // ); // 2022/04/13 13:35
          // setdateTime(moment(selected).format("DD/MM/YYYY"))
          setdateTime(moment(selected).format("DD/MM/YYYY"))
        }}
        onTimeChange={(time) => {
          // console.log("time: ", time); // 1643331840000
          // console.log("time formatted: ", moment(time).format("HH:mm")); // 04:04
        }}
      />

      <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.box}>
        <Text style={styles.textF}>date: {dateTime}</Text>
        <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
          <Image
            source={require('../assets/Home/blood01-icon.png')}
          />
          {Object.keys(dataMSummary).map(key => {
            const item = dataMSummary[key];
            if (item.date) { // ตรวจสอบว่า item.date ไม่ใช่ null
              const datedb = moment(item.date.toDate()).format("DD/MM/YYYY");
              if (dateTime == datedb) {
                return (
                  <View key={key} style={{ paddingTop: 4, paddingLeft: 15 }}>
                    <Text style={styles.textF}>{item.menstrual_color}</Text>
                  </View>
                );
              }
            }
          })}
        </View>
        <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
          <Image style={{ marginTop: -5, marginLeft: -5 }}
            source={require('../assets/Home/sanitarypad02-icon.png')}
          />
          {Object.keys(dataMSummary).map(key => {
            const item = dataMSummary[key];
            if (item.date) { // ตรวจสอบว่า item.date ไม่ใช่ null
              const datedb = moment(item.date.toDate()).format("DD/MM/YYYY");
              if (dateTime == datedb) {
                return (
                  <View key={key} style={{ paddingTop: 4, paddingLeft: 10 }}>
                    <Text style={styles.textF}>{item.menstrual_volume}</Text>
                  </View>
                );
              }
            }
          })}
        </View>
        <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
          <Image
            source={require('../assets/Home/notes02-icon.png')}
          />
          {Object.keys(dataMSummary).map(key => {
            const item = dataMSummary[key];
            if (item.date) { // ตรวจสอบว่า item.date ไม่ใช่ null
              const datedb = moment(item.date.toDate()).format("DD/MM/YYYY");
              if (dateTime == datedb) {
                return (
                  <View key={key} style={{ paddingTop: 4, paddingLeft: 15 }}>
                    <Text style={styles.textF}>{item.menstrual_notes}</Text>
                  </View>
                );
              }
            }
          })}
        </View>
        <TouchableOpacity onPress={EditIcon}>
          <Image style={{ marginLeft: 250, marginVertical: 10, width: 30, height: 30 }}
            source={require('../assets/Home/edit01-icon.png')}
          />
        </TouchableOpacity>
        <EditInfo visible={modalVisibleEdit} onClose={EditIcon} />
        <View >
        </View>
      </LinearGradient>

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  box: {
    width: 350,
    height: 230,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15
  },
  textBox: {
    margin: 5,
    backgroundColor: 'white',
    width: 300,
    height: 40,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  textF: {
    fontFamily: 'MitrRegular',
    fontSize: 16,
  },
});

export default CalendarScreen
