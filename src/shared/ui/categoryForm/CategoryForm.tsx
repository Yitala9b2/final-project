import { Box, Button } from '@mui/material';
import React, { FC, useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { CustomTextField } from '../../customFormComponents/CustomTextField';
import { CategoryType } from '../operation/operationsTypes';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import useHttp from 'src/hooks/http.hook';
import { postCategories, changeCategory } from 'src/slices/categoriesSlice';
import './categoryForm.scss'






export const CategoryForm: FC = () => {
    const { request } = useHttp();
    const dispatch = useAppDispatch();
    const slug = useParams();
    const labelRef = useRef(null)
    const navigate = useNavigate();
    const [data, setData] = useState<CategoryType>({
        id: "",
        name: "",
        photo: ''
    })
    const token = localStorage.getItem("myToken")
    //const randomNumber = (val: number): string => Math.floor(Math.random() * (val - 0) + 0).toString();
    const methods = useForm<CategoryType>({
        defaultValues: data
    })

    const { handleSubmit, reset, formState: { errors }, control, setValue } = methods
    const onSubmit: SubmitHandler<CategoryType> = (data) => {
        const newData = ({ id, ...rest }: CategoryType) => {
            return { ...rest }
        }
        if (slug.id) {
            putCategory(slug.id, newData(data)).then((value) => {
                dispatch(changeCategory(value))
                navigate("/operations", { replace: true });
            }).catch((value) => {
                return value
            })
        } else {
            dispatch(postCategories(newData(data))).unwrap().then((value) => {
                navigate("/operations", { replace: true });
            }).catch((value) => {
                return value
            })
        }
    }

    const putCategory = async (id: string, data:Omit<CategoryType,'id'>) => {
        const res = await request(`categories/${id}`, 'PUT', JSON.stringify(data));
        return res;
    }

    const getCategory = async (id: string) => {
        const res = await request(`categories/${id} `);
        return res;
    }

    useEffect(() => {
        reset(data);
    }, [data]);

    useEffect(() => {
        if (slug.id) {
            getCategory(slug.id).then(res => setData({
                id: res.id,
                name: res.name,
                photo: res.photo
            }))
        }
    }, [slug.id])

    const handleChange = (url: string) => {
        setValue('photo', url);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [file] = e.target.files;
        const fileName = e.target.files[0].name
        const body = new FormData();
        // важно использовать название file append('file', ...) иначе работать не будет
        body.append('file', file);
        fetch('https://19429ba06ff2.vps.myjino.ru/api/upload', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            body,
        })
            .then(res => res.json())
            .then(({ url }) => {
                labelRef.current.innerText = fileName
                handleChange(url)
            })
            .catch((err) => {
                console.error(err);
            })
    };


    return (
        <FormProvider {...methods}>
            <Box className='form addOperationForm' component="form" onSubmit={handleSubmit(onSubmit)}>
                <CustomTextField
                    requiredInput
                    className='wAll'
                    readOnly={false}
                    name="name"
                    control={control}
                    label="Название категории"
                    id="input-name"
                />
                <Box className="df ">
                    <label htmlFor="upload-photo" className="categoryForm__link df fc" >
                        <UploadFileIcon sx={{ fontSize: 40 }} /> <span ref={labelRef}>Загрузить фото</span>
                    </label>
                    <input onChange={handleFileChange} type="file" name="photo" id="upload-photo" />
                </Box>

                <Button variant="contained" type="submit"> Отправить</Button>
            </Box>
        </FormProvider>
    );
};


