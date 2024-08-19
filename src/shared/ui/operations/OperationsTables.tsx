import React, { FC, ReactNode, memo, useState, useEffect, useCallback, useRef } from 'react';
import { OperationsList } from './operationsList/OperationsList';
import CategoriesList from './categoriesList/CategoriesList';
import { useSelector } from 'react-redux';
import { IRootState } from 'src/store/store';
import ProductsList from './productsList/ProductsList';
import { Box } from '@mui/material';
import "./operations.scss"
const OperationsTables = () => {
    return (
        <Box className="operationsTables">
            <OperationsList />
            <CategoriesList />
        </Box>
    );
};

export default OperationsTables;
