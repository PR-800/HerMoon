import React, { useState, Component } from 'react'
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, ScrollView,  } from 'react-native';;
import { LinearGradient } from 'expo-linear-gradient';

// component สำหรับบันทึกข้อมูลเพิ่มเติมของประจำเดือน
const NotesModal = ({ visible, onClose, navigation }) => {

    const [selectedTags, setSelectedTags] = useState([]);
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
        'tag2345678',
        'มีเลือดออกกะปริบกะปรอย',
        'มีเลือดออกกะปริบกะปรอย1',
        'มีเลือดออกกะปริบกะปรอย2',
        'เลือดออกหลังมีเพศสัมพันธ์', 
        'tags5', 
        'tags6',
    ]
    // console.log('selectedTags :>> ', selectedTags);



    const [dataNotesModal, setDataNotesModal] = useState(''); //เก็บข้อมูลเพิ่มเติมของประจำเดือนเพื่อนำไปแสดงหน้า Home
    // console.log('dataNotesModal :>> ', dataNotesModal);
    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.screen}>
                <LinearGradient colors={['#BF89FF', '#E8D9F1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.modalView}>
                    <View style={{ margin: 25, flexDirection: 'row', alignItems: 'center', }}>
                        <Image

                            source={require('../assets/Home/notes01-icon.png')}
                            style={styles.image}
                            tintColor={'black'}
                        />
                        <Text style={styles.textHeader}> บันทึกข้อมูลเพิ่มเติม</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 20, width: 250, height: 250, paddingHorizontal: 10, paddingVertical: 20, alignSelf: 'center' }}>
                        <ScrollView vertical showsVerticalScrollIndicator={false}>
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
                        </ScrollView>
                    </View>
                    
                    <View style={{position:'absolute', bottom: 10, right: 10}}>
                        <TouchableOpacity
                            onPress={() => {
                                setDataNotesModal(selectedTags);
                                navigation.navigate("Home", { dataNotesModal });
                                console.log('selectedTags2 :>> ', selectedTags);
                            }}>
                            <Image
                                source={require('../assets/Home/save03-icon.png')}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{position:'absolute', top: -30, right: 10 }}>
                        <TouchableOpacity onPress={onClose}>
                            <Image
                                source={require('../assets/Home/arrow-left-icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </Modal>)
}

const styles = StyleSheet.create({
    screen: {
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
        width: 300,
        height: 350
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'MitrMedium'
    },
    textNormal: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: 'MitrRegular',
    },
    //tags
    tagContainer: {
        alignItems: 'center',
      },
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

export default NotesModal;