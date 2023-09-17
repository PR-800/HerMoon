import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';

import Navigator from './navigation/Navigator';

export default function App() {
  // let [fontsLoaded, fontError] = useFonts({
  //   VarelaRound_400Regular,
  // });

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  return (
      <Navigator/>
    // <View>
    //   <Text style={{ fontFamily: "VarelaRound_400Regular", fontSize: 28 }}>
    //     Nice! Support for Google Fonts!
    //   </Text>
    // </View>
  );
}

// const styles = StyleSheet.create({
//   font:{
//     fontFamily: "VarelaRound_400Regular",
//   }
// })
