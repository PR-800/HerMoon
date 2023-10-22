import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Pressable, 
  ScrollView, 
  Dimensions, 
} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import * as Font from 'expo-font';

import firebase from '../data/firebaseDB';

class HistoryScreen extends Component {
  constructor() {
    super();

    this.historysCollection = firebase.firestore().collection("historys");
  

    this.state = {
      history_list: [],
      index: 0,
      routes: [
        { key: 'analysis', title: 'วิเคราะห์รอบเดือน' },
        { key: 'history', title: 'ประวัติการวิเคราะห์' },
      ],
      layout: { width:  Dimensions.get('window').width },
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      startDate: null,
      endDate: null,
    }

    this.renderScene = SceneMap({
      analysis: this.AnalysisTab,
      history: this.HistoryTab,
    });

  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state, () => {
      this.forceUpdate();
      console.log('Updated endDate:', this.state.endDate);
    });
  };

  // inputValueUpdate = (val, prop) => {
  //   this.setState({ [prop]: val }, () => {
  //     this.forceUpdate(); // Force a re-render
  //     console.log('Updated startDate:', this.state.startDate);
  //   });
  // };

  getDate = () => {
    if (this.state.startDate instanceof Date) {
      const day = this.state.startDate.getDate();
      const month = this.state.startDate.getMonth() + 1;
      const year = this.state.startDate.getFullYear();
  
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      return formattedDate;
    } 
    else {
      return '';
    }
  };

  AnalysisTab = () => (
    <View style={styles.tabContainer}>
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, zIndex:20}}>
          <TextInput 
              style={[styles.input, {width: 240}]} 
              theme={{ 
                  roundness: 50, 
                  colors: { onSurfaceVariant: 'grey'} 
              }} 
              underlineColor="transparent"
              activeUnderlineColor="grey"
              textColor="black"
              // editable={false}

              label="วันเริ่มต้น"
              onChangeText={(val) => {this.inputValueUpdate(val, "startDate"); console.log(val, this.state.startDate)}}
              value={this.state.startDate != null ? this.state.startDate + "" : ""} 
          />
          <MaterialCommunityIcons 
            name={'calendar'} 
            size={24} 
            color="grey"
            onPress={() => {
              console.log('Before setting to true :', this.state.isStartDatePickerVisible);
              this.setState((prevState) => ({
                isStartDatePickerVisible: !prevState.isStartDatePickerVisible
              }));
              // this.setState({ isStartDatePickerVisible: !this.state.isStartDatePickerVisible });
              console.log('After setting to true :', this.state.isStartDatePickerVisible);
            }}
            style={{fontSize: 40, marginRight: 20, marginTop: 22, backgroundColor: 'red'}}
          />
        </View>
        <DateTimePickerModal
          isVisible={this.state.isStartDatePickerVisible}
          mode="date"
          
          onConfirm={(date) => {
              this.setState({ startDate: date });
              const format = this.getDate()
              this.setState({ startDate: format });
              this.setState({ isStartDatePickerVisible: !this.state.isStartDatePickerVisible });
          }}
          onCancel={() => {
              this.setState({ isStartDatePickerVisible: !this.state.isStartDatePickerVisible });
          }}
        />

        <View style={{ flex: 1, flexDirection: 'row', zIndex:20}}>
          <TextInput 
              style={[styles.input, {width: 240}]} 
              theme={{ 
                  roundness: 50, 
                  colors: { onSurfaceVariant: 'grey'} 
              }} 
              underlineColor="transparent"
              activeUnderlineColor="grey"
              textColor="black"
              // editable={false}

              label="วันสิ้นสุด"
              onChangeText={(val) => {this.inputValueUpdate(val, "endDate"); console.log(val, this.state.endDate)}}
              value={this.state.endDate != null ? this.state.endDate + "" : ""} 
          />
          <MaterialCommunityIcons 
            name={'calendar'} 
            size={24} 
            color="grey"
            onPress={() => {
              console.log('Before setting to true :', this.state.isEndDatePickerVisible);
              this.setState((prevState) => ({
                isEndDatePickerVisible: !prevState.isEndDatePickerVisible
              }));
              // this.setState({ isEndDatePickerVisible: !this.state.isEndDatePickerVisible });
              console.log('After setting to true :', this.state.isEndDatePickerVisible);
            }}
            style={{fontSize: 40, marginRight: 20, marginTop: 22}}
          />
        </View>
        <DateTimePickerModal
          isVisible={this.state.isEndDatePickerVisible}
          mode="date"
          
          onConfirm={(date) => {
              this.setState({ startDate: date });
              const format = this.getDate()
              this.setState({ startDate: format });
              this.setState({ isEndDatePickerVisible: !this.state.isEndDatePickerVisible });
          }}
          onCancel={() => {
              this.setState({ isEndDatePickerVisible: !this.state.isEndDatePickerVisible });
          }}
        />
        
        {/* {this.state.history_list.map((item, i) => {
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
  );

  HistoryTab = () => (
    <View style={{ flex: 1, backgroundColor: 'white' }} >

    </View>
  );

  setIndex = (index) => {
    this.setState({ index });
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

  async componentDidMount() {
    await Font.loadAsync({
      MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
      MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    });

    this.unsubscribe = this.historysCollection.onSnapshot(this.getCollection);
    // this.forceUpdate();
  }

  // componentDidUpdate() {
  //   if (/* your condition here */) {
  //     this.forceUpdate();
  //   }
  // }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
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
            <Text style={styles.header}>วิเคราะห์รอบเดือน</Text>
            <Text></Text>
          </View>
        </LinearGradient>

        <View style={{ flexDirection: 'row', zIndex:20, height: 85}}>
          <TextInput 
              style={[styles.input, {width: 240}]} 
              theme={{ 
                  roundness: 50, 
                  colors: { onSurfaceVariant: 'grey'} 
              }} 
              underlineColor="transparent"
              activeUnderlineColor="grey"
              textColor="black"
              // editable={false}

              label="วันสิ้นสุด"
              onChangeText={(val) => {this.inputValueUpdate(val, "endDate"); console.log(val, this.state.endDate)}}
              // value={this.state.endDate != null ? this.state.endDate + "" : ""} 
          />
          {/* <MaterialCommunityIcons 
            name={'calendar'} 
            size={24} 
            color="grey"
            onPress={() => {
              console.log('Before setting to true :', this.state.isEndDatePickerVisible);
              this.setState((prevState) => ({
                isEndDatePickerVisible: !prevState.isEndDatePickerVisible
              }));
              // this.setState({ isEndDatePickerVisible: !this.state.isEndDatePickerVisible });
              console.log('After setting to true :', this.state.isEndDatePickerVisible);
            }}
            style={{fontSize: 40, marginRight: 20, marginTop: 22}}
          /> */}
        </View>
        
        <DateTimePickerModal
          isVisible={this.state.isStartDatePickerVisible}
          mode="date"
          
          onConfirm={(date) => {
              this.setState({ startDate: date });
              const format = this.getDate()
              this.setState({ startDate: format });
              this.setState({ isStartDatePickerVisible: !this.state.isStartDatePickerVisible });
          }}
          onCancel={() => {
              this.setState({ isStartDatePickerVisible: !this.state.isStartDatePickerVisible });
          }}
        />
        <DateTimePickerModal
          isVisible={this.state.isEndDatePickerVisible}
          mode="date"
          
          onConfirm={(date) => {
              this.setState({ startDate: date });
              const format = this.getDate()
              this.setState({ startDate: format });
              this.setState({ isEndDatePickerVisible: !this.state.isEndDatePickerVisible });
          }}
          onCancel={() => {
              this.setState({ isEndDatePickerVisible: !this.state.isEndDatePickerVisible });
          }}
        />
        
        <View style={styles.tabViewContainer}>
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            onIndexChange={this.setIndex}
            initialLayout={this.state.layout}
            renderTabBar={  props => 
              <TabBar {...props} 
                indicatorStyle={{ backgroundColor: '#9F79EB' }}
                style={{
                  backgroundColor: 'white',
                  height: 53,
                  justifyContent: 'center'
                }}
                renderLabel={({ route, focused }) => (
                  <Text style={{ color: focused ? '#9F79EB' : 'lightgrey', fontFamily: 'MitrMedium', fontSize: 16 }}>
                    {route.title}
                  </Text>
                )}
              />
            }
            
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tabViewContainer: {
    flex: 1,
  },
  tabContainer: {
    flex: 1, 
    backgroundColor: "white", 
    justifyContent: "center",
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
});

export default HistoryScreen
