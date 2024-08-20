import React, { useContext, useEffect } from 'react';
import { LanguageContext } from 'src/app/context/LanguageContext';
import { ThemeContext } from 'src/app/context/ThemeContext';
import { OperationsList } from 'src/shared/ui/operations/operationsList/OperationsList';
import { resource } from 'src/app/localization/resources';
import { Box, Button } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store/store';
import OperationsTables from 'src/shared/ui/operations/OperationsTables';

const Operations = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <div className={'App-body ' + theme}>
                    <OperationsTables />
            </div>
            <Outlet />
        </>
    );
};

export default Operations;
