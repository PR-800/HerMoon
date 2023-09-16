import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Button, Pressable, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';

const EditProfileScreen = () => {

  const dropDownRef = React.useRef();
  
  const [OpenAge, setOpenAge] = useState(false);
  const [age, setAge] = useState(null);
  const [itemsAge, setItemsAge] = useState([
    { label: '13-17', value: 'Child' },
    { label: '18-30', value: 'YoungAdult' },
    { label: '31-45', value: 'Adult' },
    { label: 'Above 45', value: 'Old' },
  ]);
  
  const [valueOpenHour, setValueOpenHour] = useState(false);
  const [valueHour, setValueHour] = useState(null);
  const [itemsHour, setItemsHour] = useState([
    { label: 'Less than 5 hours', value: 'banana' },
    { label: '5-6 hours', value: 'bat' },
    { label: '7-9 hours', value: 'apple' },
    { label: 'Above 9 hours', value: 'cat' },
  ]);

  const [valueOpenCycle, setValueOpenCycle] = useState(false);
  const [valueCycle, setValueCycle] = useState(null);
  const [itemsCycle, setItemsCycle] = useState([
    { label: 'Less than 5 hours', value: 'banana' },
    { label: '5-6 hours', value: 'bat' },
    { label: '7-9 hours', value: 'apple' },
    { label: 'Above 9 hours', value: 'cat' },
  ]);

  const [valueOpenWorkout, setValueOpenWorkout] = useState(false);
  const [valueWorkout, setValueWorkout] = useState(null);
  const [itemsWorkout, setItemsWorkout] = useState([
    { label: 'Less than 5 hours', value: 'banana' },
    { label: '5-6 hours', value: 'bat' },
    { label: '7-9 hours', value: 'apple' },
    { label: 'Above 9 hours', value: 'cat' },
  ]);

  return (
      <View style={styles.screen}>
        <Text style={styles.header}>Edit Profile</Text>
        <TextInput
            style={styles.input}
            label={'Username'}
            underlineColor="transparent"
            // theme={{ roundness: 15 }} 
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
        />
        <TextInput
            style={styles.input}
            label={'การใช้ยาคุม'}
            underlineColor="transparent"
            autoCompleteType="password"
        />
        <View style={styles.group}>
          <TextInput
              style={styles.smallinput}
              label={'Weight'}
              underlineColor="transparent"
              autoCompleteType="password"
          />
          <TextInput
              style={styles.smallinput}
              label={'Height'}
              underlineColor="transparent"
              autoCompleteType="password"
          />
        </View>

        <View style={[styles.group]}>
        <TouchableWithoutFeedback onPress={() => dropDownRef.current.close()}>
          <View style={styles.smallDropdown}>
            <DropDownPicker
              placeholder='Age'
              open={OpenAge}
              value={age}
              items={itemsAge}
              setOpen={setOpenAge}
              setValue={setAge}
              setItems={setItemsAge}
              dropDownDirection='TOP'
              controller={(instance) => dropDownRef.current = instance}
            />
          </View>
          </TouchableWithoutFeedback>
          <View style={styles.smallDropdown}>
            <DropDownPicker 
            // style={{backgroundColor:"cyan"}}
            placeholder='Sleep Hours'
              open={valueOpenHour}
              value={valueHour}
              setOpen={setValueOpenHour}
              setValue={setValueHour}
              items={[
                {label: 'UK', value: 'uk'},
                {label: 'France', value: 'france'}
              ]}
              dropDownDirection='TOP'
            />
          </View>
        </View>

        <View style={[styles.group]}>
          <View style={styles.smallDropdown}>
            <DropDownPicker
              placeholder='Cycle'
              open={valueOpenCycle}
              value={valueCycle}
              items={itemsCycle}
              setOpen={setValueOpenCycle}
              setValue={setValueCycle}
              setItems={setItemsCycle}
              dropDownDirection='TOP'
            />
          </View>
          <View style={styles.smallDropdown}>
            <DropDownPicker
            placeholder='Workout Freq'
              open={valueOpenWorkout}
              value={valueWorkout}
              items={itemsWorkout}
              setOpen={setValueOpenWorkout}
              setValue={setValueWorkout}
              setItems={setItemsWorkout}
              dropDownDirection='TOP'
            />
          </View>
        </View>
        


        {/* Submit */}
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.3, y: 1}}
        colors={['#9F79EB', '#FC7D7B',]}
        style={styles.linearGradient}
        >
          <Pressable onPress={() => {
                return console.log("SUBMITED")
          }}>
            <Text style={{color: "white", fontSize: 20, fontWeight: "600"}}>
            SUBMIT
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 40,
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 50,
    marginLeft: 30,
},
  input: {
    // borderRadius: 25,
    width: 350,
    height: 55,
    margin: 10,
  },
  smallinput: {
    display: "flex",
    width: 165,
    height: 50,
    margin: 10,
  },
  group: {
    flexDirection: "row",
  },
  smallDropdown: {
    width: 165,
    margin: 10,

  },
  linearGradient: {
    width: 350,
    height: 50,
    marginTop: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditProfileScreen
