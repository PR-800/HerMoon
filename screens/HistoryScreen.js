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

import AnalysisTab from '../components/AnalysisTab';
import HistoryTab from '../components/HistoryTab';

import * as Font from 'expo-font';

import firebase from '../data/firebaseDB';

class HistoryScreen extends Component {
  constructor() {
    super();

    this.state = {
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
      activeUser: null,
      name: null,
    }

    this.renderScene = ({ route }) => {
      switch (route.key) {
        case 'analysis':
          return <AnalysisTab />;
        case 'history':
          return <HistoryTab />;
      }
    };
  }

  inputValueUpdate = (val) => {
    this.setState({ startDate: val }, () => {
      console.log(`Updated startDate: ${this.state.startDate}`);
    });
  };

  setIndex = (index) => {
    this.setState({ index });
  }

  async componentDidMount() {
    await Font.loadAsync({
      MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
      MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    });

    { this.props.route.params.activeUser ? this.setState({ activeUser: this.props.route.params.activeUser }) : ""}
    console.log("-- History ")
    console.log(this.state.activeUser)

    const accountDoc = firebase.firestore().collection("accounts")
    .doc(this.props.route.params.activeUser ? this.props.route.params.activeUser.key : this.state.activeUser.key);

    accountDoc.get().then((res) => {
        if (res.exists) {
          const doc = res.data();
          this.setState({
            key: res.id, 
            name: doc.name, 
          });
        }
        else {
          console.log("Document does not exist");
        }
    });

    // this.unsubscribe = this.historysCollection.onSnapshot(this.getCollection);
  }

  // componentWillUnmount() {
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   }
  // }

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
