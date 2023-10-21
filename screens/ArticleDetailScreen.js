import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Image, Pressable, Text, ImageBackground } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import firebase from '../data/firebaseDB';

import ImageView from 'react-native-image-view';

import { format } from 'date-fns';
import { th, tr } from 'date-fns/locale';

class ArticleDetailScreen extends Component {
    constructor() {
        super();

        this.state = {
            key: "",
            name: "",
            nameImg: "",
            title: "",
            description: "",
            date: "",
            coverImg: "",
            formattedDate: '',
            viewImage: false,
        };
    }

    componentDidMount() {
        const articleDoc = firebase

            .firestore()
            .collection("articles")
            .doc(this.props.route.params.key);
        // console.log("this.props.root.params()", this.props.route.params.key)
        articleDoc.get().then((res) => {
            if (res.exists) {
                const article = res.data();
                this.setState(
                    {
                      key: res.id,
                      name: article.name,
                      nameImg: article.nameImg,
                      title: article.title,
                      description: article.description,
                      date: article.date,
                      coverImg: article.coverImg,
                    },
                    () => {
                      // Call forceUpdate to trigger a re-render
                      this.forceUpdate();
                    }
                  );

                  // Custom Thai month names
                const thaiMonthNames = [
                    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
                    'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
                    'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
                ];

                const rawDate = article.date.toDate();
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                // const formattedDate = rawDate.toLocaleDateString('en-GB', options);      // 17 July 2023
                // const formattedDate = format(rawDate, 'dd LLL yyyy', { locale: th });    // 17 ก.ค. 2566
                const formattedDate = format(rawDate, 'dd LLLL yyyy', { locale: { ...th, months: thaiMonthNames } });   //17 กรกฏาคม 2566

                // console.log('formattedDate :>> ', formattedDate);

                this.setState({ formattedDate });

            } else {
                console.log("Document does not exist!!");
            }
        });
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    render() {
        const { navigation } = this.props

        const coverImg = this.state
        let viewImage = false;

        try {
            return (
                <View style={styles.screen}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        colors={['#9F79EB', '#FC7D7B',]}
                        style={styles.gradientBackground}
                    >
                        <View style={styles.navbar}>
                            <Pressable onPress={() => {
                                navigation.navigate("Article", {});
                            }}>
                                <Image
                                    style={styles.icon}
                                    source={require('../assets/article/arrow-left-white.png')}
                                />
                            </Pressable>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={styles.header} numberOfLines={2}>
                                    {this.state.title}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
    
                    <View style={styles.box}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ minHeight: '100%' }}>
                                <Text style={{fontFamily: 'MitrMedium', fontSize: 20, textAlign:'center'}}>
                                    {this.state.title}
                                </Text>
    
                                {this.state.coverImg && (
                                    <Pressable onPress={() => {
                                        viewImage = !viewImage
                                        console.log('viewImage :>> ', viewImage);
                                    }}>
                                        <Image
                                            style={{ alignSelf: 'center', margin: 20, width: '90%', aspectRatio: 3 / 3 }}
                                            source={{ uri: this.state.coverImg }}
                                        />
                                    </Pressable>
                                )}

{/* Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false` */}
                                {/* <ImageView
                                        images={[{
                                            source: {
                                                uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
                                            },
                                                    title: 'Paris',
                                                    width: 806,
                                                    height: 720,
                                                },
                                            ]}
                                        imageIndex={0}
                                        isVisible={true}
                                        // isVisible={this.state.viewImage}
                                        // renderFooter={(currentImage) => (<View><Text>My footer</Text></View>)}
                                    />
     */}
    
                                <Text style={styles.detail}>
                                {'\t'}{this.state.description}
                                </Text>
                                <Text style={{fontFamily: 'MitrRegular', textAlign: 'right', }} >
                                    {'\n'}{'\n'}{this.state.formattedDate}
                                    {'\n'}{/* Written by  */}
                                    {this.state.name}
                                </Text>
                                
                            </View>
                        </ScrollView>
    
                    </View>
    
    
                </View>
            );

        } catch (error) {
            console.error('Image rendering error :', error);
        }

    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
    gradientBackground: {
        width: '100%',
        height: '18%',
        justifyContent: 'center',
    },
    navbar: {
        padding: 30,
        paddingTop: 60,
        flexDirection: "row",
        // justifyContent: "space-between",
    },
    header: {
        // display: "flex",
        alignSelf: 'center',
        fontSize: 20,
        paddingHorizontal: 18,
        letterSpacing: .5,
        color: "white",
        fontFamily: 'MitrMedium',
        marginTop: -8,
    },
    box: {
        borderRadius: 20,
        justifyContent: "center",
        margin: 20,
        padding: 15,
        width: "90%",
        backgroundColor: "white",
        marginBottom: 170,
    },
    detail: {
        fontFamily: 'MitrRegular',
        textAlign: 'justify',
        fontSize: 15,
    },

});

export default ArticleDetailScreen;
