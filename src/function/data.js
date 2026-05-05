import axios from 'axios'




const data= {
  "categories": [
    {
      "id": 1,
      "name": "Men Watches",
      "path": "men-watches",
      "products": [
        {
          "id": 101,
          "name": "Apple Watch Series 7",
          "price": 399,
          "image": "https://www.tejar.pk/media/catalog/product/cache/3/image/500x/9df78eab33525d08d6e5fb8d27136e95/a/p/apple_watch_series_10_-_tejar_2__2.jpg",
          "description": "Advanced smartwatch with health tracking and seamless iOS integration."
        },
        {
          "id": 102,
          "name": "Samsung Galaxy Watch 6",
          "price": 349,
          "image": "https://www.tejar.pk/media/catalog/product/cache/3/image/500x/9df78eab33525d08d6e5fb8d27136e95/s/m/sm-r940nzk_et-sfr93sb_1.jpg",
          "description": "Stylish smartwatch with fitness tracking and long battery life."
        },
        {
          "id": 103,
          "name": "Fossil Gen 6",
          "price": 299,
          "image": "https://www.tejar.pk/media/catalog/product/cache/3/image/500x/9df78eab33525d08d6e5fb8d27136e95/f/o/fossil_gen_6_smartwatch1_-_tejar.jpg",
          "description": "Classic design with modern smart features and fast charging."
        },
        {
          "id": 104,
          "name": "Casio G-Shock",
          "price": 120,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9xdp_vLgc-0UjpWIF_v43aIDJFX8MHUBXBeZ3Pu3BN8wMJ-Rb3c4O1UmjfAj9BOs-W4Q9frEo3j23hVOom4vQtQNp06qsPLQQ1m06J66J&s=10",
          "description": "Rugged and durable watch designed for extreme conditions."
        },
        {
          "id": 105,
          "name": "Rolex Submariner",
          "price": 8500,
          "image": "https://media.gettyimages.com/id/1034799540/photo/huntington-beach-ca-a-vintage-1955-rolex-submariner-model-no-6205-valued-at-approximately-18.jpg?s=612x612&w=0&k=20&c=73reucDSWoR1VGOXB4Qsy4Ht48w5xdurzjZsYmoBPPw=",
          "description": "Luxury diving watch with timeless design and precision."
        },
        {
          "id": 106,
          "name": "Tissot PRX",
          "price": 650,
          "image": "https://ontimecollection.com.pk/wp-content/uploads/2022/02/A1D98EB6-82AB-4B5A-8D1D-75E805C0D89B.webp",
          "description": "Elegant Swiss watch with a sleek stainless steel finish."
        },
        {
          "id": 107,
          "name": "Seiko Automatic",
          "price": 280,
          "image": "https://w7.pngwing.com/pngs/576/880/png-transparent-seiko-5-automatic-watch-seiko-men-s-core-srpa29-watch-thumbnail.png",
          "description": "Reliable automatic movement with a sophisticated look."
        },
        {
          "id": 108,
          "name": "Citizen Eco-Drive",
          "price": 320,
          "image": "https://w7.pngwing.com/pngs/820/968/png-transparent-eco-drive-watch-citizen-holdings-titanium-chronograph-citizen-watches-silver-blue-men-s-watch-blue-watch-accessory-mens-thumbnail.png",
          "description": "Solar-powered watch with eco-friendly technology."
        },
        {
          "id": 109,
          "name": "Timex Expedition",
          "price": 90,
          "image": "https://w7.pngwing.com/pngs/111/926/png-transparent-timex-group-usa-inc-watch-timex-indiglo-expedition-rugged-field-jewellery-watch-thumbnail.png",
          "description": "Outdoor adventure watch with durable construction."
        },
        {
          "id": 110,
          "name": "Huawei Watch GT 4",
          "price": 250,
          "image": "https://images.priceoye.pk/huawei-watch-gt-4-pakistan-priceoye-yjidr-500x500.webp",
          "description": "Smartwatch with impressive battery life and health monitoring."
        }
      ]
    },
    {
      "id": 2,
      "name": "Men's Shirt",
      "path": "mens-shirt",
      "products": [
        {
          "id": 201,
          "name": "Classic White Formal Shirt",
          "price": 45,
          "image": "https://img.drz.lazcdn.com/static/pk/p/cd818ad0f96945e8cc9784433647bec5.jpg_400x400q75.avif",
          "description": "Elegant white shirt perfect for formal occasions."
        },
        {
          "id": 202,
          "name": "Slim Fit Blue Shirt",
          "price": 40,
          "image": "https://img.drz.lazcdn.com/static/pk/p/fd0ab48266338eaccef000db14f54633.png_400x400q75.avif",
          "description": "Modern slim-fit design for a stylish appearance."
        },
        {
          "id": 203,
          "name": "Checked Casual Shirt",
          "price": 35,
          "image": "https://shopbrumano.com/cdn/shop/files/green-bold-gingham-checkered-shirt-Brumano-Pakistan1.jpg?v=1775805586&width=540",
          "description": "Comfortable checked shirt ideal for casual wear."
        },
        {
          "id": 204,
          "name": "Denim Shirt",
          "price": 50,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKlWjLDZpLxcAMLZY4GPobeURRuQvjmzyW9rIv2rFbTWKA8Cm5XbCmDSdZK5dRKDgNY6dYQ&s",
          "description": "Trendy denim shirt with a rugged look."
        },
        {
          "id": 205,
          "name": "Linen Summer Shirt",
          "price": 38,
          "image": "https://outfitters.com.pk/cdn/shop/files/F0787103618_1.jpg?v=1752668274&width=246",
          "description": "Breathable linen shirt perfect for hot weather."
        },
        {
          "id": 206,
          "name": "Black Formal Shirt",
          "price": 42,
          "image": "https://img.drz.lazcdn.com/static/pk/p/81bcd4ae9dff1193e5177c5a2d6e4991.jpg_400x400q75.jpg_.webp",
          "description": "Sophisticated black shirt for evening events."
        },
        {
          "id": 207,
          "name": "Printed Casual Shirt",
          "price": 36,
          "image": "https://img.drz.lazcdn.com/static/pk/p/6b081f1ec311c6bbe14bb76860211424.jpg_400x400q75.avif",
          "description": "Vibrant printed shirt for a fashionable look."
        },
        {
          "id": 208,
          "name": "Short Sleeve Shirt",
          "price": 30,
          "image": "https://shopbrumano.com/cdn/shop/files/White-Light-Weight-Cuban-Collar-Shirt-Brumano-Pakistan1.jpg?v=1773902295&width=540",
          "description": "Comfortable short-sleeve shirt for everyday wear."
        },
        {
          "id": 209,
          "name": "Striped Dress Shirt",
          "price": 44,
          "image": "https://img.drz.lazcdn.com/static/pk/p/ef9b67ddf7faba1efc46abf105762bec.jpg_400x400q75.avif",
          "description": "Professional striped shirt suitable for office settings."
        },
        {
          "id": 210,
          "name": "Oxford Button-Down Shirt",
          "price": 48,
          "image": "https://img.drz.lazcdn.com/static/pk/p/b75effb481255ec20ea89c92850d6d12.png_400x400q75.avif",
          "description": "Timeless Oxford shirt with button-down collar."
        }
      ]
    },
    {
      "id": 3,
      "name": "Men's Pants",
      "path": "mens-pants",
      "products": [
        {
          "id": 301,
          "name": "Slim Fit Jeans",
          "price": 55,
          "image": "https://charcoal.com.pk/cdn/shop/files/DSC08891_46b9804f-6e6d-4af3-abdf-573e6b43e52b.jpg?v=1753163261&width=500",
          "description": "Stylish slim-fit jeans for everyday wear."
        },
        {
          "id": 302,
          "name": "Classic Chinos",
          "price": 50,
          "image": "https://furorjeans.com/cdn/shop/products/23_M_MenChinoPants_FMBCP23-017_1_640x800_crop_center.jpg?v=1697193808",
          "description": "Versatile chinos suitable for casual and formal occasions."
        },
        {
          "id": 303,
          "name": "Formal Dress Pants",
          "price": 60,
          "image": "https://diners.com.pk/cdn/shop/files/BA3143-D-Grey-01_720x.webp?v=1758888040",
          "description": "Elegant dress pants perfect for business attire."
        },
        {
          "id": 304,
          "name": "Cargo Pants",
          "price": 45,
          "image": "https://cdn.shopify.com/s/files/1/0671/0621/files/DSC9011_f4530802-d747-4474-8695-c306f422515a_large.jpg?v=1754759702",
          "description": "Functional cargo pants with multiple pockets."
        },
        {
          "id": 305,
          "name": "Jogger Pants",
          "price": 40,
          "image": "https://zellbury.com/cdn/shop/files/MPD25001_6.jpg?v=1770892022&width=823",
          "description": "Comfortable joggers ideal for casual wear."
        },
        {
          "id": 306,
          "name": "Khaki Pants",
          "price": 48,
          "image": "https://diners.com.pk/cdn/shop/files/BD3128-KHAKI-01_2000x.webp?v=1760963127",
          "description": "Classic khaki pants with timeless appeal."
        },
        {
          "id": 307,
          "name": "Corduroy Pants",
          "price": 52,
          "image": "https://thecambridgeshop.com/cdn/shop/products/2_f7d129eb-54ea-4b5f-8ebf-ab25d1c06063.jpg?v=1643868383&width=600",
          "description": "Warm and stylish corduroy pants."
        },
        {
          "id": 308,
          "name": "Track Pants",
          "price": 35,
          "image": "https://img.drz.lazcdn.com/static/pk/p/bfa11fe04741e043a611d9c1e963a22c.jpg_400x400q75.avif",
          "description": "Sporty track pants for workouts and lounging."
        },
        {
          "id": 309,
          "name": "Regular Fit Jeans",
          "price": 50,
          "image": "https://www.exportleftovers.com/cdn/shop/files/4_092a49ec-6af1-4a51-87c2-a029f3c245d8.jpg?v=1766072947&width=640",
          "description": "Comfortable regular-fit jeans."
        },
        {
          "id": 310,
          "name": "Linen Pants",
          "price": 46,
          "image": "https://ivarclothing.com/cdn/shop/files/Linen_TrouserDark_Khaki_3.jpg?v=1773131355&width=360",
          "description": "Lightweight linen pants ideal for summer."
        }
      ]
    },
    {
      "id": 4,
      "name": "Men's Shoes",
      "path": "mens-shoes",
      "products": [
        {
          "id": 401,
          "name": "Running Sneakers",
          "price": 70,
          "image": "https://img.drz.lazcdn.com/static/pk/p/bb2695b757ae74ddb3708d1b8602a47f.jpg_400x400q75.avif",
          "description": "Lightweight sneakers designed for running."
        },
        {
          "id": 402,
          "name": "Formal Leather Shoes",
          "price": 95,
          "image": "https://www.hushpuppies.com.pk/cdn/shop/files/IMG_1751.jpg?v=1757509345&width=600",
          "description": "Premium leather shoes for formal occasions."
        },
        {
          "id": 403,
          "name": "Casual Loafers",
          "price": 65,
          "image": "https://www.ndure.com/cdn/shop/files/1_756180cc-73f9-4d67-ae0b-dfc5f98977cc.jpg?v=1767683644&width=493",
          "description": "Comfortable loafers for everyday wear."
        },
        {
          "id": 404,
          "name": "Ankle Boots",
          "price": 110,
          "image": "https://corio.pk/cdn/shop/files/1_39ab1d7f-ecd9-4035-8b13-858ccbf819cb_900x.jpg?v=1767900724",
          "description": "Stylish boots suitable for various outfits."
        },
        {
          "id": 405,
          "name": "Sports Training Shoes",
          "price": 75,
          "image": "https://speedsports.pk/cdn/shop/files/AURORA_621716-300_PHSLH000-2000.jpg?v=1773404423&width=900",
          "description": "Durable shoes designed for gym and training."
        },
        {
          "id": 406,
          "name": "Leather Sandals",
          "price": 40,
          "image": "https://gomilaintersole.pk/cdn/shop/files/shoesFACEcopy2ecopyrjrjrjcopy.jpg?v=1770362992&width=400",
          "description": "Comfortable sandals for warm weather."
        },
        {
          "id": 407,
          "name": "Flip Flops",
          "price": 20,
          "image": "https://www.urbansole.com.pk/cdn/shop/files/US-FF-5353-BLACK-GREY_1.jpg?v=1757005691&width=750",
          "description": "Casual flip flops for relaxed wear."
        },
        {
          "id": 408,
          "name": "High-Top Sneakers",
          "price": 85,
          "image": "https://img.drz.lazcdn.com/g/kf/S30a6da14b3ec4aca92d1bd332d4524c4a.jpg_400x400q75.avif",
          "description": "Trendy high-top sneakers with ankle support."
        },
        {
          "id": 409,
          "name": "Suede Loafers",
          "price": 78,
          "image": "https://pk.lamaretail.com/cdn/shop/files/MFS26LF016-LIGHT-GREY-GOAT-SUEDE-PENNY-LOAFERS-635f5e-_179.jpg?v=1772988048&width=900",
          "description": "Elegant suede loafers for smart-casual outfits."
        },
        {
          "id": 410,
          "name": "Hiking Boots",
          "price": 120,
          "image": "https://img.drz.lazcdn.com/g/kf/S78c7dc58edd64bc9a971f2c1b2f5286cg.jpg_400x400q75.avif",
          "description": "Rugged boots designed for outdoor adventures."
        }
      ]
    }
  ]
}

function GetWholeCategories() {
    const categories = data.categories.map(category => ({
        id: category.id,
        name: category.name,
        path: category.path,
    }));
    return categories;
}

function GetCardById(id){
    for (const category of data.categories) {
        const product = category.products.find(product => product.id === id);
        if (product) {
            return product;
        }
    }
    return null;
}

function GetCardsByCategoryId(id) {
    const category = data.categories.find(category => category.id === id);

    return category ? { products: category.products,name:category.name } : { products: [] };
}

async function GetProductFromServerByCategoryId(categoryId) {
  try {
    const response = await axios.get(
      `http://localhost:5412/product/${categoryId}`
    );

    console.log("Data from server:", response.data.data);

    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
}

export {
  GetWholeCategories,
  GetCardById,
  GetCardsByCategoryId,
  GetProductFromServerByCategoryId
};