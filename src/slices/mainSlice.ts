import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setSnackBar } from "./snackBarSlice";
import { UserTypes } from "src/types/UserTypes";
interface IInput {
    email: string,
    password: string | null,
};

export const fetchUser = createAsyncThunk(
    'main/fetchUser',
    async (body: IInput, { dispatch, rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch(`https://19429ba06ff2.vps.myjino.ru/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            })
            if (!response.ok) {
                const errors = await response.json();
                dispatch(setSnackBar({
                    open: true,
                    text: errors.errors[0].message,
                    severity: 'error'
                }));
                throw new Error(`${errors.errors[0].message}`);
            }
            const data = await response.json();
            dispatch(setToken(data.token));
            dispatch(setUser({...data.profile}))
            dispatch(setSnackBar({
                open: true,
                text: "Пользователь зарегистрирован",
                severity: 'success'
            }));
            return fulfillWithValue(data)

        } catch (error) {
            return rejectWithValue(error)
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
        }
    }
)

export const setInitialState = createAsyncThunk(
    'main/setInitialState',
    async (_, { dispatch, rejectWithValue, fulfillWithValue }) => {
        const token = localStorage.getItem("myToken")
        try {
            if (!token) {
                dispatch(setSnackBar({
                    open: true,
                    text: "Пожалуйста, авторизуйтесь",
                    severity: 'info'
                }));
                dispatch(setUser(null))
                throw new Error(`незарегистрированный пользователь`);
            }
            dispatch(setToken(token))
            const response = await fetch(`https://19429ba06ff2.vps.myjino.ru/api/profile`,{
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!response.ok) {
                const errors = await response.json();
                dispatch(setSnackBar({
                    open: true,
                    text: errors.errors[0].message,
                    severity: 'error'
                }));
                throw new Error(`${errors.errors[0].message}`);
            }
            const data = await response.json();
            dispatch(setUser(data))
            dispatch(setInitial(true))
            return fulfillWithValue(data)
        } catch (error) {
            dispatch(setInitial(true))
            return rejectWithValue(error)
        }
    })


export interface mainTypes {
    token: string
    isInitial: boolean
    user: UserTypes | null
}

const initialState: mainTypes = {
    token: "",
    isInitial: false,
    user: null,
}


export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setInitial: (state, action) => {
            state.isInitial = action.payload
        },
    },
        extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            localStorage.setItem("myToken", action.payload.token)
          })
    }
})

const { actions, reducer } = mainSlice;
export const { setToken, setUser, setInitial } = mainSlice.actions
export default reducer;
