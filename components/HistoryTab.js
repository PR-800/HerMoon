import React, { useState, useEffect } from 'react'
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
import { ListItem } from '@rneui/themed';

import firebase from '../data/firebaseDB';

const HistoryTab = () => {
    const historyCollection = firebase.firestore().collection("histories");
    const [historyList, setHistoryList] = useState([]);

    const getCollection = (querySnapshot) => {
        const allData = [];
        querySnapshot.forEach((res) => {
            const { date, details} = res.data();
            allData.push({ key: res.id, date, details });
        });
        setHistoryList(allData);
    };

    useEffect(() => {
        const unsubscribe = historyCollection.onSnapshot(getCollection);

        return () => {
            unsubscribe();
        };

    }, []);

    return (
        <View style={styles.tabContainer}>
            <ScrollView contentContainerStyle={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                {historyList.map((item, i) => (
                    <View style={{flex: 1, width: 380 }}>
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                // navigation.navigate("UpdatePage", {
                                //     prev: "ViewPage",
                                //     key: item.key,
                                // });
                            }}
                        >
                            <ListItem bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.listTitle}>{item.date} - {item.date}</ListItem.Title>
                                    <ListItem.Subtitle style={styles.listSubTitle}>วันที่บันทึก {item.date}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron color="black" />
                            </ListItem>
                        </TouchableOpacity>
                    </View>
                    
                ))}
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
    listTitle: {
        fontSize: 17,
        fontFamily: 'MitrMedium',
    },
    listSubTitle: {
        fontSize: 16,
        fontFamily: 'MitrRegular',
        color: 'grey'
    },
});

export default HistoryTab;

