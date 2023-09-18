import React from 'react'
import { StyleSheet, Text, View, Image, Pressable, Switch } from 'react-native';
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
                        source={require('../assets/profile/arrow-left.png')}
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
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
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
        // borderColor: "black",
        // borderWidth: 2,
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
    }
});

export default ArticleScreen
