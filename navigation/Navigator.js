import React from "react";
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TutorialScreen from "../screens/TutorialScreen";

import HomeScreen from "../screens/HomeScreen"
import CalendarScreen from "../screens/CalendarScreen";
import ArticleInsideScreen from "../screens/ArticleInsideScreen";
import ProfileScreen from "../screens/ProfileScreen";

const PageLoginNavigator = createNativeStackNavigator();
const MainNavigator = createNativeStackNavigator();
const PageHomeNavigator = createNativeStackNavigator();

const BottomNavigator = createBottomTabNavigator();

// หน้าต่าง ๆ ที่มีการเชื่อมกัน
function MyPageNavigator() {
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
            <PageLoginNavigator.Screen name="homePage" component={MyBottomNavigator} 
                options={{
                    headerShown: false
                }}
            />
        </PageLoginNavigator.Navigator>
    );
}

// Tab ตัวเลือกหน้า Home
function MyBottomNavigator() {
    return (
        <BottomNavigator.Navigator>
            <BottomNavigator.Screen name="Home" component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="home" size={30} color="#8461D5" />;
                    },
                    }
                }
            />
            <BottomNavigator.Screen name="Calendar" component={CalendarScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <Fontisto name="calendar" size={24} color="#8461D5" />;
                    },
                }
                }
            />
            <BottomNavigator.Screen name="Article" component={ArticleInsideScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons name="article" size={30} color="#8461D5" />;
                    },
                }
                }
            />
            <BottomNavigator.Screen name="Profile" component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5 name="user" size={30} color="#8461D5" />;
                    },
                }
                }
            />
        </BottomNavigator.Navigator>
    );
}

//Navigator หลักไว้แสดงผล
export default function Navigator() {
    return (
        <NavigationContainer>
            <MainNavigator.Navigator>
                {/* <MainNavigator.Screen name="start" component={MyPageNavigator}
                    options={{
                        headerShown: false
                    }}
                /> */}
                <MainNavigator.Screen name="main" component={MyBottomNavigator}
                    options={{
                        headerShown: false
                    }}
                />
            </MainNavigator.Navigator>
        </NavigationContainer>
    );
}
