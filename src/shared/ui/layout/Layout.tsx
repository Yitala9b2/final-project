import React, {useEffect, useLayoutEffect} from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import {  setInitialState } from 'src/slices/mainSlice';
import { useNavigate, useLocation } from "react-router-dom";
import './layout.scss';




const Layout = () => {
    const history = useLocation()
    const navigate = useNavigate();
    const token = localStorage.getItem("myToken")
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        console.log('gh')
            dispatch(setInitialState())
    },[token])
    
    useEffect(() => {
        if (history.pathname !== "/") {
            return 
        }
        navigate("/login"); 
    },[])

    return (
        <div className="layout">
            <Header />
            <Outlet/>
        </div>
    );
};

export default Layout;
