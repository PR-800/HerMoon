import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Modal, Alert  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts } from 'expo-font';

import firebase from "../data/firebaseDB";
import { Icon } from '@iconify/react';
import { tr } from 'date-fns/locale';
import { ScrollView } from 'react-native-web-hover';

class ProfileScreen extends Component {

    constructor() {
        super();

        this.accountCollection = firebase.firestore().collection("accounts");

        this.profilesCollection = firebase.firestore().collection("profileImage");

        this.state = {
            activeUser: null, 
            name: "",
            periodCycle: '',
            freq: '',
            img: '',
            selectedPicture: null,
            modalVisible: false,
            profile_List: [],
        };
    }

    // setActiveuser = () => {
    //     this.setState({ activeUser });
    // }

    getCollection = (querySnapshot) => {
        const all_data = [];
        querySnapshot.forEach((res) => {
            // console.log("res: ", res);
            // console.log("res.data() : ", res.data());
    
          const { uri, } = res.data();
          all_data.push({
            key: res.id,
            uri,
          });
        });
        // console.log('all_data :>> ', all_data);
        this.setState({
            profile_List: all_data,
        });
    };

    
    componentDidMount() {
        
        this.unsubscribe = this.profilesCollection.onSnapshot(this.getCollection);
        
        this.props.navigation.navigate("Calendar", {
            activeUser: this.props.route.params.activeUser,
        });
        
        if (this.props.route.params && this.props.route.params.activeUser) {
            this.state.activeUser = this.props.route.params.activeUser;
            console.log('--- Profile ');
            console.log(this.state.activeUser)
        }
        
        const accountDoc = firebase.firestore().collection("accounts")
        .doc(this.props.route.params.activeUser.key);
        
        accountDoc.get().then((res) => {
            if (res.exists) {
                const doc = res.data();
                this.setState({
                    key: res.id, 
                    name: doc.name, 
                    height: doc.height,
                    weight: doc.weight,
                    dob: doc.dob,
                    periodCycle: doc.periodCycle,
                    freq: doc.freq,
                    new_user: doc.new_user,
                    img: doc.img,
                });
                console.log('img :>> ', doc.img);
            }
            else {
                console.log("Document does not exist");
            }
        });
        
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    //update
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    updateImage() {

        const updateImgDoc = firebase
            .firestore()
            .collection("accounts")
            .doc(this.state.key);
        updateImgDoc
            .set({
                username: this.state.activeUser.username,
                password: this.state.activeUser.password,
                name: this.state.name,
                height: this.state.height,
                weight: this.state.weight,
                dob: this.state.dob,
                periodCycle: this.state.cycle,
                freq: this.state.freq,
                new_user: false,
                img: this.state.img,
            })
            .then(() => {
                Alert.alert(
                    "Updating Alert",
                    "The Image was updated!! Pls check your DB!!"
                );
            });
            console.log('this.state.img :>> ', this.state.img);
    }
    
    //Modal
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };
    closeModal = () => {
        this.setModalVisible(false);
    };

    //edit Profile Image
    handlePictureSelection = (picture) => {
        // console.log('Selected picture:', picture);
        this.setState({ selectedPicture: picture });
    };

