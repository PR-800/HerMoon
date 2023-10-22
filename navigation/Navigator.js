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

import ArticleScreen from "../screens/ArticleScreen";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";

import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

import NotificationScreen from "../screens/NotificationScreen";
import ContactScreen from "../screens/ContactScreen";
import PrivacyScreen from "../screens/PrivacyScreen";

import HistoryScreen from "../screens/HistoryScreen";

const PageNavigator = createNativeStackNavigator();
const MainNavigator = createNativeStackNavigator();

const BottomNavigator = createBottomTabNavigator();

// หน้าต่าง ๆ ที่มีการเชื่อมกัน
function MyPageNavigator() {
    return (
        <PageNavigator.Navigator>
            {/* <PageNavigator.Screen name="login" component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <PageNavigator.Screen name="register" component={RegisterScreen}
                options={{
                    headerShown: false
                }}
            />
            <PageNavigator.Screen name="tutorial" component={TutorialScreen}
                options={{
                    headerShown: false
                }}
            />
            <PageNavigator.Screen name="homePage" component={MyBottomNavigator} 
                options={{
                    headerShown: false
                }}
            />
            <PageNavigator.Screen name="editProfile" component={EditProfileScreen} 
                options={{
                    headerShown: false
                }}
            />
            <PageNavigator.Screen name="notification" component={NotificationScreen} 
                options={{
                    headerShown: false
                }}
            /> */}
            <PageNavigator.Screen name="History" component={HistoryScreen} 
                options={{
                    headerShown: false
                }}
            />
            <PageNavigator.Screen name="contact" component={ContactScreen} 
                options={{
                    headerShown: false
                }}
            />
            <PageNavigator.Screen name="privacy" component={PrivacyScreen} 
                options={{
                    headerShown: false
                }}
            />
            <PageNavigator.Screen name="articleDetail" component={ArticleDetailScreen} 
                options={{
                    headerShown: false
                }}
            />

        </PageNavigator.Navigator>
    );
}

// Tab ตัวเลือกหน้า Home
function MyBottomNavigator() {
    return (
        <BottomNavigator.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#eeebf5',
                // tabBarInactiveBackgroundColor: '',
                tabBarStyle: { height: 52 },
            }}
        >
            <BottomNavigator.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="home" size={31} color={"#8461D5"} />;
                    },
                    }
                }
            />
            <BottomNavigator.Screen name="Calendar" component={CalendarScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Fontisto name="calendar" size={26} color="#8461D5" />;
                    },
                }
                }
            />
            <BottomNavigator.Screen name="Article" component={ArticleScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons name="article" size={33} color="#8461D5" />;
                    },
                }
                }
            />
            <BottomNavigator.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5 name="user" size={28} color="#8461D5" />;
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
                <MainNavigator.Screen name="start" component={MyPageNavigator}  //MyPageNavigator  ProfileScreen
                    options={{
                        headerShown: false
                    }}
                />
                <MainNavigator.Screen name="main" component={MyBottomNavigator}
                    options={{
                        headerShown: false
                    }}
                />
            </MainNavigator.Navigator>
        </NavigationContainer>
    );
}
