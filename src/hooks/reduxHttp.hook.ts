import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackBar } from 'src/slices/snackBarSlice';
//import'../components/vacancyForm/userData.json'
// перенесли повторяющиеся в отдельный хук, чтобы потом его переиспользовать в разных местах (loading, error, связь с сервером, очистка ошибки если персонажа нет)

export default function useReduxHttp() {
    const token = localStorage.getItem('myToken')
    const dispatch = useDispatch();
    const checkToken = (contentType: string) => {
        if (token) {
            return {
                "Content-type": contentType,
                Authorization: `Bearer ${token}`,
            }
        } else {
            return {
                "Content-type": contentType,
            }
        }
    }
    const request =
        async (
            url: string,
            method = 'GET',
            body: any = null,
            contentType = 'application/json',
             rejectWithValue:any, fulfillWithValue:any
        ) => {
            try {
                const response = await fetch(`https://19429ba06ff2.vps.myjino.ru/api/${url}`, {
                    method,
                    body,
                    headers: checkToken(contentType),
                });
                if (!response.ok) {
                    const errors = await response.json();
                    dispatch(setSnackBar({
                        open: true,
                        text: errors.errors[0].message,
                        severity: 'error'
                    }));
                    console.log(response)
                    return rejectWithValue(`${errors.errors[0].message}`)
                }
                const data = await response.json();
                return fulfillWithValue(data)

            } catch (e) {
                throw rejectWithValue(e.message)
            }
        };



    return { request };
}
