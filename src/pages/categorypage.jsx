import React from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/card";
import axios from "axios";

function CategoryPage() {
  const { id } = useParams();

  const [cards, setCards] = React.useState([]);
  const [categoryName, setCategoryName] = React.useState("");

  React.useEffect(() => {
    async function GetProductCategoryId(ID) {
      try {
        const productRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/${ID}`
        );

        const categoryRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/category`
        );

        setCards(productRes.data.data);

        const category = categoryRes.data.data.find(
          (cat) => cat._id === ID
        );

        if (category) {
          setCategoryName(category.name);
        }
      } catch (error) {
        console.error(error);
      }
    }

    GetProductCategoryId(id);
  }, [id]);

  return (
    <div className="hstack m-5 gap-3 flex-wrap justify-content-center">
      <h1>{categoryName}</h1>

      {cards.map((card) => (
        <Cards key={card._id} {...card} />
      ))}
    </div>
  );
}

export default CategoryPage;