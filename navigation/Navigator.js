import React from "react";
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'; 

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TutorialScreen from "../screens/TutorialScreen";

const PageLoginNavigator = createNativeStackNavigator();
const MainNavigator = createNativeStackNavigator();

// หน้า login
function MyLoginNavigator() {
    return (
        <PageLoginNavigator.Navigator>
            <PageLoginNavigator.Screen name="login" component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <PageLoginNavigator.Screen name="register" component={RegisterScreen}
                options={{
                    headerShown: false
                }}
            />
            <PageLoginNavigator.Screen name="tutorial" component={TutorialScreen}
                options={{
                    headerShown: false
                }}
            />
        </PageLoginNavigator.Navigator>
    );
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <MainNavigator.Navigator>
                <MainNavigator.Screen name="main" component={MyLoginNavigator}
                    options={{
                        headerShown: false
                    }}
                />
            </MainNavigator.Navigator>
        </NavigationContainer>
    );
}
