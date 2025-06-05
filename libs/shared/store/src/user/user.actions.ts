import { AnyAction } from '@reduxjs/toolkit';

export enum FetchUserActions {
    FetchUserRequest = 'FETCH_USERS_REQUEST',
    FetchUserSuccess = 'FETCH_USERS_SUCCESS',
    FetchUserFailure = 'FETCH_USERS_FAILURE',
}

// Action Creators (these return plain action objects)
export const fetchUsersRequest = () => ({
    type: FetchUserActions.FetchUserRequest,
});

export const fetchUsersSuccess = (users: any) => ({
    type: FetchUserActions.FetchUserSuccess,
    payload: users,
});

export const fetchUsersFailure = (error: any) => ({
    type: FetchUserActions.FetchUserFailure,
    payload: error,
});

// Thunk Action Creator
// This is the core of redux-thunk
export const fetchUsers = (): AnyAction => {
    // This function is the "thunk" function
    // @ts-ignore
    return async (dispatch, getState) => {
        dispatch(fetchUsersRequest());
        //
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            //
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dispatch(fetchUsersSuccess(data)); // Dispatch success action with data
        } catch (error) {
            // @ts-ignore
            dispatch(fetchUsersFailure(error.message)); // Dispatch failure action with error
        }
    }
}
