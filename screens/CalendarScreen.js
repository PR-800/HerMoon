import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { TimeDatePicker, Modes } from "react-native-time-date-picker";
import { LinearGradient } from 'expo-linear-gradient';

import moment from 'moment';
import CalendarStripC from '../components/CalendarStrip';

import EditInfo from '../components/EditInfo';


const CalendarScreen = () => {
  const now = moment().valueOf();

  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  const EditIcon = () => {
    setModalVisibleEdit(!modalVisibleEdit);
  };

  return (
    <View style={styles.screen}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 70, marginLeft: -200 }}>
        <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.todayText}>
          <Text style={{ fontSize: 24, color: "white", fontWeight: 'bold' }}>CALENDAR</Text>
        </LinearGradient>
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
          //   moment(selected).format("YYYY/MM/DD HH:mm"),
          // ); // 2022/04/13 13:35
        }}
        onTimeChange={(time) => {
          // console.log("time: ", time); // 1643331840000
          // console.log("time formatted: ", moment(time).format("HH:mm")); // 04:04
        }}
      />
      <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.box}>
        <View style={styles.textBox}>
          <Image
            source={require('../assets/Home/blood01-icon.png')}
          />
        </View>
        <View style={styles.textBox}>
          <Image style={{ marginTop: -5, marginLeft: -5 }}
            source={require('../assets/Home/sanitarypad02-icon.png')}
          />
        </View>
        <View style={styles.textBox}>
          <Image
            source={require('../assets/Home/notes02-icon.png')}
          />
        </View>
        <TouchableOpacity onPress={EditIcon}>
          <Image style={{ marginLeft: 235, marginVertical: 10 }}
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
  }
});

export default CalendarScreen
