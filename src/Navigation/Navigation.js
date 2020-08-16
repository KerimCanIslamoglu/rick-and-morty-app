import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import List from '../Screens/ListManagement/List'
import AddCharacter from '../Screens/ListManagement/AddCharacter'
import Login from '../Screens/Authorization/Login'
import Signup from '../Screens/Authorization/Signup'
import { LOCAL_AUTH_ID, USER } from '../Actions/types';
import AsyncStorage from '@react-native-community/async-storage';

import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();

const Navigation = (props) => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name="Login"
                    component={Login}
                    options={({ navigation, route }) => ({
                        // headerRight: () => (
                        //     <TouchableOpacity onPress={() => navigation.navigate('CreateItem')}
                        //         title="Info"
                        //         color="#fff">
                        //         <Image style={{ width: 25, height: 25, marginRight: 28 }} source={require('../../assets/plus.png')} />
                        //     </TouchableOpacity>


                        // ),
                        title: 'Login',
                        headerStyle: {
                            backgroundColor: '#202329',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })} />
                <Stack.Screen name="Signup"
                    component={Signup}
                    options={({ navigation, route }) => ({
                        // headerRight: () => (
                        //     <TouchableOpacity onPress={() => navigation.navigate('CreateItem')}
                        //         title="Info"
                        //         color="#fff">
                        //         <Image style={{ width: 25, height: 25, marginRight: 28 }} source={require('../../assets/plus.png')} />
                        //     </TouchableOpacity>


                        // ),
                        title: 'Signup',
                        headerStyle: {
                            backgroundColor: '#202329',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })} />
                <Stack.Screen name="List"
                    component={List}
                    options={({ navigation, route }) => ({
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => {
                                AsyncStorage.removeItem(LOCAL_AUTH_ID)
                                USER.token = null
                                navigation.replace('Login')
                            }}
                                title="Info"
                                color="#fff">
                                <Image style={{ width: 25, height: 25, marginLeft: 10 }} source={require('../img/exit.png')} />
                            </TouchableOpacity>


                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddCharacter')}
                                style={{
                                    marginRight: 10
                                }}
                            >
                                <Text style={{ fontSize: 30,color:'white' }}>+</Text>
                            </TouchableOpacity>
                        ),
                        title: '',
                        headerStyle: {
                            backgroundColor: '#202329',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })} />
                      <Stack.Screen name="AddCharacter"
                    component={AddCharacter}
                    options={({ navigation, route }) => ({
                        title: 'AddCharacter',
                        headerStyle: {
                            backgroundColor: '#202329',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const mapStateToProps = ({ authorizationResponse }) => {
    const { loginLoader, user } = authorizationResponse;
    return { loginLoader, user };
};

export default connect(mapStateToProps, {})(Navigation);
