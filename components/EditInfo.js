import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../data/firebaseDB';

const EditInfo = ({ visible, onClose, selectedColor, selectedVolume, selectedNotes, selectedId }) => {
    const [dataColor, setDataColor] = useState(selectedColor); //เก็บข้อมูลสีประจำเดือนที่ต้องการอัพเดต ถ้าไม่เลือกจะใช้ข้อมูลเก่า
    const [dataVolume, setDataVolume] = useState(selectedVolume); //เก็บข้อมูลปริมาณประจำเดือนที่ต้องการอัพเดต ถ้าไม่เลือกจะใช้ข้อมูลเก่า
    // const [dataNotes, setDataNotes] = useState(selectedNotes); //เก็บข้อมูลอาการเพิ่มเติมที่ต้องการอัพเดต ถ้าไม่เลือกจะใช้ข้อมูลเก่า
    // console.log('dataNotes :>> ', dataNotes);
    console.log('selectedNotes :>> ', selectedNotes);

    const [selectedTags, setSelectedTags] = useState([selectedNotes]);
        const toggleTag = (tag) => {
            if (selectedTags.includes(tag)) {
                setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
            } else {
                setSelectedTags([...selectedTags, tag]);
            }
        };
        // console.log('selectedTags : ', selectedTags)

        const tags = [
            'เปลี่ยนผ้าอนามัยทุกชม.',
            'พักผ่อนน้อย',
            'มีกลิ่น อาการคัน',
            'มีเลือดออกกะปริบกะปรอย',
            'มีลิ่มเลือดก้อนใหญ่กว่า 1 นิ้ว',
            'ปวดท้องอย่างรุนแรง',
            'ปวดหลังส่วนล่างอย่างรุนแรง',
            'เลือดหยดช่วงที่ไม่มีประจำเดือน',
            'ประจำเดือนมานานเกิน 8 วัน',
        ]



    //update data ลง firebase
    const UpdateMonthlySummary = () => {
        const databaseRef = firebase.firestore().collection("monthly_summary").doc(selectedId[0]);

        const updatedData = {
            menstrual_color: dataColor,
            menstrual_volume: dataVolume,
            menstrual_notes: selectedTags,
        };
        console.log('menstrual_notes :>> ', updatedData.menstrual_notes);

        // ทำการอัปเดตข้อมูล
        databaseRef.update(updatedData)
            .then(() => {
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: (
                        <Text style={{fontFamily: 'MitrRegular', fontSize: 18}}>อัพเดตข้อมูลรอบเดือนสำเร็จ</Text>
                    ),
                    button: 'OK',
                });
                // console.log('อัปเดตข้อมูลสำเร็จ');
            })
            .catch((error) => {
                console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ', error);
            });
    }
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.centeredView}>
                <LinearGradient colors={['#9F79EB', '#FC7D7B',]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 20, flexDirection: 'row', alignItems: 'center',}}>
                        <Image

                            source={require('../assets/Home/edit01-icon.png')}
                            style={{ width: 25, height: 25 }}
                        />
                        <Text style={[{ fontFamily: 'MitrRegular', fontSize: 20, color: 'white' }]}>  แก้ไขข้อมูล</Text>
                    </View>

                    {/* เลือกสีประจำเดือนที่ต้องการอัพเดต */}
                    <View style={{ backgroundColor: 'white', borderRadius: 20,  width: "85%", height: 550, paddingVertical: 20, paddingHorizontal: 10 }}>
                    <ScrollView vertical showsVerticalScrollIndicator={false}>
                        <View style={[styles.textBox, { borderColor: '#FFB4BF', height: 40,  }]}>
                            <Image
                                source={require('../assets/Home/blood01-icon.png')}
                            />
                            <Text style={[styles.textNormal]}>{selectedColor}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีแดงสด'
                                        status={dataColor === 'สีแดงสด' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีแดงสด')}
                                        color='#FF0000'
                                    />
                                    <Text style={styles.modalText}>สีแดงสด</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีแดงส้ม'
                                        status={dataColor === 'สีแดงส้ม' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีแดงส้ม')}
                                        color='#FD4400'
                                    />
                                    <Text style={styles.modalText}>สีแดงส้ม</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีแดงเข้ม'
                                        status={dataColor === 'สีแดงเข้ม' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีแดงเข้ม')}
                                        color='#BE0A01'
                                    />
                                    <Text style={styles.modalText}>สีแดงเข้ม</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 30 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีชมพู'
                                        status={dataColor === 'สีชมพู' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีชมพู')}
                                        color='#FF97C5'
                                    />
                                    <Text style={styles.modalText}>สีชมพู</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีน้ำตาล'
                                        status={dataColor === 'สีน้ำตาล' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีน้ำตาล')}
                                        color='#7A601C'
                                    />
                                    <Text style={styles.modalText}>สีน้ำตาล</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value='สีดำ'
                                        status={dataColor === 'สีดำ' ? 'checked' : 'unchecked'}
                                        onPress={() => setDataColor('สีดำ')}
                                        color='black'
                                    />
                                    <Text style={styles.modalText}>สีดำ</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value='สีแดงอมเทาปนและสีเขียว'
                                status={dataColor === 'สีแดงอมเทาปนและสีเขียว' ? 'checked' : 'unchecked'}
                                onPress={() => setDataColor('สีแดงอมเทาปนและสีเขียว')}
                                color='#576458'
                            />
                            <Text style={styles.modalText}>สีแดงอมเทาปนและสีเขียว</Text>
                        </View>
                        {/* <Text> {dataColor} </Text> */}

                        {/* เลือกปริมาณประจำเดือนที่ต้องการอัพเดต */}
                        <View style={[styles.textBox, { borderColor: '#89DCFF', height: 40, }]}>
                            <Image 
                            style={{ alignSelf: 'center' }}
                                source={require('../assets/Home/sanitarypad02-icon.png')}
                            />
                            <Text style={[styles.textNormal, { justifyContent: 'center' }]}>
                                {selectedVolume}
                            </Text>
                        </View>

                        <View style={{ backgroundColor: 'white', borderRadius: 40 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="ปริมาณมาก"
                                    status={dataVolume === 'ปริมาณมาก' ? 'checked' : 'unchecked'}
                                    onPress={() => setDataVolume('ปริมาณมาก')}
                                    color='#BE0A01'
                                />
                                <Text style={styles.modalText}>ปริมาณมาก</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="ปริมาณปานกลาง (ปกติ)"
                                    status={dataVolume === 'ปริมาณปานกลาง (ปกติ)' ? 'checked' : 'unchecked'}
                                    onPress={() => setDataVolume('ปริมาณปานกลาง (ปกติ)')}
                                    color='#FF0000'
                                />
                                <Text style={styles.modalText}>ปริมาณปานกลาง (ปกติ)</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="ปริมาณน้อย"
                                    status={dataVolume === 'ปริมาณน้อย' ? 'checked' : 'unchecked'}
                                    onPress={() => setDataVolume('ปริมาณน้อย')}
                                    color='#F98585'
                                />
                                <Text style={styles.modalText}>ปริมาณน้อย</Text>
                            </View>
                            {/* <Text> {dataVolume} </Text> */}
                        </View>

                        {/* เลือกสีอาการเพิ่มเติมที่ต้องการอัพเดต */}
                            <View style={[styles.textBox, { flexDirection: 'row', borderColor: '#B579CF' }]}>
                                <Image
                                style={{ alignSelf: 'center' }}
                                    source={require('../assets/Home/notes02-icon.png')}
                                />
                                <View style={{ justifyContent: 'center', paddingLeft: 10, paddingRight: 5, flex: 1 }}>
                                    <Text style={styles.textNormal}>
                                        {selectedTags === 'บันทึกข้อมูลเพิ่มเติม' || '' ? 'บันทึกข้อมูลเพิ่มเติม' : selectedTags.map(note => `\u2022 ${note}`).join('\n')}
                                    </Text>
                                </View>
                                {/* <Text style={[styles.textNormal, { paddingTop: 3, paddingLeft: 10 }]} numberOfLines={1} ellipsizeMode="tail">
                                    {selectedTags}
                                </Text> */}
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                                    {tags.map((tag) => (
                                        <TouchableOpacity key={tag}
                                            style={[
                                                styles.tag,
                                                { backgroundColor: selectedTags.includes(tag) ? '#9F79EB' : '#e8e8e8' },
                                            ]}
                                            onPress={() => {
                                                toggleTag(tag);
                                            }}
                                        >
                                            <Text style={[styles.tagText, { color: selectedTags.includes(tag) ? 'white' : 'black' }]}>{tag}</Text>
                                        </TouchableOpacity>
                                    ))}


                                </View>
                            </View>

                        {/* <View style={{ marginLeft: 170 }}> */}
                        </ScrollView>
                    </View>
                        <View style={{position:'absolute', bottom: 8, right: 5, borderRadius: 25,}}>
                            <TouchableOpacity onPress={UpdateMonthlySummary}>
                                <Image
                                    source={require('../assets/Home/save01-icon.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    <View style={{position:'absolute', top: -25, right: 5}}>
                        <TouchableOpacity onPress={onClose}>
                            <Image
                                source={require('../assets/Home/arrow-left-icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* เรียกใช้ alert */}
                    <AlertNotificationRoot>
                    </AlertNotificationRoot>
                </LinearGradient>
            </View>


        </Modal>)
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalView: {
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 320,
        height: 650
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'MitrRegular'
    },
    textBox: {
        flew: 1, flexDirection: 'row',
        margin: 5,
        marginVertical: 10,
        alignSelf: 'center',
        width: 250,
        // height: 40,
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1
    },
    textNormal: {
        fontFamily: 'MitrRegular',
        fontSize: 15,
        // paddingLeft: 5,
    },

    //tags
      tag: {
        justifyContent: 'center',
        height: 30,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
      },
      tagText: {
        fontSize: 15,
        fontFamily: "MitrRegular",
      },
      selectedTagsText: {
        marginBottom: 10,
        fontSize: 16,
        fontFamily: "MitrRegular",
        color: '#A43BA6',
      },
})

export default EditInfo;