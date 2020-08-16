import {
    GET_CHARACTERS_START,
    GET_CHARACTERS_SUCCESS,
    GET_CHARACTERS_FAILED,
    ADD_CHARACTERS_START,
    ADD_CHARACTERS_SUCCESS,
    ADD_CHARACTERS_FAILED,
    DELETE_CHARACTERS_START,
    DELETE_CHARACTERS_SUCCESS,
    DELETE_CHARACTERS_FAILED
} from '../Actions/types'

const INITIAL_STATE = {
    listLoader: false,
    characterList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CHARACTERS_START:
            return {
                ...state,
                listLoader: true
            }
        case GET_CHARACTERS_SUCCESS:
            return {
                ...state,
                characterList: action.payload.characters
            }
        case GET_CHARACTERS_FAILED:
            return {
                ...state,
                listLoader: false,
            }
        case ADD_CHARACTERS_START:
            return {
                ...state,
                listLoader: true,
            };

        case ADD_CHARACTERS_SUCCESS:
            const newItem = action.payload.newCharacter
            return {
                ...state,
                listLoader: false,
                characterList: [...state.characterList, newItem]
            };

        case ADD_CHARACTERS_FAILED:
            return {
                ...state,
                listLoader: false,
            };

        case DELETE_CHARACTERS_START:
            return {
                ...state,
                listLoader: true,
            };

        case DELETE_CHARACTERS_SUCCESS:
            const id = action.payload
            const newData = state.characterList.filter((dt) => dt._id != id)
            return {
                ...state,
                listLoader: false,
                characterList:newData
            };

        case DELETE_CHARACTERS_FAILED:
            return {
                ...state,
                listLoader: false,
            };
        default:
            return state;
    }
}