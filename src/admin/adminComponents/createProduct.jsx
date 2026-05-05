import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function CreateProduct() {

  const [category,setCategory]=useState([]);

  React.useEffect(()=>{

    async function GetCategories(){
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`)
        
        setCategory(response.data.data);

      }catch(error){
        console.log(error);
      }
    }

    GetCategories();

  },[])

  const [form,setForm]= React.useState({
    name:""
    ,image:[]
    ,description:""
    ,category:""
    ,stock:""
    ,price:""
  });

  async function HandleSubmit(e){
    e.preventDefault();

    try{
      const response= await axios.post(`${import.meta.env.VITE_API_URL}/product`,form);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }

  }

  function HandleChange(e) {
  const { name, value } = e.target;

  if (name === "image") {
    setForm((prev) => ({
      ...prev,
      image: [value]  
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }
}


  return (
    <form onSubmit={(e)=>HandleSubmit(e)} className='container d-flex flex-column gap-3'>
      <h1 className='fw-bolder text-warning'>Product Form</h1>
      <input value={form.name} onChange={(e)=>HandleChange(e)} type='text' name='name' placeholder='name' className='border p-2 rounded'/>
      <textarea value={form.description} onChange={(e)=>HandleChange(e)} type='text' name='description' placeholder='Description' className='border p-2 rounded'/>
      <input value={form.price} onChange={(e)=>HandleChange(e)} type='number' name='price' placeholder='price' className='border p-2 rounded'/>
      <input value={form.stock} onChange={(e)=>HandleChange(e)} type='number' name='stock' placeholder='stock' className='border p-2 rounded'/>
      <select value={form.category} onChange={(e)=>HandleChange(e)} name='category' className='border p-2 rounded'>
        {category.map((item)=>{
          return(<option key={item._id} value={item._id}>{item.name}</option>)
        })}
      </select>
      <input value={form.image} onChange={(e)=>HandleChange(e)} type='text' name='image' placeholder='Image Link' className='border p-2 rounded'/> 
      <button className='btn btn-warning fw-bolder text-white  p-2 rounded' type='submit'>Submit</button>     
    </form>
  )
}

export default CreateProduct