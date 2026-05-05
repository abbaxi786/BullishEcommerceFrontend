import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { NotificationContext } from '../../function/notification'
import { useContext } from 'react'


function EditProduct() {

  const { showToast } = useContext(NotificationContext);

  const navigate= useNavigate();

  const { id } = useParams();

  const [category, setCategory] = useState([]);

  const [form, setForm] = React.useState({
    name: "",
    image: "",
    description: "",
    category: "",
    stock: "",
    price: ""
  });

  function BackToAdminPanel(){
    navigate('/adminpanel');
  }

  React.useEffect(() => {
    async function GetCategories() {
      try {
        const response = await axios.get('${import.meta.env.VITE_API_URL}/category');
        setCategory(response.data.data || []);
      } catch (error) {
        console.log(error);
      }
    }

    GetCategories();
  }, []);

  React.useEffect(() => {
    async function GetProduct() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/productname/${id}`);

        const product = res.data.data;

        setForm({
          name: product?.name || "",
          image: Array.isArray(product?.image)
            ? product.image[0]
            : product?.image || "",
          description: product?.description || "",
          category: Array.isArray(product?.category)
            ? product.category[0]
            : product?.category || "",
          stock: product?.stock ?? 0,
          price: product?.price ?? 0
        });

      } catch (error) {
        console.log(error);
      }
    }

    GetProduct();
  }, [id]);

  function HandleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value || ""
    }));
  }

  async function HandleSubmit(e) {
    e.preventDefault();

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/${id}`, form);
      showToast("Product Updated Successfully!",'success')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-4">
      <div className='mb-4 d-flex justify-content-between'>
      <h1 className='fw-bolder text-warning'>Edit Product</h1>
      <button onClick={()=> BackToAdminPanel()} className='btn btn-warning text-white fw-bolder'>Back To Panel</button>
      </div>

      <div className="row">

        <div className="col-md-7">

          <form onSubmit={HandleSubmit} className='d-flex flex-column gap-3'>

            <input
              value={form.name}
              onChange={HandleChange}
              type='text'
              name='name'
              placeholder='Product Name'
              className='form-control'
            />

            <textarea
              value={form.description}
              onChange={HandleChange}
              name='description'
              placeholder='Description'
              className='form-control'
            />

            <input
              value={form.price}
              onChange={HandleChange}
              type='number'
              name='price'
              placeholder='Price'
              className='form-control'
            />

            <input
              value={form.stock}
              onChange={HandleChange}
              type='number'
              name='stock'
              placeholder='Stock'
              className='form-control'
            />

            <select
              value={form.category}
              onChange={HandleChange}
              name='category'
              className='form-select'
            >
              <option value="">Select Category</option>
              {category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              value={form.image}
              onChange={HandleChange}
              type='text'
              name='image'
              placeholder='Image URL'
              className='form-control'
            />

            <button className='btn btn-warning fw-bolder text-white'>
              Update Product
            </button>

          </form>

        </div>

        <div className="col-md-5">

          <div className="card shadow-sm p-3">

            <h5 className="text-center text-warning">Live Preview</h5>

            <img
              src={form.image || "https://via.placeholder.com/300"}
              alt="product"
              className="img-fluid rounded"
              style={{ height: "250px", objectFit: "cover" }}
            />

            <div className="mt-3">
              <p><strong>Name:</strong> {form.name}</p>
              <p><strong>Price:</strong> ${form.price}</p>
              <p><strong>Stock:</strong> {form.stock}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default EditProduct;