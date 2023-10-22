import React, { useState } from 'react'
import { 
    StyleSheet, 
    View,  
    ScrollView,  
    TouchableOpacity,
    Text
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LinearGradient } from 'expo-linear-gradient';

const HistoryTab = () => {
    return (
        <View style={styles.tabContainer}>
            <ScrollView contentContainerStyle={{ width: '100%' }}>
                <Text>History</Text>
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1, 
        backgroundColor: "white", 
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HistoryTab;

