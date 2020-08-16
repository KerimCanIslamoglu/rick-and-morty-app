import {
    BASE_URL,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED
} from './types'
import { post } from '../Api/api'

export const login = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != '') {
            if (validateEmail(params.email)) {
                post(
                    BASE_URL.concat('/login'),
                    params,
                    dispatch,
                    LOGIN_START,
                    LOGIN_SUCCESS,
                    LOGIN_FAILED
                )
            } else {
                Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!')
            }
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }
    }
}


export const signup = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != ''&&params.firstName!=''&&params.lastName!='') {
            if (validateEmail(params.email)) {
                post(
                    BASE_URL.concat('/register'),
                    params,
                    dispatch,
                    SIGNUP_START,
                    SIGNUP_SUCCESS,
                    SIGNUP_FAILED
                )
            } else {
                Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!')
            }
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

