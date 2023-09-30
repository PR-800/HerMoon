import React from 'react'
import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const ArticleScreen = ({ route, navigation }) => {
    return ( 
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
                    <Text style={styles.subheading}>Search</Text>
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
                <Text style={styles.header}>Article</Text>
            </LinearGradient>


            <ScrollView>
                <TouchableOpacity style={styles.boxList}>
                    <View style={styles.groupUsername}>
                        <Image
                        style={styles.userIcon}
                        source={require('../assets/article/test-user-image.png')}
                        />
                        <Text style={styles.name}>
                            Username
                        </Text>
                    </View>
                    <View style={styles.groupBox}>
                        <View style={styles.groupLeft}>
                        <Text style={styles.title} numberOfLines={3}>
                        6 visual design fundamentals that UX designersssss
                        </Text>
                        </View>
                        <View style={styles.groupRight}>
                        <Image
                            style={styles.coverImage}
                            source={require('../assets/article/test-cover.png')}
                        />
                        </View>
                    </View>
                    <Text style={styles.timestamp}>
                        17 hours ago
                    </Text>
                    <Text style={styles.detail} numberOfLines={2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </TouchableOpacity>
            
                


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: "white",
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
    },
    icon: {
        display: "flex",
        width: 25,
        height: 25,
        // color: "white",
    },
    header: {
        marginLeft:30,
        // margin:10,
        fontSize:25,color:"white",fontWeight:"bold",
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

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    timestamp: {
        marginVertical: 10,
        color: "gray"
    },
    detail: {

    },
    userIcon: {
        marginHorizontal: 5,
        bottom: 2,
        width: 25,
        height: 25
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
    coverImage: {
        display: "flex",
        resizeMode: 'contain',
        borderRadius: 10,
        left: 50,
        width: 100,
        height: 100,
        margin: -10

    }
});

export default ArticleScreen
