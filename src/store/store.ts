import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "src/slices/mainSlice";
import operationsSlice from "src/slices/operationsSlice";
import snackBarSlice from "src/slices/snackBarSlice";
import categoriesSlice from "src/slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        main: mainSlice,
        operations: operationsSlice,
        categories: categoriesSlice,
        snackBar: snackBarSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',  // включаем только при разработке
    //devTools: true, // всегда включен
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch