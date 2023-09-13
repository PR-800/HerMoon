import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
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
            <Text>Tutorial Screen !</Text>
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
            <Text style={{fontSize: 20}}></Text>
            <Text
                onPress={() => {
                    navigation.navigate("homePage", {});
                }}
            >x Go to Home (edit navigation here)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    sliderimg: {
        width: "100%",
        height: "500px",
    }
});
  
export default TutorialScreen;