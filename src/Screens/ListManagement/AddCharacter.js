import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { addCharacter } from '../../Actions'
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button } from '../../Components'
import { LOCAL_AUTH_ID, USER } from '../../Actions/types';
import * as RootNavigation from '../../Navigation/RootNavigation.js';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


const { width, height } = Dimensions.get('window')



const AddCharacter = (props) => {
    useEffect(() => {
        getPermissionAsync();
    }, []);

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
               setImage(result.uri);
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    const [name, setName] = useState('Kerim1')
    const [status, setStatus] = useState('Alive')
    const [species, setSpecies] = useState('Human')
    const [gender, setGender] = useState('male')

    const [image, setImage] = useState(null)



    return (
        <View style={styles.container}>
            <View style={{ margin: 20 }}>

                <TouchableOpacity
                    onPress={() => {
                        _pickImage()
                    }}

                >
                    <Image
                        source={image}
                        defaultSource={require('../../img/dummy.png')}
                        style={{ width: 100, height: 100, borderRadius: 50 }}

                    />

                </TouchableOpacity>

            </View>
            <Input style={styles.input}
                value={name}
                onChangeText={(value) => setName(value)}
                placeholder={'Name'}
            />
            <Input style={styles.input}
                value={status}
                onChangeText={(value) => setStatus(value)}
                placeholder={'Status'}
            />
            <Input style={styles.input}
                value={species}
                onChangeText={(value) => setSpecies(value)}
                placeholder={'Species'} />
            <Input style={styles.input}
                value={gender}
                onChangeText={(value) => setGender(value)}
                placeholder={'Gender'} />


            <Button style={styles.button} text={'Add Character'} onPress={() => {
                const params = {
                    name,
                    status,
                    species,
                    gender,
                    image
                }
                props.addCharacter(params);
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

const mapStateToProps = ({ listResponse }) => {
    const { listLoader, characterList } = listResponse;
    return { listLoader, characterList };
};

export default connect(mapStateToProps, { addCharacter })(AddCharacter);

