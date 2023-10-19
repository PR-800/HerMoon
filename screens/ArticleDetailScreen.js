import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Image, Pressable, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import firebase from '../data/firebaseDB';

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

                const rawDate = article.date.toDate();
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedDate = rawDate.toLocaleDateString('en-GB', options);
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
                                    <Image
                                    style={{ alignSelf: 'center', margin: 20, width: '90%', aspectRatio: 3 / 3 }}
                                    source={{ uri: this.state.coverImg }}
                                  />
                                  
                                )}
    
    
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
