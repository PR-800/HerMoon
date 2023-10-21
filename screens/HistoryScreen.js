import React, { useState, Component } from 'react'
import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import firebase from '../data/firebaseDB';

class HistoryScreen extends Component {
  constructor() {
    super();

    this.historysCollection = firebase.firestore().collection("historys");

    this.state = {
      history_list: [],
    }
  }

  getCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {

      const { status, date} = res.data();
      all_data.push({
        key: res.id,
        status,
        date,
      });
    });
    // console.log("all_data : ", all_data);
    
    this.setState({
        history_list: all_data,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.historysCollection.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }



  render() {
    const { navigation } = this.props
    return (
      <View style={styles.screen}>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          colors={['#9F79EB', '#FC7D7B',]}
          style={styles.gradientBackground}
        >
          <View style={styles.navbar}>
            <Pressable onPress={() => {
              navigation.navigate("Home", {});
            }}>
              <Image
                style={styles.icon}
                source={require('../assets/article/arrow-left-white.png')}
              />
            </Pressable>
            <Text style={styles.header}>ประวัติ</Text>
            <Text></Text>
          </View>
        </LinearGradient>
        

        <ScrollView contentContainerStyle={{ width: '100%' }}>
          {this.state.history_list.map((item, i) => {
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
          })}
        </ScrollView>




      </View>

    )
}
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  gradientBackground: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
  },
  navbar: {
    padding: 30,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    fontSize: 25,
    color: "white",
    fontFamily: 'MitrMedium',
    marginTop: -8,
  },
  boxList: {
    flex: 1,
    justifyContent: "center",
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    backgroundColor: "lightgray",
    width: '100%',
  },
});

export default HistoryScreen
