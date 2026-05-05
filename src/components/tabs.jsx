import { Link } from "react-router-dom";
import CardCollection from "./cardCollections";
import { useEffect, useState } from "react";
import axios from "axios";

function Tab() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function GetCategories() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/category`
        );
        setCategory(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    GetCategories();
  }, []);

  return (
    <>

      {/* CATEGORY SCROLLER */}
      <div className="container my-4">

        <div
          className="
            d-flex 
            flex-nowrap 
            overflow-auto 
            gap-2 
            py-2 
            px-2 
            border 
            rounded
            d-md-block
          "
          style={{
            whiteSpace: "nowrap",
          }}
        >

          {category.map((categorys) => (
            <Link
              to={`/category/${categorys._id}`}
              key={categorys._id}
              className="
                d-inline-block 
                px-3 
                py-2 
                text-white 
                bg-warning 
                text-decoration-none 
                rounded 
                me-2
              "
              style={{
                minWidth: "120px",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {categorys.name}
            </Link>
          ))}

        </div>

      </div>

      {/* CATEGORY SECTIONS (VERTICAL ON DESKTOP) */}
      <div className="container">

        {category.map((categorys) => (
          <div className="my-4" key={categorys._id}>

            <h4 className="mb-3 text-center text-md-start">
              {categorys.name} Collection
            </h4>

            <CardCollection id={categorys._id} />

          </div>
        ))}

      </div>

    </>
  );
}

export default Tab;