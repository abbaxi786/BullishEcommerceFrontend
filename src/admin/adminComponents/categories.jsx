import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { NotificationContext } from '../../function/notification';

function Category() {

    const { showToast } = useContext(NotificationContext);

    const [category, setCategory] = useState('');

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/category`, { name: category.trim() });
            if (response.data.success) {
                showToast("Category Added", "primary");
            }
        } catch (error) {
            console.log(error);
        }

    }

    const HandleChange = (e) => {
        setCategory(e.target.value);
    }

    return (
        <form className='container d-flex gap-3 flex-column vh-50 justify-content-center' onSubmit={(e) => HandleSubmit(e)}>
            <h1 className='text-warning'>Categories Form</h1>
            <div className='row gap-3'>
                <input value={category} onChange={(e) => HandleChange(e)} className='col-12 rounded border p-2' type='text' name='category' placeholder='Category' />
                <button className='btn btn-warning fw-bolder text-white  p-2 rounded' type='submit'>Enter</button>
            </div>
        </form>
    )
}

export default Category;