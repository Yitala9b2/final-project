import React, { FC } from 'react';
import './operation.scss';
import { Operation } from './operationsTypes';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import useHttp from "src/hooks/http.hook";
import { removeOperation } from 'src/slices/operationsSlice';

interface IPropsFullOperationTypes {
    value: Operation
}

export const FullOperation: FC<IPropsFullOperationTypes> = ({ ...props }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { request } = useHttp()
    const handleRowClick = (id: string) => {
            navigate(`operationId/${id}`)
    };
    const deleteOperation = async (id: string) => {
        const res = await request(`operations/${id}`, "DELETE");
        return res;
    }
    const onDeleteOperation = (id: string) => {
        deleteOperation(id).then((value) => {
            dispatch(removeOperation(value))
        })
    }
    return (
        <div className="operation dfc">
            <div className="operation__body df">
                <div className='operation__actions df'>
                    <IconButton onClick={() => onDeleteOperation(props.value.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div className='df jsb operation__right' onClick={()=>handleRowClick(props.value.id)}>
                    <div className="operation__info dfc">
                        <h3>{props.value.name}</h3>
                        <span>{props.value.category.name}</span>
                        <span>{dayjs(props.value.date).format('DD-MM-YYYY')}</span>
                    </div>
                    <div className="operation__amount">{props.value.amount.toLocaleString("ru-RU", { style: "currency", currency: "RUB" })}</div>
                </div>

            </div>
        </div>
    );
};