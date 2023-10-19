import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Button, Pressable, TouchableWithoutFeedback, Modal, TouchableOpacity, ScrollView, DatePickerIOS, } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts } from 'expo-font';

import { Chip } from 'react-native-paper';

const EditProfileScreen = ({ route, navigation }) => {

  // วันเกิด
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const dropDownRef = React.useRef();
  
  const [OpenAge, setOpenAge] = useState(false);
  const [age, setAge] = useState(null);
  const [itemsAge, setItemsAge] = useState([
    { label: '8 - 14 years', value: 'Child' },
    { label: '15 - 19 years', value: 'Teenager' },
    { label: '20 - 40 years', value: 'YoungAdult' },
    { label: '41 - 50 years', value: 'Adult' },
    { label: 'Above 50 years', value: 'Old' },
  ]);

  const [valueOpenCycle, setValueOpenCycle] = useState(false);
  const [valueCycle, setValueCycle] = useState(null);
  const [itemsCycle, setItemsCycle] = useState([
    { label: 'Less than 5 hours', value: 'banana' },
    { label: '5 - 6 hours', value: 'bat' },
    { label: '7 - 9 hours', value: 'apple' },
    { label: 'Above 9 hours', value: 'cat' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    'ประจำเดือนไม่มาตามรอบ', 
    'มีเลือดออกกะปริบกะปรอย',
    'ประจำเดือนมานาน (มากกว่า 7 วัน)', 
    'มาถี่ (น้อยกว่า 24 วัน)',
    'มาห่างเกิน 38 วัน',
    'Tag4', 
    'Tag5', 
    'Tag6', 
    'Tag7', 
    'มีการใช้ยาฮอร์โมน',
    'มีฮอร์โมนเอสโตเจนต่ำ', 
    'Tag10', 
    'โรคอ้วน'
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  console.log('selectedTags : ', selectedTags)

  const [loaded] = useFonts({
    MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
    MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
  });

  if (!loaded) {
      return null;
  }

  return (
      <View style={styles.screen}>
        <View style={styles.headerGroup}>
          <Pressable onPress={() => {
                      navigation.navigate("Profile", {});
                  }}>
            <Image
              source={require('../assets/profile/arrow-left.png')}
              style={styles.arrowleft}
            />
          </Pressable>
          <Text style={styles.header}>แก้ไขข้อมูล</Text>
        </View>

        <ScrollView vertical contentContainerStyle={{alignItems: 'center', marginTop: 50}} >
        <TextInput
            style={styles.input}
            label={'Name'}
            underlineColor="transparent"
            theme={{ roundness: 15 }} 
            // keyboardType="number-pad"
            // maxLength={2}
            autoCorrect={false}
            
            // blurOnSubmit
            // editable
            //...เพิ่ม property value และ onChangeText...
            // value = {enteredValue}
            // onChangeText = {numberInputHandler}
        />
        <TextInput
            style={styles.input}
            label={'Password'}
            underlineColor="transparent"
            autoCompleteType="password"
            theme={{ roundness: 15 }} 
        />


        <View style={styles.group}>
          <TextInput
              style={styles.smallinput}
              label={'Weight (kg.)'}
              keyboardType="number-pad"
              underlineColor="transparent"
              theme={{ roundness: 15 }} 
          />
          <TextInput
              style={styles.smallinput}
              label={'Height (cm.)'}
              keyboardType="number-pad"
              underlineColor="transparent"
              theme={{ roundness: 15 }} 
          />
        </View>

        <View style={[styles.group]}>
        <TouchableWithoutFeedback onPress={() => dropDownRef.current.close()}>
          {/* <View style={styles.smallDropdown}> */}
          <TextInput
              style={styles.smallinput}
              label={'Height (cm.)'}
              keyboardType="number-pad"
              underlineColor="transparent"
              theme={{ roundness: 15 }} 
          />
          {/* </View> */}


          </TouchableWithoutFeedback>
          <View style={styles.smallDropdown}>
            <DropDownPicker
              style={styles.dropdownBox}
              placeholder='รอบในแต่ละเดือน'
              placeholderStyle={{fontSize: 15, fontFamily: "MitrRegular", textAlign: 'center'}}
              open={valueOpenCycle}
              value={valueCycle}
              items={itemsCycle}
              setOpen={setValueOpenCycle}
              setValue={setValueCycle}
              setItems={setItemsCycle}
              dropDownDirection='TOP'
            />
          </View>
        </View>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>ระบุรายละเอียดเพิ่มเติม</Text>
          <Text style={{...styles.selectedTagsText, margin: 3}}>{selectedTags.length >= 1 ? 'รายการที่เลือกแล้ว : '+  selectedTags.join(', ') : ''}</Text>
        </Pressable>
        
        </ScrollView>


        {/* Submit */}
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        colors={['#9F79EB', '#FC7D7B',]}
        style={styles.linearGradient}
        >
          <Pressable onPress={() => {
            navigation.navigate("Profile", {});
                return console.log("SUBMITED")
          }}>
            <Text style={{color: "white", fontSize: 20, fontFamily: "MitrMedium",}}>
            SUBMIT
            </Text>
          </Pressable>
        </LinearGradient>

          {/* modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={false}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>ระบุรายละเอียดเพิ่มเติม</Text>

                {/* TAG */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagContainer}>
                  {tags.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.tag,
                        { backgroundColor: selectedTags.includes(tag) ? '#9F79EB' : '#D9D9D9' },
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text style={[styles.tagText, { color: selectedTags.includes(tag) ? 'white' : 'black' }]}>{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={{marginVertical: 10,}}>
                  <Text style={{...styles.selectedTagsText}}>{selectedTags.length >= 1 ? 'รายการที่เลือกแล้ว : '+  selectedTags.join(', ') : ''}</Text>
                </View>

              <Pressable
                // style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#9F79EB', '#FC7D7B',]}
                  style={styles.linearGradientModal}
                  >
                      <Text style={styles.buttonClose}>ยืนยัน</Text>
                  </LinearGradient>
                </Pressable>

              </View>
            </View>
          </Modal>

      </View>



  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // marginTop: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    display: "flex",
    fontSize: 25,
    fontFamily: "MitrMedium",
    lineHeight: 50,
},
  input: {
    borderRadius: 15, 
    width: 350,
    height: 55,
    margin: 15,
    overflow : "hidden",
  },
  smallinput: {
    display: "flex",
    borderRadius: 15, 
    width: 165,
    height: 50,
    margin: 10,
    marginVertical: 15,
    overflow : "hidden",
  },
  group: {
    flexDirection: "row",
  },
  smallDropdown: {
    width: 165,
    margin: 10,
    marginVertical: 15,
  },
  dropdownBox: {
    backgroundColor:"#e7e0ec",
    borderColor: "white",
    borderRadius: 15,
  },
  linearGradient: {
    width: 350,
    height: 50,
    marginVertical: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  headerGroup: {
    flexDirection: "row",
    marginVertical: 10,
    marginTop: 60,
  },
  arrowleft: {
    display: "flex",
    top: 15,
    right: 90,
    width: 25,
    height: 25,
  },

  // modal zone
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    
    elevation: 2,
    
    borderRadius: 15, 
    width: 350,
    // height: 55,
    margin: 20,
    
    justifyContent: 'center',
    // alignItems: 'flex-start',
    // overflow : "hidden",
  },
  buttonOpen: {
    backgroundColor: '#e7e0ec',
    
  },
  buttonClose: {
    color: 'white',
    fontFamily: "MitrMedium",
    fontSize: 17,
  },
  linearGradientModal: {
    width: 250,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: 'black',
    fontFamily: "MitrMedium",
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 19,
    textAlign: 'center',
    fontFamily: "MitrMedium",
  },

  // tag
  tagContainer: {
    alignItems: 'center',
  },
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 15,
    fontFamily: "MitrMedium",
  },
  selectedTagsText: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "MitrMedium",
    color: '#A43BA6',
  },

});

export default EditProfileScreen
