import React from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
// import { FloatingLabelInput } from 'react-native-floating-label-input';

const EditProfileScreen = () => {
  return (
      <View style={styles.screen}>
        {/* <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}> */}
            <Text style={{ fontSize: 40 }}>EditProfileScreen !</Text>
            <TextInput
                style={styles.input}
                blurOnSubmit
                editable
                label={'Email'}
                inputMode='outlined'
                // autoCapitalize="none"
                // keyboardType="number-pad"
                autoCorrect={false}
                maxLength={2}
                //...เพิ่ม property value และ onChangeText...
                // value = {enteredValue}
                // onChangeText = {numberInputHandler}
            />
            {/* <FloatingLabelInput
            style={styles.input}
        label={'label'}
        isPassword
        togglePassword={show}
        value={cont}
        // onChangeText={value => setCont(value)}
        customShowPasswordComponent={<Text>Show</Text>}
        customHidePasswordComponent={<Text>Hide</Text>}
      /> */}
        {/* </LinearGradient> */}
      </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "purple",
    borderWidth: 5,
    borderRadius: 10,
    width: 350,
    height: 50,
    margin: 10,
    textAlign: "left",
    // borderRightColor: "grey",
    borderStartColor: "black"
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
});

export default EditProfileScreen
