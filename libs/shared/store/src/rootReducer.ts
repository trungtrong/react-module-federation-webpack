import { AnyAction, combineReducers, Reducer } from 'redux';

import { AppStateFeatureKeysEnum } from './feature-keys.enums';
import CounterReducer from './counter/counter.reducer';
import { ICounterState } from './counter/counter.model';
import userReducer from './user/user.reducer';
import { IUserState } from './user/user.model';

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// Infer the `RootState` type from the root reducer

export type RootState = {
    [key: string]: unknown;
    [AppStateFeatureKeysEnum.Counter]: ICounterState;
    [AppStateFeatureKeysEnum.User]: IUserState;
};

export interface AsyncReducers {
    [key: string]: Reducer;
}

const staticReducers = {
    [AppStateFeatureKeysEnum.Counter]: CounterReducer,
    [AppStateFeatureKeysEnum.User]: userReducer
};
const rootReducer =
    (asyncReducers?: AsyncReducers) =>
        (state: RootState, action: AnyAction) => {
            const combinedReducer = combineReducers({
                ...staticReducers,
                ...asyncReducers,
            });
            return combinedReducer(state, action);
        };


export default rootReducer;
