import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Button, Pressable, Modal, TouchableOpacity, ScrollView, } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import { useFonts } from 'expo-font';

import firebase from '../data/firebaseDB';
import { setDayOfYear } from 'date-fns';
import * as Notifications from 'expo-notifications';
import { tr } from 'date-fns/locale';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const EditProfileScreen = ({ route, navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalChangeVisible, setModalChangeVisible] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    'การใช้ยาคุมกำเนิด',
    'โรคอ้วน',
    'โรคโลหิตจาง',
    'โรคกระดูกพรุน',
    'โรคต่อมใต้สมองขาดเลือด',
    'โรคเกี่ยวกับต่อมไทรอยด์',
    'โรคช็อกโกแลตซีสต์',
    'โรคเยื่อบุในมดลูกเจริญผิดที่',
    'ประจำเดือนไม่ค่อยมาตามรอบ',
    'มีเลือดออกกะปริบกะปรอย',
    'มาห่างเกิน 38 วัน',
    'มีการใช้ยาฮอร์โมน',
    'มีฮอร์โมนเอสโตเจนต่ำ',
  ];

  const [activeUser, setActiveUser] = useState({});
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [cycle, setCycle] = useState();
  const [freq, setFreq] = useState();
  const [dob, setDob] = useState();
  const [img, setImg] = useState();
  const [detail, setDetail] = useState();
  console.log('detail :>> ', detail);

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [oldPasswordShow, setOldPasswordShow] = useState(true);
  const [newPasswordShow, setNewPasswordShow] = useState(true);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);

  const [helperCycle, setHelperCycle] = useState(false)
  const [helperFreq, setHelperFreq] = useState(false)

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [cycleDropDown, setCycleDropDown] = useState(false);
  const [freqDropDown, setFreqDropDown] = useState(false);
  const cycleList = [
    {
      label: "20 - 23 วัน",
      value: 20,
    },
    {
      label: "24 - 27 วัน",
      value: 24,
    },
    {
      label: "28 - 31 วัน",
      value: 28,
    },
    {
      label: "32 - 35 วัน",
      value: 32,
    },
  ]
  const freqList = [
    {
      label: "2 - 4 วัน",
      value: 2,
    },
    {
      label: "3 - 5 วัน",
      value: 3,
    },
    {
      label: "4 - 6 วัน",
      value: 4,
    },
    {
      label: "5 - 7 วัน",
      value: 5,
    },
  ]

  //noti
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    { route.params.activeUser ? setActiveUser(route.params.activeUser) : "" }
    console.log("--- EditProfile")
    console.log(activeUser)
    // console.log(route.params)

    if (route.params.activeUser) {
      const accountDoc = firebase.firestore().collection("accounts")
        .doc(route.params.activeUser.key);

      accountDoc.get().then((res) => {
        if (res.exists) {
          const doc = res.data();
          setName(doc.name);
          setHeight(doc.height);
          setWeight(doc.weight);
          setCycle(doc.periodCycle);
          setFreq(doc.freq);
          setDob(doc.dob);
          setImg(doc.img);
          setDetail(doc.detail);
          // console.log('route.params.name => ', doc)
        }
        else {
          console.log("Document does not exist");
        }
      });
    }
  }, [route.params]);

  const updateAccount = () => {
    const accountDoc = firebase.firestore().collection("accounts")
      .doc(route.params.activeUser.key);

    accountDoc
      .update({
        username: activeUser.username,
        password: activeUser.password,
        name: name,
        height: height,
        weight: weight,
        dob: dob,
        periodCycle: cycle,
        freq: freq,
        new_user: false,
        img: img,
        detail: selectedTags,
      })
      .then(() => {
        console.log("ข้อมูลถูกอัปเดตเรียบร้อย");
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ", error);
      });
      console.log('detail :>> ', detail);
      console.log('selectedTags in detail :>> ', selectedTags);
  }

  const formatDate = (date) => {
    if (date instanceof Date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
      return formattedDate;
    } else {
      return '';
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  // console.log('selectedTags : ', selectedTags)

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

      <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', marginTop: 10 }} >

        <TextInput
          style={styles.input}
          theme={{
            roundness: 50,
            colors: { onSurfaceVariant: 'grey' }
          }}
          underlineColor="transparent"
          activeUnderlineColor="grey"
          textColor="grey"
          editable={false}

          label="ชื่อผู้ใช้"
          value={activeUser.username}
        />

        <TextInput
          style={styles.input}
          theme={{
            roundness: 50,
            colors: { onSurfaceVariant: 'grey' }
          }}
          underlineColor="transparent"
          activeUnderlineColor="grey"
          textColor="black"

          label="ชื่อที่แสดง"
          onChangeText={(val) => setName(val)}
          value={name != null ? name + "" : ""}
        />
        <Pressable
        onPress={() => setModalChangeVisible(true)}>
          <Text style={styles.changepassText}>
            เปลี่ยนรหัสผ่าน
          </Text>
        </Pressable>

        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <TextInput
            style={[styles.input, { width: 140, marginHorizontal: 10 }]}
            theme={{
              roundness: 50,
              colors: { onSurfaceVariant: 'grey' }
            }}
            underlineColor="transparent"
            activeUnderlineColor="grey"
            textColor="black"
            keyboardType='numeric'

            label="ส่วนสูง (ซม.)"
            onChangeText={(val) => setHeight(val)}
            value={height != null ? height + "" : ""}
          />
          <TextInput
            style={[styles.input, { width: 140, marginHorizontal: 10 }]}
            theme={{
              roundness: 50,
              colors: { onSurfaceVariant: 'grey' }
            }}
            underlineColor="transparent"
            activeUnderlineColor="grey"
            textColor="black"
            keyboardType='numeric'

            label="นํ้าหนัก (กก.)"
            onChangeText={(val) => setWeight(val)}
            value={weight != null ? weight + "" : ""}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.input, { marginTop: -5, width: 240 }]}
            theme={{
              roundness: 50,
              colors: { onSurfaceVariant: 'grey' }
            }}
            underlineColor="transparent"
            activeUnderlineColor="grey"
            textColor="black"
            editable={false}

            label="วันเกิด"
            onChangeText={(val) => setDob(val)}
            value={dob != null ? dob + "" : ""}
          />
          <MaterialCommunityIcons
            name={'calendar'}
            size={24}
            color="black"
            onPress={() => setIsDatePickerVisible(true)}
            style={{ fontSize: 40, marginRight: 20, }}
          />
        </View>
        
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setDob(date);
            const formattedDate = formatDate(date);
            setDob(formattedDate);
            setIsDatePickerVisible(false);
          }}
          onCancel={() => {
            setIsDatePickerVisible(false);
          }}
        />

        <View style={{flexDirection: 'row'}}>
        <View style={{...styles.smallDropdown, width: 140,  marginBottom: 0 }}>
            
            <DropDownPicker
                style={[styles.dropdownBox]}
              zIndex={20}
              placeholder='รอบเดือน'
              open={cycleDropDown}
              value={cycle}
              items={cycleList}
              setOpen={(cycleDropDown) => setCycleDropDown(cycleDropDown)}
              dropDownDirection='TOP'
              setValue={(valueCallback) => {
                const selectedValue = valueCallback();
                setCycle(selectedValue)
              }}
              labelProps={'name'}
              placeholderStyle={{
                marginLeft: 10,
                fontSize: 16,
                color: 'grey',
              }}
              labelStyle={{
                marginLeft: 10,
                fontSize: 16,
              }}
              itemStyle={{
                marginLeft: 10,
                fontSize: 16,
              }}
              controller={(instance) => (dropdownController.current = instance)}
            />
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <MaterialCommunityIcons 
                  name={'information'} 
                  size={20} 
                  color="lightgray"
                  onPress={() => {
                    setHelperCycle(!helperCycle)
                  }}
                  style={{ left:10, top: 3, zIndex: 10 }}
              />
              <HelperText type="info" visible={helperCycle}
                  style={[styles.tagText, {marginLeft: 3}]}>
                  รอบเดือน
              </HelperText>
            </View>
          </View>

          <View style={{...styles.smallDropdown, width: 140, marginBottom: 0 }}>
            <DropDownPicker
              style={styles.dropdownBox}
              zIndex={10}
              placeholder='จำนวนวัน'
              placeholderTextColor="grey"
              open={freqDropDown}
              value={freq}
              items={freqList}
              setOpen={(freqDropDown) => setFreqDropDown(freqDropDown)}
              dropDownDirection='TOP'
              setValue={(valueCallback) => {
                const selectedValue = valueCallback();
                setFreq(selectedValue)
              }}
              placeholderStyle={{
                marginLeft: 10,
                fontSize: 16,
                color: 'grey',
              }}
              labelStyle={{
                marginLeft: 10,
                fontSize: 16,
              }}
              itemStyle={{
                marginLeft: 10,
                fontSize: 16,
              }}
            />
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <MaterialCommunityIcons 
                  name={'information'} 
                  size={20} 
                  color="lightgray"
                  onPress={() => {
                    setHelperFreq(!helperFreq)
                  }}
                  style={{ left:10, top: 3, zIndex: 10 }}
              />
              <HelperText type="info" visible={helperFreq}
                  style={[styles.tagText, {marginLeft: 3}]}>
                  จำนวนวัน
              </HelperText>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>ระบุรายละเอียดเพิ่มเติม</Text>
          <Text style={{ ...styles.selectedTagsText, margin: 3 }}>

            {detail ? detail.flat().map(detailList => `\u2022 ${detailList}`).join('\n') : selectedTags ?  selectedTags.flat().map(selectedTag => `\u2022 ${selectedTag}`).join('\n') : ''}
            </Text>
        </Pressable>

      </ScrollView>


      {/* Submit */}
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        colors={['#9F79EB', '#FC7D7B',]}
        style={styles.linearGradient}
      >
        <Pressable onPress={() => {
          updateAccount()
          setName(name);
          setHeight(height);
          setWeight(weight);
          setDob(dob);
          setCycle(cycle);
          setFreq(freq);
          setImg(img);
          navigation.navigate("Home", { name: name });
          navigation.navigate("Profile", {name: name});
        }}>
          <Text style={{ color: "white", fontSize: 20, fontFamily: "MitrMedium", }}>
            ยืนยัน
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
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>โรคประจำตัว และอื่น ๆ</Text>


            <View style={{ backgroundColor: 'white', borderRadius: 20, width: 250, height: 275, paddingHorizontal: 10, paddingVertical: 20, alignSelf: 'center', }}>
              <ScrollView vertical showsVerticalScrollIndicator={false}>
                {tags.map((tag) => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tag,
                      { backgroundColor: selectedTags.includes(tag) ? '#9F79EB' : '#e8e8e8' },
                    ]}
                    onPress={() => toggleTag(tag)}
                  >
                    <Text style={[styles.tagText, { color: selectedTags.flat().includes(tag) ? 'white' : 'black' }]}>{tag}</Text>
                  </TouchableOpacity>
                ))}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', }}>

                </View>
              </ScrollView>

            </View>
            <View>
              <Text style={{ ...styles.selectedTagsText }}>{selectedTags.length >= 1 ? 'รายการที่เลือก : ' + selectedTags.flat().join(', ') : ''}</Text>
            </View>

            <Pressable
              // style={[styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible)
                setDetail(selectedTags)
                console.log('selectedTags :>> ', selectedTags);
              }}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                colors={['#9F79EB', '#FC7D7B',]}
                style={styles.linearGradientModal}
              >
                <Text style={styles.buttonClose}>ยืนยัน</Text>
              </LinearGradient>
            </Pressable>

          </View>

        </TouchableOpacity>
      </Modal>

      {/* ChangePasswordModal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalChangeVisible}
        statusBarTranslucent={false}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalChangeVisible(!modalChangeVisible);
        }}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
        >
          <View style={[styles.modalView, {paddingVertical: 30}]}>
            <Text style={[styles.modalText, {marginVertical: 10}]}>เปลี่ยนรหัสผ่าน</Text>
            {/* <TouchableOpacity 
              onPress={() => {setModalChangeVisible(!modalChangeVisible)}}
              style={{position: 'absolute', top: 5,}}>
              <Image source={require('../assets/profile/close.png')} style={{width: 25, height: 25}} />
            </TouchableOpacity> */}


            <View style={{ backgroundColor: 'white', borderRadius: 20, width: '90%', height: 275, alignSelf: 'center'}}>
              <ScrollView vertical showsVerticalScrollIndicator={false}>
                  <TextInput
                    style={[styles.input, {alignSelf: 'center', width: 265}]}
                    theme={{
                      roundness: 50,
                      colors: { onSurfaceVariant: 'grey' }
                    }}
                    underlineColor="transparent"
                    activeUnderlineColor="grey"
                    label="รหัสผ่านเดิม"
                    secureTextEntry={oldPasswordShow}
                    onChangeText={(val) => setOldPassword(val)}
                    value={oldPassword}
                  />
                  <MaterialCommunityIcons
                      name={oldPasswordShow ? 'eye-off' : 'eye'}
                      size={25}
                      color="#aaa"
                      onPress={() => {
                        setOldPasswordShow(!oldPasswordShow)
                      }}                      
                      style={{ position: 'absolute', right: 30, top: 30 }}
                  />

                <TextInput
                  style={[styles.input, {alignSelf: 'center', width: 265}]}
                  theme={{
                    roundness: 50,
                    colors: { onSurfaceVariant: 'grey' }
                  }}
                  underlineColor="transparent"
                  activeUnderlineColor="grey"
                  label="รหัสผ่านใหม่"
                  secureTextEntry={newPasswordShow}
                  onChangeText={(val) => setNewPassword(val)}
                  value={newPassword}
                />
                <MaterialCommunityIcons
                    name={newPasswordShow ? 'eye-off' : 'eye'}
                    size={25}
                    color="#aaa"
                    onPress={() => {
                      setNewPasswordShow(!newPasswordShow)
                    }}
                    style={{ position: 'absolute', right: 30, top: 115 }}
                />

                <TextInput
                  style={[styles.input, {alignSelf: 'center', width: 265}]}
                  theme={{
                    roundness: 50,
                    colors: { onSurfaceVariant: 'grey' }
                  }}
                  underlineColor="transparent"
                  activeUnderlineColor="grey"
                  label="ยืนยันรหัสผ่านใหม่"
                  secureTextEntry={confirmPasswordShow}
                  onChangeText={(val) => setConfirmPassword(val)}
                  value={confirmPassword}
                />
                <MaterialCommunityIcons
                      name={confirmPasswordShow ? 'eye-off' : 'eye'}
                      size={25}
                      color="#aaa"
                      onPress={() => {
                        setConfirmPasswordShow(!confirmPasswordShow)
                      }}
                      style={{ position: 'absolute', right: 30, top: 200 }}
                  />

              </ScrollView>
            </View>

            {/* Button */}
            <View style={{flexDirection:'row'}}>
              <Pressable
                onPress={() => {
                  if (activeUser.password === oldPassword) {
                    if (newPassword === confirmPassword) {
                      activeUser.password = newPassword
                      updateAccount()
                      setOldPassword(''); setNewPassword(''); setConfirmPassword('')
                      Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>เปลี่ยนรหัสผ่านสำเร็จ</Text>,
                        button: 'OK',
                      });
                    }
                    else {
                      setOldPassword(''); setNewPassword(''); setConfirmPassword('')
                      Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>โปรดตรวจสอบรหัสผ่านอีกครั้ง</Text>,
                        button: 'OK',
                      });
                    }
                  } else {
                    setOldPassword(''); setNewPassword(''); setConfirmPassword('')
                    Dialog.show({
                      type: ALERT_TYPE.WARNING,
                      title: <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>โปรดตรวจสอบรหัสผ่านอีกครั้ง</Text>,
                      button: 'OK',
                    });
                  }
                  setModalChangeVisible(!modalChangeVisible)
                }}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  colors={['#9F79EB', '#FC7D7B',]}
                  style={[styles.linearGradientModal, {width: 130, marginHorizontal: 10}]}
                >
                  <Text style={styles.buttonClose}>ยืนยัน</Text>
                </LinearGradient>
              </Pressable>
              <Pressable
              onPress={() => {
                setOldPassword(''); setNewPassword(''); setConfirmPassword('')
                setModalChangeVisible(!modalChangeVisible)
              }}>
              <View
              style={[styles.linearGradientModal, {width: 130, marginHorizontal: 10, backgroundColor: '#cfcaca', }]}
              >
                <Text style={[styles.buttonClose, {}]}>ยกเลิก</Text>
              </View>
            </Pressable>

            </View>
            

          </View>

        </TouchableOpacity>
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
    width: 300,
    height: 55,
    margin: 15,
    borderRadius: 50,
    overflow: 'hidden',
    paddingLeft: 5,
  },
  smallinput: {
    display: "flex",
    borderRadius: 15,
    width: 165,
    height: 50,
    margin: 10,
    marginVertical: 15,
    overflow: "hidden",
  },
  group: {
    flexDirection: "row",
  },
  smallDropdown: {
    // width: 300,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  dropdownBox: {
    backgroundColor: "#e7e0ec",
    height: 55,
    borderColor: "white",
    borderRadius: 50,
    paddingLeft: 10,
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
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
    width: 320,
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
    fontSize: 21,
    fontFamily: "MitrMedium",
  },

  // tag
  tag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 15,
    fontFamily: "MitrRegular",
    textAlign: 'center'
  },
  selectedTagsText: {
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "MitrRegular",
    // color: '#A43BA6',
  },
  changepassText: {
    backgroundColor: "#e7e0ec",
    width: 300,
    height: 55,
    margin: 15,
    borderRadius: 50,
    padding: 15,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'MitrRegular',
  }

});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default EditProfileScreen
