import React, { useState } from "react";
import OrderPage from "../components/orderPage";
import FavouritePage from "../components/favourite";
import Profile from "./profile";

function Setting() {
  const [tab, setTab] = useState("OrderPage");

  function renderTab() {
    switch (tab) {
      case "OrderPage":
        return <OrderPage />;
      case "WishList":
        return <FavouritePage />;
      case "profile":
        return <Profile />;
      default:
        return <div>Select something</div>;
    }
  }

  const tabButton = (name, label) => (
    <button
      onClick={() => setTab(name)}
      className={`w-100 text-start px-3 py-2 border-0 fw-semibold ${
        tab === name ? "bg-warning text-dark" : "bg-light text-dark"
      }`}
      style={{
        borderRadius: "6px",
        marginBottom: "6px",
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="container-fluid mt-3 min-vh-100" >
      <div className="row">

        <div className="col-lg-3 d-none d-lg-block" style={{backgroundColor:"#f8f8f8"}}>
          <div className="p-2 border rounded">
            {tabButton("OrderPage", "Orders")}
            {tabButton("WishList", "WishList")}
            {tabButton("profile", "Profile")}
          </div>
        </div>

        <div className="col-12 col-lg-9">
          {renderTab()}
        </div>
      </div>

      <button
        className="btn btn-warning d-lg-none position-fixed bottom-0 end-0 m-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileSidebar"
      >
        Menu
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body" style={{backgroundColor:"#f8f8f8"}}>
          {tabButton("OrderPage", "Orders")}
          {tabButton("favourite", "Favourite")}
          {tabButton("profile", "Profile")}
        </div>
      </div>
    </div>
  );
}

export default Setting;