import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';

import app from './app/reducer';

const PERSISTED_KEYS: string[] = ['app'];

const store = configureStore({
    reducer: {
        app,
    },
    middleware: [
        ...getDefaultMiddleware({ serializableCheck: false, thunk: false }),
        save({ states: PERSISTED_KEYS }),
        // createLogger()
    ],
    preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
