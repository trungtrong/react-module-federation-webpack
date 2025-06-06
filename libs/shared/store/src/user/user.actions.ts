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
