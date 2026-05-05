import React, { useState, useEffect } from "react";
import { FaBars, FaBox, FaShoppingCart, FaPlus } from "react-icons/fa";
import { PiFlagBannerFoldFill } from "react-icons/pi";
import { RiFolderUserLine } from "react-icons/ri";

import Product from "./adminComponents/products";
import Order from "./adminComponents/Order";
import CreateProduct from "./adminComponents/createProduct";
import Category from "./adminComponents/categories";
import BannerItems from "./adminComponents/banner";
import UserView from "./adminComponents/user";
import PanelLogIn from "./panellogin";
import BannerList from "./adminComponents/bannerShow";
import ApprovalComment from "./adminComponents/aprovalComment";

function MainPanel() {
  const [activeTab, setActiveTab] = useState("orders");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const encrypt = sessionStorage.getItem("encrypt");
    console.log("This is encrypt" + encrypt);
    if (encrypt) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("encrypt");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <PanelLogIn setLog={setIsLoggedIn} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "orders":          return <Order />;
      case "approvalFeedback":return <ApprovalComment />;
      case "products":        return <Product />;
      case "create":          return <CreateProduct />;
      case "createCategory":  return <Category />;
      case "banner":          return <BannerItems />;
      case "user":            return <UserView />;
      case "bannerShow":      return <BannerList />;
      default:                return <Order />;
    }
  };

  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <div
        className={`bg-dark text-white p-3 sidebar ${showSidebar ? "show" : ""}`}
        style={{
          overflowY: "auto",
          maxHeight: "100vh",
        }}
      >
        <h4 className="text-warning">Admin Panel</h4>

        <ul className="nav flex-column mt-4">

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "user" ? "bg-warning text-dark" : "text-white"}`}
              onClick={() => { setActiveTab("user"); setShowSidebar(false); }}
            >
              <RiFolderUserLine /> Users
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "orders" ? "bg-warning text-dark" : "text-white"}`}
              onClick={() => { setActiveTab("orders"); setShowSidebar(false); }}
            >
              <FaShoppingCart /> Orders
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "products" ? "bg-warning text-dark" : "text-white"}`}
              onClick={() => { setActiveTab("products"); setShowSidebar(false); }}
            >
              <FaBox /> Products
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "create" ? "bg-warning text-dark" : "text-white"}`}
              onClick={() => { setActiveTab("create"); setShowSidebar(false); }}
            >
              <FaPlus /> Create Product
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "createCategory" ? "bg-warning text-dark" : "text-white"}`}
              onClick={() => { setActiveTab("createCategory"); setShowSidebar(false); }}
            >
              <FaPlus /> Create Category
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "banner" ? "bg-warning text-dark" : "text-white"}`}
              onClick={() => { setActiveTab("banner"); setShowSidebar(false); }}
            >
              <FaPlus /><PiFlagBannerFoldFill /> Set Banner
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "bannerShow" ? "bg-warning text-dark" : "text-white"}`}
              onClick={() => { setActiveTab("bannerShow"); setShowSidebar(false); }}
            >
              <PiFlagBannerFoldFill /> Banners
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "approvalFeedback" ? "bg-warning text-dark" : "text-white"}`}
              onClick={() => { setActiveTab("approvalFeedback"); setShowSidebar(false); }}
            >
              <PiFlagBannerFoldFill /> Approval FeedBack
            </button>
          </li>

        </ul>

        <button className="btn btn-danger mt-4 w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1">
        <div className="p-2 bg-light shadow-sm d-md-none">
          <button className="btn btn-warning" onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars />
          </button>
        </div>
        <div className="p-4">{renderContent()}</div>
      </div>

    </div>
  );
}

export default MainPanel;