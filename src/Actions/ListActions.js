import {
    BASE_URL,
    GET_CHARACTERS_START,
    GET_CHARACTERS_SUCCESS,
    GET_CHARACTERS_FAILED,
    ADD_CHARACTERS_START,
    ADD_CHARACTERS_SUCCESS,
    ADD_CHARACTERS_FAILED,
    DELETE_CHARACTERS_START,
    DELETE_CHARACTERS_SUCCESS,
    DELETE_CHARACTERS_FAILED
} from './types'
import { get, post } from '../Api/api'

export const getCharacters = () => {
    return (dispatch) => {
        get(
            BASE_URL.concat('/api/characters'),
            null,
            dispatch,
            GET_CHARACTERS_START,
            GET_CHARACTERS_SUCCESS,
            GET_CHARACTERS_FAILED
        )
    }
}


export const addCharacter = (params) => {
    return (dispatch) => {

        if (params.name != '' && params.status != '' && params.species != '' && params.gender != '') {
            post(
                BASE_URL.concat('/api/addCharacter'),
                params,
                dispatch,
                ADD_CHARACTERS_START,
                ADD_CHARACTERS_SUCCESS,
                ADD_CHARACTERS_FAILED
            )
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }
    }
}

export const deleteCharacter = (params) => {
    return (dispatch) => {

        post(
            BASE_URL.concat('/api/removeCharacter'),
            params,
            dispatch,
            DELETE_CHARACTERS_START,
            DELETE_CHARACTERS_SUCCESS,
            DELETE_CHARACTERS_FAILED
        )
    }
}


