import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import baseApi from "./baseApi";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'auth',
    storage,
}

const persistAuthReducer = persistReducer(persistConfig, authReducer)


export const store = configureStore({
    reducer: {
        auth: persistAuthReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: ({
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        })
    }).concat(baseApi.middleware)
})

export const persistor = persistStore(store)



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
