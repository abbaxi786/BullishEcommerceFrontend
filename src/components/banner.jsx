import React from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "450px",
          backgroundImage: "url('/images/mainBanner.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          cursor: "pointer",
        }}
        onClick={() => navigate("/category/featured")}
      ></div>

      <div className="row g-0">

        <div
          className="col-6 sizeUp col-md-3 d-flex justify-content-center align-items-center"
          style={cardStyle}
          onClick={() => navigate("/category/69e2109e78e59f607d72c33a")}
        >
          <img src="/images/jacket.png" alt="jacket" style={imgStyle} />
        </div>

        <div
          className="col-6 sizeUp col-md-3 d-flex justify-content-center align-items-center"
          style={cardStyle}
          onClick={() => navigate("/category/69e2109e78e59f607d72c33a")}
        >
          <img src="/images/shoes.png" alt="shoes" style={imgStyle} />
        </div>

        <div
          className="col-6 sizeUp col-md-3 d-flex justify-content-center align-items-center"
          style={cardStyle}
          onClick={() => navigate("/category/69e2105d78e59f607d72c337")}
        >
          <img src="/images/watch.png" alt="watch" style={imgStyle} />
        </div>

        <div
          className="col-6 sizeUp col-md-3 d-flex justify-content-center align-items-center"
          style={cardStyle}
          onClick={() => navigate("/category/69e2108478e59f607d72c338")}
        >
          <img src="/images/shirt.png" alt="shirt" style={imgStyle} />
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  height: "230px",
  cursor: "pointer",
  backgroundColor: "#fff",
};

const imgStyle = {
  maxHeight: "90%",
  maxWidth: "90%",
  objectFit: "contain",
};

export default Banner;