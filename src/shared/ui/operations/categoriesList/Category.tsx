import React, { FC } from 'react';
import dayjs from 'dayjs';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../operation/operationsTypes';
import { useDispatch } from 'react-redux';
import { removeCategory } from 'src/slices/categoriesSlice';
import useHttp from "src/hooks/http.hook";
import { setSnackBar } from 'src/slices/snackBarSlice';

interface IPropsCategoryTypes {
    value: Category
}


export const CategoryComponent: FC<IPropsCategoryTypes> = ({ ...props }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { request } = useHttp()
    const handleRowClick = (id: string) => {
        navigate(`categoryId/${id}`)
    };
    const deleteCategory = async (id: string) => {
        const res = await request(`categories/${id}`, "DELETE");
        return res;
    }
    const onDeleteCategory = (id: string) => {
        deleteCategory(id).then((value) => {
            dispatch(removeCategory(value))
            dispatch(setSnackBar({
                open: true,
                text: 'Категория удалена',
                severity: 'success'
            }));
        })
    }
    return (
        <div className="tableItem dfc">
            <div className="tableItem__body df">
                <div className='tableItem__actions df'>
                    <IconButton onClick={() => onDeleteCategory(props.value.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div className='df jsb tableItem__right' onClick={() => handleRowClick(props.value.id)}>
                    <div className="tableItem__info dfc">
                        <h3>{props.value.name}</h3>
                        <span>Дата создания: {dayjs(props.value.createdAt).format('DD-MM-YYYY HH:mm')}</span>
                        <span>Дата изменения: {dayjs(props.value.updatedAt).format('DD-MM-YYYY HH:mm')}</span>
                    </div>
                    {props.value.photo && <div className="tableItem__photo">
                        <img src={props.value.photo} />
                    </div>}
                </div>

            </div>
        </div>
    );
};