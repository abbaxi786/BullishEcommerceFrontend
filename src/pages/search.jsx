import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/card';
import {
  FaSearch,
  FaFilter,
  FaTags,
  FaMoneyBillWave
} from "react-icons/fa";

function Search() {

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
    category: []
  });

  /* ================= FILTER CHANGE ================= */

  function handleFilterChange(e) {

    const { name, value } = e.target;

    setFilter((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  /* ================= CATEGORY CHANGE ================= */

  function handleCategoryChange(catId) {

    if (filter.category.includes(catId)) {

      setFilter({
        ...filter,
        category: filter.category.filter((c) => c !== catId)
      });

    } else {

      setFilter({
        ...filter,
        category: [...filter.category, catId]
      });

    }
  }

  /* ================= SEARCH CHANGE ================= */

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  useEffect(() => {

    async function getCategories() {

      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/category`
        );

        setCategories(res.data.data);

      } catch (err) {

        console.log(err);

      }
    }

    getCategories();

  }, []);


  const fetchProducts = async () => {

    try {

      setLoading(true);

      const query =
        search.trim() === ""
          ? "all"
          : search;

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/search/${query}`,
        {
          params: {
            category: filter.category,
            priceMin: filter.minPrice,
            priceMax: filter.maxPrice
          }
        }
      );

      if (response.data.success) {
        setData(response.data.data);
      } else {
        setData([]);
      }

    } catch (error) {

      console.log(error);
      setData([]);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    const delay = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(delay);

  }, [search, filter]);

  return (

    <div className="container-fluid py-4 bg-light min-vh-100">


      <div className="bg-white p-3 rounded-4 shadow-sm mb-4">

        <div className="input-group">

          <span className="input-group-text bg-warning border-warning text-dark">
            <FaSearch />
          </span>

          <input
            className="form-control form-control-lg border-warning"
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />

        </div>

      </div>


      <div className="row g-4">


        <div className="col-lg-3">

          <div
            className="bg-white p-4 rounded-4 shadow-sm position-sticky"
            style={{ top: "20px" }}
          >

            <div className="d-flex align-items-center gap-2 mb-4">

              <FaFilter className="text-warning" />
              <h4 className="fw-bold mb-0">Filters</h4>

            </div>


            <div className="mb-4">

              <div className="d-flex align-items-center gap-2 mb-3">

                <FaTags className="text-warning" />
                <h6 className="fw-bold mb-0">Categories</h6>

              </div>

              {categories.map((cat) => (

                <div key={cat._id} className="form-check mb-2">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={filter.category.includes(cat._id)}
                    onChange={() =>
                      handleCategoryChange(cat._id)
                    }
                  />

                  <label className="form-check-label">
                    {cat.name}
                  </label>

                </div>

              ))}

            </div>

            {/* Price */}

            <div>

              <div className="d-flex align-items-center gap-2 mb-3">

                <FaMoneyBillWave className="text-warning" />
                <h6 className="fw-bold mb-0">Price Range</h6>

              </div>

              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                className="form-control mb-3"
                value={filter.minPrice}
                onChange={handleFilterChange}
              />

              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                className="form-control"
                value={filter.maxPrice}
                onChange={handleFilterChange}
              />

            </div>

          </div>

        </div>

        {/* ================= PRODUCTS ================= */}

        <div className="col-lg-9">

          {/* Loading */}

          {loading && (
            <div className="text-center mt-5">
              <div className="spinner-border text-warning"></div>
              <p>Loading products...</p>
            </div>
          )}

          {/* No Data */}

          {!loading && data.length === 0 && (
            <div className="text-center text-muted mt-5">
              No products found 😔
            </div>
          )}

          {/* PRODUCTS GRID (CENTER FIXED) */}

          <div className="row g-3">

            {data.map((item) => (

              <div
                key={item._id}
                className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex justify-content-center"
              >

                <Cards {...item} />

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Search;