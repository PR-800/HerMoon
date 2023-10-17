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
                this.setState({
                    key: res.id,
                    name: article.name,
                    nameImg: article.nameImg,
                    title: article.title,
                    description: article.description,
                    date: article.date,
                    coverImg: article.coverImg,
                });
                // console.log('coverImg : ', this.state.coverImg)
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

                            <Image
                                style={{ alignSelf: 'center', margin: 20 }}
                                // source={{ uri: this.state.coverImg }}
                                source={require('../assets/article/test-cover.png')}
                            />


                            <Text style={styles.detail}>
                                {this.state.description}  
                            </Text>
                            <Text style={{fontFamily: 'MitrRegular', textAlign: 'right', }} >
                                {'\n'}{this.state.date}
                                {'\n'}Written by {this.state.name}
                            </Text>
                            
                        </View>
                    </ScrollView>

                </View>


            </View>
        );
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
        textAlign: "center",
        fontSize: 15,
    },

});

export default ArticleDetailScreen;
