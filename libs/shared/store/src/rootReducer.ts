import { AnyAction, combineReducers, Reducer } from 'redux';

import { AppStateFeatureKeysEnum } from './feature-keys.enums';
import CounterReducer from './counter/counter.reducer';
import { ICounterState } from './counter/counter.model';

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// Infer the `RootState` type from the root reducer

export type RootState = {
  [AppStateFeatureKeysEnum.Counter]: ICounterState;
  [key: string]: unknown;
};

export interface AsyncReducers {
    [key: string]: Reducer;
}

const staticReducers = {
    [AppStateFeatureKeysEnum.Counter]: CounterReducer,
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
