import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Button, Pressable, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';

const EditProfileScreen = ({ route, navigation }) => {

  const dropDownRef = React.useRef();
  
  const [OpenAge, setOpenAge] = useState(false);
  const [age, setAge] = useState(null);
  const [itemsAge, setItemsAge] = useState([
    { label: '13 - 17 years', value: 'Child' },
    { label: '18 - 30 years', value: 'YoungAdult' },
    { label: '31 - 45 years', value: 'Adult' },
    { label: 'Above 45 years', value: 'Old' },
  ]);
  
  const [valueOpenHour, setValueOpenHour] = useState(false);
  const [valueHour, setValueHour] = useState(null);
  const [itemsHour, setItemsHour] = useState([
    { label: 'Less than 5 hours', value: 'banana' },
    { label: '5 - 6 hours', value: 'bat' },
    { label: '7 - 9 hours', value: 'apple' },
    { label: 'Above 9 hours', value: 'cat' },
  ]);

  const [valueOpenCycle, setValueOpenCycle] = useState(false);
  const [valueCycle, setValueCycle] = useState(null);
  const [itemsCycle, setItemsCycle] = useState([
    { label: 'Less than 5 hours', value: 'banana' },
    { label: '5 - 6 hours', value: 'bat' },
    { label: '7 - 9 hours', value: 'apple' },
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
        <View style={styles.headerGroup}>
          <Pressable onPress={() => {
                      navigation.navigate("Profile", {});
                      return console.log("go Profile")
                  }}>
            <Image
              source={require('../assets/profile/arrow-left.png')}
              style={styles.arrowleft}
            />
          </Pressable>
          <Text style={styles.header}>Edit Profile</Text>
        </View>
        <TextInput
            style={styles.input}
            label={'Username'}
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
        <TextInput
            style={styles.input}
            label={'การใช้ยาคุม'}
            underlineColor="transparent"
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
          <View style={styles.smallDropdown}>
            <DropDownPicker
            style={styles.dropdownBox}
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
            style={styles.dropdownBox}
            placeholder='Sleep Hours'
              open={valueOpenHour}
              value={valueHour}
              items={itemsHour}
              setOpen={setValueOpenHour}
              setValue={setValueHour}
              setItems={setItemsHour}
              dropDownDirection='TOP'
            />
          </View>
        </View>

        <View style={[styles.group]}>
          <View style={styles.smallDropdown}>
            <DropDownPicker
            style={styles.dropdownBox}
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
            style={styles.dropdownBox}
            placeholder='Workout Freq'
              open={valueOpenWorkout}
              value={valueWorkout}
              // items={itemsWorkout}
              setOpen={setValueOpenWorkout}
              setValue={setValueWorkout}
              // setItems={setItemsWorkout}
              items={[
                {label: 'UK', value: 'uk'},
                {label: 'France', value: 'france'}
              ]}
              dropDownDirection='TOP'
            />
          </View>
        </View>
        


        {/* Submit */}
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
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
    marginTop: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    display: "flex",
    fontSize: 25,
    fontWeight: "700",
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
    marginTop: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  headerGroup: {
    flexDirection: "row",
    marginVertical: 40,
  },
  arrowleft: {
    display: "flex",
    top: 15,
    right: 90,
    width: 25,
    height: 25,
  }
});

export default EditProfileScreen
