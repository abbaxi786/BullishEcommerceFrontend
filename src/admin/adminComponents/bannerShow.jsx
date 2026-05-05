import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { NotificationContext } from "../../function/notification";

function BannerList() {
  const [banners, setBanners] = useState([]);
  const { showToast } = useContext(NotificationContext);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/banner`);
        setBanners(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/banner/${id}`);

      setBanners((prev) => prev.filter((item) => item._id !== id));

      showToast("Banner deleted successfully", "warning");

    } catch (error) {
      console.log(error);
      showToast("Error deleting banner", "danger");
    }
  };

  return (
    <div className="container mt-4">

      <h3 className="text-warning mb-3">All Banners</h3>

      {banners.length === 0 ? (
        <div className="alert alert-warning">No banners found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">

            <thead className="table-warning text-center">
              <tr>
                <th>Caption</th>
                <th>Alt</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {banners.map((item) => {
                const product = item.productId;

                return (
                  <tr key={item._id} className="align-middle text-center">

                    
                    {/* CAPTION */}
                    <td>{item.caption}</td>

                    {/* ALT */}
                    <td>{item.alt}</td>

                    {/* DISCOUNT */}
                    <td>
                      <span className="badge bg-warning text-dark">
                        {item.discount || 0}%
                      </span>
                    </td>

                    {/* DELETE BUTTON */}
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default BannerList;