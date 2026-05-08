import React from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">

      {/* ================= MAIN BANNER ================= */}

      <div
        className="d-flex justify-content-center align-items-center bannerSetting w-100"
        style={{
          height: "450px",
          cursor: "pointer",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
        onClick={() => navigate("/mencollection")}
      />

      {/* ================= CATEGORY SECTION ================= */}

      <div className="container-fluid px-0">

        <div className="row g-0">

          {/* CARD 1 */}
          <div
            className="col-6 col-md-3 categoryTile"
            onClick={() =>
              navigate("/category/69e2109e78e59f607d72c33a")
            }
          >
            <img src="/images/jacket.png" alt="jacket" />
          </div>

          {/* CARD 2 */}
          <div
            className="col-6 col-md-3 categoryTile"
            onClick={() =>
              navigate("/category/69e2109e78e59f607d72c33a")
            }
          >
            <img src="/images/shoes.png" alt="shoes" />
          </div>

          {/* CARD 3 */}
          <div
            className="col-6 col-md-3 categoryTile"
            onClick={() =>
              navigate("/category/69e2105d78e59f607d72c337")
            }
          >
            <img src="/images/watch.png" alt="watch" />
          </div>

          {/* CARD 4 */}
          <div
            className="col-6 col-md-3 categoryTile"
            onClick={() =>
              navigate("/category/69e2108478e59f607d72c338")
            }
          >
            <img src="/images/shirt.png" alt="shirt" />
          </div>

        </div>

      </div>

    </div>
  );
}

export default Banner;