    render() {
        const {navigation} = this.props

        // console.log('profilePictures:', profilePictures);
        // console.log('Selected picture:', this.state.selectedPicture);

        return ( 
            <View style={styles.screen}>
                <LinearGradient
                    colors={['#FC7D7B', '#9F79EB']}
                    style={[styles.gradientBackground, {}]}
                >
                    {/* {this.state.profile_List.map((item, i) => { */}
                        <Image
                            // source={require('../assets/profile/blank-profile.jpg')}
                            source={{
                                uri: this.state.img ? this.state.img
                                : 'https://cdn.discordapp.com/attachments/944667694517616720/1165257024787992687/blank-profile.jpg?ex=6546312c&is=6533bc2c&hm=02a4cba975984730be15792b7b8fd329c696d392f468d822f659bb4f9b725091&'
                              }}            
                              
                            style={styles.image}
                        />

                    {/* })} */}
                    <Pressable onPress={() => {
                            this.setModalVisible(true)
                        }}>
                        <Image
                            source={require('../assets/profile/edit-profile2.png')}
                            style={{width:50, height:50,bottom:50, left:55, backgroundColor: 'white', borderRadius: 25}}
                        />
                    </Pressable>
                    <Text style={styles.headers}>
                        {/* {this.state.activeUser.username} */}
                        {this.state.name}
                    </Text>
                    <Text style={styles.subheader}>
                        ระยะห่าง : {this.state.periodCycle} วัน {'\n'}
                        จำนวนวันที่เป็น : {this.state.freq} วัน
                    </Text>
                    <View style={styles.box} >
                        <Pressable onPress={() => {
                            console.log("Active user from Profile")
                            console.log(this.state.activeUser)
                            navigation.navigate("editProfile", {
                                activeUser: this.state.activeUser,
                                img: this.state.img,
                            });
                        }}>
                            <View style={styles.group}>
                                <Image
                                    source={require('../assets/profile/editprofile.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.content}>แก้ไขข้อมูล</Text>
                            </View>
                        
                        </Pressable> 
                        
                        <Pressable onPress={() => {
                            navigation.navigate("notification", {});
                        }}>
                            <View style={styles.group}>
                                <Image
                                    source={require('../assets/profile/notification.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.content}>การแจ้งเตือน</Text>
                            </View>
                        </Pressable>
        
                    </View>
        
                    <View style={styles.box} >
                        {/* <Pressable onPress={() => {
                            navigation.navigate("tutorial", {});
                            return console.log("tutorial")
                        }}>
                            <View style={styles.group}>
                                <Image
                                    source={require('../assets/profile/support.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.content}>คู่มือการใช้งาน</Text>
                            </View>
                        
                        </Pressable>  */}
                        
                        <Pressable onPress={() => {
                            navigation.navigate("contact", {});
                            return console.log("Contact")
                        }}>
                            <View style={styles.group}>
                                <Image
                                    source={require('../assets/profile/contact.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.content}>ติดต่อเรา</Text>
                            </View>
                        </Pressable>
        
                        <Pressable onPress={() => {
                            navigation.navigate("privacy", {});
                        }}>
                            <View style={styles.group}>
                                <Image
                                    source={require('../assets/profile/privacy.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.content}>นโยบายความเป็นส่วนตัว</Text>
                            </View>
                            
                        </Pressable>
        
                    </View>

                    <View style={{...styles.logoutButton, justifyContent: 'flex-end'}}>
                        <Pressable onPress={() => {
                            Alert.alert(
                                "ยืนยันการออกจากระบบ",
                                "ต้องการออกจากระบบใช่หรือไม่ ?",
                                [{
                                    text: "ใช่",
                                    onPress: () => {
                                    //   setShowBox(false);
                                      this.props.navigation.navigate("login", {});
                                    }},
                                  { text: "ไม่" },
                                ]);
                        }}>
                            <View style={styles.group}>
                                <Image
                                    source={require('../assets/profile/logout.png')}
                                    style={styles.icon}
                                />
                                <Text style={{...styles.content, color:'black'}}>ออกจากระบบ</Text>
                            </View>
                            
                        </Pressable>
                    </View>


                </LinearGradient>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    statusBarTranslucent={false}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.closeModal();
                    }}
                >
                    <TouchableOpacity
                        style={styles.modalBackdrop}
                        activeOpacity={1}
                        // onPress={this.closeModal}
                    >
                        <View style={styles.modalContent}>
                            <View>
                                <Text style={styles.modalText}>เลือกรูปโปรไฟล์ : </Text>
                                <Pressable
                                    style={{position: 'absolute', right: -10, top: -15, }}
                                    onPress={this.closeModal}
                                >
                                    <Image
                                        source={require('../assets/profile/close.png')}
                                        style={styles.icon}
                                    />
                                </Pressable>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                    {this.state.profile_List.map((picture, index) => (
                                        <TouchableOpacity key={index} onPress={() => this.handlePictureSelection(picture.uri)}>
                                            <Image source={{ uri: picture.uri || 'https://media.discordapp.net/attachments/1100793171551715408/1162053686785232936/image.png?ex=6543c454&is=65314f54&hm=9cde83da09610bae67e60ee9c78b3980abacc7faf9673422f67e48512bef2677&=&width=1202&height=676' }}
                                                style={{ width: 100, height: 100, margin: 5, borderRadius: 50 }} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {this.state.selectedPicture && (
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={styles.modalText}>รูปที่เลือก : </Text>
                                        <Image source={{ uri: this.state.selectedPicture }} style={{ width: 150, height: 150, borderRadius: 75, }} />

                                        <Pressable
                                            onPress={() => {
                                                this.inputValueUpdate(this.state.selectedPicture, 'img'),

                                                // มีปัญหาาา
                                                // this.updateImage()
                                                // console.log('this.state.selectedPicture :>> ', this.state.selectedPicture);
                                                this.closeModal()

                                            }}
                                        >
                                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                                colors={['#9F79EB', '#FC7D7B',]}
                                                style={styles.linearGradientModal}
                                            >
                                                <Text style={styles.buttonClose}>ใช้งาน</Text>
                                            </LinearGradient>
                                        </Pressable>
                                    </View>
                                )}

                            </View>
                        </View>

                    </TouchableOpacity>
                </Modal>


                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 150, 
        height: 150, 
        resizeMode: "contain", 
        // borderRadius: "50%",
        borderRadius: 75,
        marginTop: 20,
    },
    headers: {
        fontSize: 25,
        fontFamily: "MitrMedium",
        marginTop: -40,
        margin: 3,
        color: "white",

        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 2},
        textShadowRadius: 15,
    },
    subheader: {
        fontSize: 17,
        color: "white",
        fontFamily: "MitrRegular",
        textAlign: 'center',

        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 2},
        textShadowRadius: 15,
    },
    box: {
        display: "flex",
        // flex: 1,
        width: 350,
        marginTop: 30,
        padding: 15,
        backgroundColor: "white",

        // shadow
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2,
        elevation: 5,
    },
    content: {
        // fontFamily: "monospace",
        fontSize: 17 ,
        fontFamily: "MitrRegular",
        margin: 4,
    },
    icon: {
        display: "flex",
        top: 5,
        width: 25,
        height: 25,
        marginHorizontal: 5,
    },
    group: {
        flexDirection: "row",
        margin: 7,
    },
    gradientBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navbar: {
        padding: 30,
        paddingTop: 60,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header: {
        display: "flex",
        fontSize: 25,
        color: "white",
        fontFamily: 'MitrMedium',
        marginTop: -8,
    },
    gradientNavbar: {
        width: '100%',
        height: '15%',
        justifyContent: 'center',
    },
    logoutButton: {
        marginTop: 25, paddingHorizontal: 10, backgroundColor: 'white', borderRadius: 25,
        // shadow
        // borderWidth: 2,
        // borderColor: "black",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2,
        elevation: 5,
    },


    // modal zone
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // width: '90%'
    },
    modalText: {
        textAlign: 'center', fontFamily: "MitrMedium",
        fontSize: 18,
        marginVertical: 10,
    },
    linearGradientModal: {
        width: 150,
        height: 50,
        marginTop: 15,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonClose: {
        color: 'white',
        fontFamily: "MitrMedium",
        fontSize: 20,
    },
});

export default ProfileScreen
