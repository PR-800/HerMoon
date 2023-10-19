import React, {Component} from 'react'
import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useFonts } from 'expo-font';

import firebase from '../data/firebaseDB';
import { enableExpoCliLogging } from 'expo/build/logs/Logs';

class ArticleScreen extends Component {
    constructor() {
        super();

        this.articlesCollection = firebase.firestore().collection("articles");

        this.state = {
            // Initialize your state variables here
            article_list: [],
        }
    }

    getCollection = (querySnapshot) => {
        const all_data = [];
        querySnapshot.forEach((res) => {
            // console.log("res: ", res);
            // console.log("res.data() : ", res.data());
    
          const { name, nameImg, title, description, date, coverImg } = res.data();
          all_data.push({
            key: res.id,
            name,
            nameImg,
            title,
            description,
            date,
            coverImg,
          });
        });
        // console.log("all_data : ", all_data);
        
        this.setState({
            article_list: all_data,
        });
      };
    
      componentDidMount() {
        this.unsubscribe = this.articlesCollection.onSnapshot(this.getCollection);
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const {navigation} = this.props
        return ( 
            // navbar
            <View style={styles.screen}>
                <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                colors={['#9F79EB', '#FC7D7B',]}
                style={styles.gradientBackground}
                >
                    <View style={styles.navbar}>
                        <Pressable onPress={() => {
                                    navigation.navigate("Home", {});
                                    return console.log("go Home")
                                }}>
                            <Image
                            style={styles.icon}
                            source={require('../assets/article/arrow-left-white.png')}
                            />
                        </Pressable>
                        <Text style={styles.subheading}>ค้นหา</Text>
                        <Pressable onPress={() => {
                                    // navigation.navigate("Home", {});
                                    return console.log("searching")
                                }}>
                            <Image
                            style={styles.icon}
                            source={require('../assets/article/search.png')}
                            />
                        </Pressable>
                    </View>
                    <Text style={styles.header}>บทความ</Text>
                </LinearGradient>

                <ScrollView>
                    {this.state.article_list.map((item, i) => {
                        
                        const rawDate = item.date.toDate();
                        const options = { day: 'numeric', month: 'long', year: 'numeric' };
                        const formattedDate = rawDate.toLocaleDateString('en-GB', options);

                        // console.log('item.date :>> ', item.date);
                        // console.log('formattedDate :>> ', formattedDate);

                        return (
                            <TouchableOpacity style={styles.boxList} key={i}
                                onPress={() => {
                                    navigation.navigate("articleDetail", {
                                        key: item.key,
                                        name: item.name,
                                        nameImg: item.nameImg,
                                        title: item.title,
                                        description: item.description,
                                        date: formattedDate,
                                        coverImg: item.coverImg,
                                    });
                                    // console.log('item', item)
                                }}
                            >
                                <View>
                                    <View style={styles.groupUsername}>
                                        <Image
                                            style={styles.userIcon}
                                            source={{ uri: item.nameImg }}
                                        />
                                        <Text style={styles.name}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.groupBox}>
                                        <View style={styles.groupLeft}>
                                            <Text style={styles.title} numberOfLines={3}>
                                                {item.title}
                                            </Text>
                                        </View>
                                        <View style={styles.groupRight}>
                                            <Image
                                                style={styles.coverImg}
                                                source={{ uri: item.coverImg }}
                                                />
                                        </View>
                                        <Text style={{display:'none'}} >{ item.coverImg }</Text>
                                    </View>
                                    <Text style={styles.timestamp}>
                                        {formattedDate}
                                    </Text>
                                    <Text style={styles.detail} numberOfLines={2}>
                                        {item.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    )}


                </ScrollView>

            </View>
        )
    }

}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
    gradientBackground: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    navbar: {
        padding: 30,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subheading: {
        display: "flex",
        fontSize: 20,
        color: "white",
        fontWeight: "600",
        fontFamily: 'MitrRegular'
    },
    icon: {
        display: "flex",
        width: 25,
        height: 25,
        // color: "white",
    },
    header: {
        marginLeft:40,
        fontSize: 40,
        color:"white",
        fontFamily: 'MitrMedium'
    },
    boxList: {
        borderRadius: 20,
        justifyContent: "center",
        // flexDirection: "row",
        margin: 20,
        padding: 15,
        width: "90%",
        backgroundColor: "white",
    },
    name: {
        marginLeft: 8,
        fontFamily: 'MitrRegular'
    },
    title: {
        fontSize: 20,
        // fontWeight: "bold",
        marginVertical: 5,
        lineHeight: 25,
        fontFamily: 'MitrMedium'
    },
    timestamp: {
        marginBottom: 10,
        color: "gray",
        fontFamily: 'MitrRegular',
        
    },
    detail: {
        fontFamily: 'MitrRegular'
    },
    userIcon: {
        marginHorizontal: 5,
        objectFit: 'cover',
        borderRadius: 50,
        bottom: 2,
        width: 30,
        height: 30
    },
    groupUsername: {
        flexDirection: "row",
    },
    groupBox: {
        flexDirection: "row",
    },
    groupLeft: {
        width: "50%",
        paddingVertical: 5,
        // borderWidth: 2,
    },
    groupRight: {
        width: "50%"
    },
    coverImg: {
        display: "flex",
        resizeMode: 'contain',
        borderRadius: 10,
        marginTop: 1,
        left: 50,
        width: 110,
        height: 110,
        margin: -15

    }
});

export default ArticleScreen
