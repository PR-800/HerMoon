import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { TimeDatePicker, Modes } from "react-native-time-date-picker";
import moment from 'moment';


const CalendarScreen = () => {
  const now = moment().valueOf();
  return (
    <View style={styles.screen}>

      <TimeDatePicker
        selectedDate={now}
        mode={Modes.date}
        onMonthYearChange={(month) => {
          console.log("month: ", month); // 1643366100000
          console.log("month formatted: ", moment(month).format("MM")); // 04
          console.log("month formatted: ", moment(month).format("MMM")); // Apr
          console.log("month formatted: ", moment(month).format("MMMM")); // April
        }}
        onSelectedChange={(selected) => {
          console.log("selected Date: ", selected); // 1649846100000
          console.log(
            "selected date formatted: ",
            moment(selected).format("YYYY/MM/DD HH:mm"),
          ); // 2022/04/13 13:35
        }}
        onTimeChange={(time) => {
          console.log("time: ", time); // 1643331840000
          console.log("time formatted: ", moment(time).format("HH:mm")); // 04:04
        }}
      />
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
});

export default CalendarScreen
