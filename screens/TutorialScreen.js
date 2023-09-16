import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import AliceCarousel from 'react-alice-carousel';

const TutorialScreen = ({navigation, images}) => {
    // const settings = {
    //     infinite: true,
    //     dots: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     lazyLoad: true,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    // };

    return (
        <View style={styles.screen}>
            <LinearGradient
                colors={['#FC7D7B', '#9F79EB']}
                style={styles.gradientBackground}
            >
                <View style={styles.top}>
                    <Text>progress bar</Text>
                </View>

                <View style={styles.content}>
                    <Text>tutorial details</Text>
                    {/* <AliceCarousel autoPlay autoPlayInterval="3000">
                        <Image 
                            source={
                                require('../assets/icon.png')
                            }
                        />
                        <Image 
                            source={
                                require('../assets/icon.png')
                            }
                        />
                    </AliceCarousel> */}
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity 
                        style={styles.button}
                        // onPress={() => {
                        //     navigation.navigate("login", {});
                        // }}
                    >
                        <Text style={styles.textButton}>Start tutorial</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate("homePage", {});
                        }}
                    >
                        <Text style={[styles.text, { 
                            top: 15,
                            textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            textShadowOffset: {width: -1, height: 2},
                            textShadowRadius: 15,
                        }]}>
                            Skip for now
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    top: {
        height: "10%",
        width: "100%",
        // backgroundColor: 'pink',
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        height: "70%",
        width: "100%",
        // backgroundColor: 'grey',
        justifyContent: "center",
        alignItems: "center",
    },
    gradientBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 55,
        width: 300,
        borderRadius: 50,
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1,
        elevation: 5,
    },
    textButton: {
        color:"#FF9B80", 
        fontWeight: "bold",
        fontSize: 20,
    },
    bottom: {
        height: "20%",
        width: "100%",
        // backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
    },
    // sliderimg: {
    //     width: "100%",
    //     height: "500px",
    // }
});
  
export default TutorialScreen;