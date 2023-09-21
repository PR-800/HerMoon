import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


const HistoryScreen = () => {

  return (
    <View style={styles.screen}>
        <Text>HistoryScreen</Text>
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
});

export default HistoryScreen
