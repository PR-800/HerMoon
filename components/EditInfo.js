import React, { useState, useEffect  } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../data/firebaseDB';

const EditInfo = ({ visible, onClose, selectedColor, selectedVolume, selectedNotes, selectedId }) => {
    const [dataColor, setDataColor] = useState(selectedColor); //เก็บข้อมูลสีประจำเดือนที่ต้องการอัพเดต ถ้าไม่เลือกจะใช้ข้อมูลเก่า
    const [dataVolume, setDataVolume] = useState(selectedVolume); //เก็บข้อมูลปริมาณประจำเดือนที่ต้องการอัพเดต ถ้าไม่เลือกจะใช้ข้อมูลเก่า
    // const [dataNotes, setDataNotes] = useState(selectedNotes); //เก็บข้อมูลอาการเพิ่มเติมที่ต้องการอัพเดต ถ้าไม่เลือกจะใช้ข้อมูลเก่า
    
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        setSelectedTags(selectedNotes);
    }, [selectedNotes]);

    const toggleTag = (tag) => {
        const isSelected = selectedTags.some((selectedTag) => {
            if (Array.isArray(selectedTag)) {
                // ถ้า selectedTag เป็น array ให้เช็คว่า tag อยู่ในนั้นหรือไม่
                return selectedTag.includes(tag);
            } else {
                // ถ้า selectedTag เป็น string ให้เช็คตรงๆ
                return selectedTag === tag;
            }
        });

        if (isSelected) {
            // ถ้า tag มีอยู่แล้วใน selectedTags ให้นำออก
            const updatedTags = selectedTags.map((selectedTag) => {
                if (Array.isArray(selectedTag)) {
                    // ถ้า selectedTag เป็น array ให้นำ tag ออก
                    return selectedTag.filter((innerTag) => innerTag !== tag);
                } else {
                    // ถ้า selectedTag เป็น string ไม่ต้องทำอะไร
                    return selectedTag;
                }
            });
    
            setSelectedTags(updatedTags);
        } else {
            // ถ้า tag ยังไม่มีใน selectedTags ให้เพิ่มเข้าไป
            setSelectedTags([...selectedTags, tag]);
        }
    };

        const tags = [
            'เปลี่ยนผ้าอนามัยทุกชม.',
            'พักผ่อนน้อย',
            'มีกลิ่น', 'มีอาการคัน',
            'มีเลือดออกกะปริบกะปรอย',
            'มีลิ่มเลือดก้อนใหญ่กว่า 1 นิ้ว',
            'ปวดท้องอย่างรุนแรง',
            'ปวดหลังส่วนล่างอย่างรุนแรง',
            'เลือดหยดช่วงที่ไม่มีประจำเดือน',
            'ประจำเดือนมานานเกิน 8 วัน',
        ]

        if (selectedTags && selectedTags[0] && selectedTags[0].length === 0) {
            selectedTags.shift();
        }


        const UpdateMonthlySummary = () => {
            const databaseRef = firebase.firestore().collection("dailyRecord").doc(selectedId[0]);
        
            if (dataColor.length === 0 || dataVolume.length === 0) {
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: (
                        <Text style={styles.textNormal}>กรุณากรอกระดับสีและปริมาณ</Text>
                    ),
                    button: 'OK',
                });
            } else {
                const updatedData = {
                    menstrual_color: dataColor,
                    menstrual_volume: dataVolume,
                    menstrual_notes: selectedTags.flat(),
                };
        
                databaseRef
                    .update(updatedData)
                    .then(() => {
                        Dialog.show({
                            type: ALERT_TYPE.SUCCESS,
                            title: (
                                <Text style={{ fontFamily: 'MitrRegular', fontSize: 18 }}>อัพเดตข้อมูลรอบเดือนสำเร็จ</Text>
                            ),
                            button: 'OK',
                        });
                    })
                    .catch((error) => {
                        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ", error);
                    });
            }
        };

    const colors = [
        { value: 'สีแดงสด', hex: '#FF0000' },
        { value: 'สีแดงส้ม', hex: '#FD4400' },
        { value: 'สีแดงเข้ม', hex: '#BE0A01' },
        { value: 'สีชมพู', hex: '#FF97C5' },
        { value: 'สีน้ำตาล', hex: '#7A601C' },
        { value: 'สีแดงอมเทาปนเขียว', hex: '#576458' },
        { value: 'สีดำ', hex: 'black' },
    ];
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
                            <Text style={[styles.textNormal]}>{dataColor == '' ? selectedColor : dataColor}</Text>
                        </View>
                        
                        {colors.map((color) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} key={color.value}>
                                <RadioButton
                                    value={color.value}
                                    status={dataColor === color.value ? 'checked' : 'unchecked'}
                                    onPress={() => setDataColor(color.value)}
                                    color={color.hex}
                                />
                                <Text style={styles.textNormal}>{color.value}</Text>
                            </View>
                        ))}
                        {/* <Text> {dataColor} </Text> */}

                        {/* เลือกปริมาณประจำเดือนที่ต้องการอัพเดต */}
                        <View style={[styles.textBox, { borderColor: '#89DCFF', height: 40, }]}>
                            <Image 
                            style={{ alignSelf: 'center' }}
                                source={require('../assets/Home/sanitarypad02-icon.png')}
                            />
                            <Text style={[styles.textNormal, { justifyContent: 'center' }]}>
                            {dataVolume == '' ? selectedVolume : dataVolume}
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
                                <View style={{ justifyContent: 'center', paddingLeft: 10, padding: 5, flex: 1 }}>
                                    <Text style={styles.textNormal}>
                                    {selectedTags === 'บันทึกข้อมูลเพิ่มเติม' ? 'บันทึกข้อมูลเพิ่มเติม' :  selectedTags.flat().map(selectedTag => `\u2022 ${selectedTag}`).join('\n')}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>

                                    {tags.map((tag) => (
                                        <TouchableOpacity key={tag}
                                            style={[
                                                styles.tag,
                                                { backgroundColor: selectedTags.flat().includes(tag) ? '#9F79EB' : '#e8e8e8' },
                                            ]}
                                            onPress={() => {
                                                toggleTag(tag);
                                            }}
                                        >
                                            <Text style={[styles.tagText, { color: selectedTags.flat().includes(tag) ? 'white' : 'black' }]}>{tag}</Text>
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