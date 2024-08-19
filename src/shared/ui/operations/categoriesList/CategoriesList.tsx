import React, {useContext, ReactNode, useEffect} from "react";
import { Box, Button } from "@mui/material";
import OperationsListHeader from "../OperationsListHeader";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LanguageContext } from 'src/app/context/LanguageContext';
import { resource } from 'src/app/localization/resources';
import { IRootState } from 'src/store/store';
import { CategoryComponent } from "./Category";
import { getDefaultCategories } from "src/slices/categoriesSlice";
import useHttp from "src/hooks/http.hook";

const CategoriesList = () => {
    const {request} = useHttp()
    const dispatch = useDispatch()
    const { language } = useContext(LanguageContext)
    const token = useSelector((state: IRootState)=>state.main.token)
    const items = useSelector((state: IRootState) => state.categories.categories)

    const getCategories = async () => {
        const res = await request(`categories`);
        return res;
    }


    const renderItems = () => {
        return (
            items.map((value, index): ReactNode => {
                return <CategoryComponent key={index} value={value} />;
            })
        )
    }
    useEffect(() => {
            getCategories().then((value) => {
            dispatch(getDefaultCategories(value.data))
        })
        
    },[token])
    return (
        <Box className="operationsTable categories themeBg">
            <OperationsListHeader label={resource[language].components.operation.categoryTitle}>
                <Button component={Link} to="addCategory" variant='contained'>
                    {resource[language].components.operation.addCategory}
                </Button>
            </OperationsListHeader>
            <div className='operations__list'>
                {renderItems()}
            </div>
        </Box>
    );
};

export default CategoriesList;
