import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";

function Product() {
  const [categories, setCategories] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loadingCategory, setLoadingCategory] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      setCategories(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoadingCategory(categoryId);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${categoryId}`
      );

      setProductsMap((prev) => ({
        ...prev,
        [categoryId]: res.data.data || [],
      }));

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCategory(null);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const renderTable = (products) => (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.map((prod) => (
          <tr key={prod._id}>
            <td className="text-truncate">{prod._id}</td>
            <td>{prod.name}</td>
            <td>${prod.price}</td>
            <td>{prod.stock}</td>
            <td>
              <img
                src={
                  Array.isArray(prod.image)
                    ? prod.image[0]
                    : prod.image
                }
                alt={prod.name}
                width={40}
                height={40}
              />
            </td>
            <td>
              <button
                className="btn btn-secondary"
                onClick={() => handleEdit(prod._id)}
              >
                Edit <FcEditImage />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="accordion" id="accordionExample">
      {categories.map((cat) => {
        const products = productsMap[cat._id] || [];

        return (
          <div className="accordion-item" key={cat._id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button bg-warning text-white fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${cat._id}`}
                onClick={() => {
                  if (!productsMap[cat._id]) {
                    fetchProductsByCategory(cat._id);
                  }
                }}
              >
                {cat.name}
              </button>
            </h2>

            <div
              id={`collapse-${cat._id}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">

                {loadingCategory === cat._id ? (
                  <p>Loading products...</p>
                ) : products.length === 0 ? (
                  <p className="text-muted">No products found</p>
                ) : (
                  renderTable(products)
                )}

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;