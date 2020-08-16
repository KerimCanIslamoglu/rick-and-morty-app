import axios from 'axios'
import { Alert } from 'react-native'

import { USER, LOCAL_AUTH_ID } from '../Actions/types'
import AsyncStorage from '@react-native-community/async-storage'
import * as RootNavigation from '../Navigation/RootNavigation';



export const get = (url, params, dispatch, start, success, failed) => {
    const method = url.split('/').pop();
    dispatch({ type: start })
    axios({
        method: 'get',
        url,
        headers: {
            authorization: 'Bearer '.concat(USER.token)
        }
    }).then((response) => {
        dispatch({ type: success, payload: response.data })
        // console.log('CharacterList',response.data)
    }).catch((err) => {
        Alert.alert('UYARI', 'İstek sırasında bir sorun oluştu!')
        dispatch({ type: failed })
    })
}

export const post = (url, params, dispatch, start, success, failed) => {

    const method = url.split('/').pop();
    console.log(method)
    console.log(params)

    dispatch({ type: start })
    axios({
        method: 'post',
        url,
        data: params,
        headers: {
            authorization: 'Bearer '.concat(USER.token)
        }
    }).then((response) => {
        dispatch({ type: success, payload: method == 'removeCharacter' ? params.id : response.data })
        console.log('response', response.data)

        if (method == 'login' || method == 'register') {
            RootNavigation.replace('List')
            USER.token = response.data.token
            AsyncStorage.setItem(LOCAL_AUTH_ID, response.data.token)
            console.log('UserToke', USER.token)
        } else if (method == 'addCharacter') {
            RootNavigation.pop()
        }

    }).catch((err) => {
        console.log('Error', err)
        Alert.alert('UYARI', err.response.data.message)
        dispatch({ type: failed })
    })
}
