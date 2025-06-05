import { PayloadAction } from '@reduxjs/toolkit';
import { FetchUserActions } from './user.actions';

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case FetchUserActions.FetchUserRequest:
            return {
                ...state,
                loading: true,
                error: null, // Clear previous errors
            }
        case FetchUserActions.FetchUserSuccess:
            return {
                ...state,
                loading: false,
                users: action.payload,
            }
        case FetchUserActions.FetchUserFailure:
            return {
                ...state,
                loading: false,
                error: action.payload,
                users: [], // Clear users on error if desired
            };
        default:
            return state;
    }
}

export default userReducer;
