import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { CategoryType, Category } from "src/shared/ui/operation/operationsTypes";
import { setSnackBar } from "./snackBarSlice";

interface ICategoriesTypes {
    categories: Category[]
}
type MyOmit<T, K extends keyof T> = Omit<T, K>;

type CategoryToPost = MyOmit<CategoryType,'id'>

const token = localStorage.getItem('myToken')

export const postCategories = createAsyncThunk(
    'categories/postCategories',
    async (body: CategoryToPost, { dispatch, rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch(`https://19429ba06ff2.vps.myjino.ru/api/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${token}`,
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
            //dispatch(setToken(data.token));
            dispatch(addCategory(data))
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState: ICategoriesTypes = {
    categories: [
    ]
}


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories = [...state.categories, action.payload]
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter((value) => value.id !== action.payload.id)
        },
        getDefaultCategories: (state, action) => {
            state.categories =  action.payload
        },
        changeCategory: (state, action) => {
            let currentCategory = state.categories.find((value) => value.id === action.payload.id)
            let index = state.categories.indexOf(currentCategory)
            state.categories.splice(index, 1, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postCategories.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

const { actions, reducer } = categoriesSlice;
export const { addCategory, getDefaultCategories, removeCategory, changeCategory } = categoriesSlice.actions
export default reducer;