import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { TimeDatePicker, Modes } from "react-native-time-date-picker";
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../data/firebaseDB';
import moment from 'moment';

//import component
import EditInfo from '../components/EditInfo';


const CalendarScreen = () => {
  const databaseRef = firebase.firestore().collection("monthly_summary");//สำหรับเรียกข้อมูลใน firebase

  const [dataMSummary, setDataMSummary] = useState({});//เก็บข้อมูลทั้งหมดที่อยู่ใน firebase
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [dateTime, setdateTime] = useState('วันที่และเวลา')
  const now = moment().valueOf();

  //
  useEffect(() => {
    const unsubscribe = databaseRef.onSnapshot((querySnapshot) => {
      const dataMSummary = {};
      querySnapshot.forEach((doc) => {
        dataMSummary[doc.id] = doc.data()
      });
      setDataMSummary(dataMSummary)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //
  const EditIcon = () => {
    setModalVisibleEdit(!modalVisibleEdit);
  };

  //
  const renderData = (key) => {
    if (!dataMSummary || !dateTime) {
      return null;
    }

    //
    const itemsToRender = [];

    Object.keys(dataMSummary).forEach((itemKey) => {
      const item = dataMSummary[itemKey];
      if (item.date) {
        const datedb = moment(item.date.toDate()).format("DD/MM/YYYY");
        if (dateTime === datedb) {
          if (key === "color") {
            itemsToRender.push(
              <Text key={itemKey} style={styles.textNormal}>{item.menstrual_color}</Text>
            );
          } else if (key === "volume") {
            itemsToRender.push(
              <Text key={itemKey} style={styles.textNormal}>{item.menstrual_volume}</Text>
            );
          } else if (key === "notes") {
            itemsToRender.push(
              <Text key={itemKey} style={styles.textNormal}>{item.menstrual_notes}</Text>
            );
          }
        }
      }
    });
    return itemsToRender;
  };

  const selectedColor = renderData("color");
  const selectedVolume = renderData("volume");
  const selectedNotes = renderData("notes");

  return (

    <View style={styles.screen}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginLeft: -200 }}>
        <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.textHeader}>
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
        <Text style={styles.textNormal}>date: {dateTime}</Text>
        <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
          <Image
            source={require('../assets/Home/blood01-icon.png')}
          />
          <View style={{ paddingTop: 3, paddingLeft: 15 }}>
            <Text style={styles.textNormal}>{selectedColor}</Text>
          </View>
        </View>
        <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
          <Image style={{ marginTop: -5, marginLeft: -5 }}
            source={require('../assets/Home/sanitarypad02-icon.png')}
          />
          <View style={{ paddingTop: 4, paddingLeft: 10 }}>
            <Text style={styles.textNormal}>{selectedVolume}</Text>
          </View>
        </View>
        <View style={[styles.textBox, { flew: 0, flexDirection: 'row' }]}>
          <Image
            source={require('../assets/Home/notes02-icon.png')}
          />
          <View style={{ paddingTop: 4, paddingLeft: 15 }}>
            <Text style={styles.textNormal}>{selectedNotes}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={EditIcon}>
          <Image style={{ marginLeft: 250, marginVertical: 10, width: 30, height: 30 }}
            source={require('../assets/Home/edit01-icon.png')}
          />
        </TouchableOpacity>
        <EditInfo visible={modalVisibleEdit} onClose={EditIcon} selectedColor={selectedColor} selectedVolume={selectedVolume} selectedNotes={selectedNotes} />
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
  textHeader: {
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
  textNormal: {
    fontFamily: 'MitrRegular',
    fontSize: 16,
  },
});

export default CalendarScreen
