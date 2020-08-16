import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { login } from '../../Actions'
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button } from '../../Components'
import { LOCAL_AUTH_ID, USER } from '../../Actions/types';
import * as RootNavigation from '../../Navigation/RootNavigation'

const { width, height } = Dimensions.get('window')

const Login = (props) => {

    const [email, setEmail] = useState('Test51@test.com')
    const [password, setPassword] = useState('123456')

    useEffect(() => {

        AsyncStorage.getItem(LOCAL_AUTH_ID).then((token) => {
            if (token) {
                console.log('Gelen Token Data', token);
                USER.token = token
                RootNavigation.replace('List')
            } 
        })
    }, [])

    return (
        <View style={styles.container}>
            <Input style={styles.input}
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholder={'E-mail'}
                keyboardType={'email-address'} />
            <Input style={styles.input}
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholder={'Password'}
                secureTextEntry />
            <Button style={styles.button} text={'Login'} onPress={() => {
                const params = {
                    email: email.toLowerCase(),
                    password
                }

                props.login(params);
            }} />
            <Button style={styles.button} text={'Sign up'} onPress={()=>{
                props.navigation.navigate('Signup')
            }} />
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202329',
        alignItems: 'center',
    },
    input: {
        marginTop: height * 0.02
    },
    button: {
        marginTop: height * 0.02

    }
});

const mapStateToProps = ({ authorizationResponse }) => {
    const { loader, user } = authorizationResponse;
    return { loader, user };
};

export default connect(mapStateToProps, { login })(Login);

