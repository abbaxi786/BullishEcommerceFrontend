import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../components/card';

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

  function handleFilterChange(e) {
    const { name, value } = e.target;

    setFilter((prev) => ({
      ...prev,
      [name]: value
    }));
  }

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
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

      const query = search.trim() === "" ? "all" : search;

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
    <div className="container-fluid mt-3">

      <div className="row">

        <div className="col-md-3">
          <div className="p-3 bg-light shadow rounded position-sticky" style={{ top: "20px" }}>

            <h5 className="mb-3 text-warning">Filters</h5>

            <h6 className="text-secondary">Category</h6>
            <div className="mb-3">
              {categories.map((cat) => (
                <div key={cat._id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => handleCategoryChange(cat._id)}
                  />
                  <label className="form-check-label">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>

            <h6 className="text-secondary">Price Range</h6>

            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              className="form-control mb-2"
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

        <div className="col-md-9">

          <div className="mb-3 mt-3">
            <input
              className="form-control form-control-lg shadow-sm"
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search products..."
            />
          </div>

          {loading && (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary"></div>
              <p>Loading products...</p>
            </div>
          )}

          {!loading && data.length === 0 && (
            <div className="text-center text-muted mt-5">
              No products found 😔
            </div>
          )}

          <div className="row g-3">
            {data.map((item) => (
              <div
                key={item._id}
                className="col-12 col-sm-6 col-md-6 col-lg-4"
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