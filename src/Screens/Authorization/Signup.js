import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { signup } from '../../Actions'
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button } from '../../Components'
import { LOCAL_AUTH_ID, USER } from '../../Actions/types';
import * as RootNavigation from '../../Navigation/RootNavigation.js';

const { width, height } = Dimensions.get('window')

const Signup = (props) => {

    const [email, setEmail] = useState('kerim@kerim.com')
    const [password, setPassword] = useState('123456')
    const [firstName, setFirstName] = useState('Kerim')
    const [lastName, setLastName] = useState('Can')

    return (
        <View style={styles.container}>
            <Input style={styles.input}
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
                placeholder={'First name'}
                 />
            <Input style={styles.input}
                value={lastName}
                onChangeText={(value) => setLastName(value)}
                placeholder={'Last name'}
            />
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
            <Button style={styles.button} text={'Signup'} onPress={() => {
                const params = {
                    firstName,
                    lastName,
                    email: email.toLowerCase(),
                    password
                }
                props.signup(params);
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

export default connect(mapStateToProps, { signup })(Signup);

