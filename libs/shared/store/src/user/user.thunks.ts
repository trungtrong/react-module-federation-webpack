import { AnyAction } from '@reduxjs/toolkit';
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from './user.actions';


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
