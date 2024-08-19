import React, {useContext} from "react";
import { Box, Button } from "@mui/material";
import OperationsListHeader from "../OperationsListHeader";
import { Link } from 'react-router-dom';
import { LanguageContext } from 'src/app/context/LanguageContext';
import { resource } from 'src/app/localization/resources';


const ProductsList = () => {
    const { language } = useContext(LanguageContext)
    return (
        <Box className="operationsTable products themeBg">
            <OperationsListHeader label={resource[language].components.operation.productTitle}>
                <Button component={Link} to="add" variant='contained'>
                    {resource[language].components.operation.addProduct}
                </Button>
            </OperationsListHeader>
        </Box>
    );
};

export default ProductsList;
