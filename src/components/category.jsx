import { Link } from "react-router-dom";

function Category() {
    return (
        <div class="hstack gap-3 border mx-5 my-5">
            <Link  class="p-2 text-secondary text-decoration-none border border-black">Men Watches</Link>
            <Link  class="p-2 text-secondary text-decoration-none border border-black">Men's Shirt</Link>
            <Link  class="p-2 text-secondary text-decoration-none border border-black">Men's Pants</Link>
            <Link  class="p-2 text-secondary text-decoration-none border border-black">Men's Shoes</Link>
        </div>
    )
}

export default Category;