import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBlog, FaRegCalendarAlt, FaTags, FaUser } from "react-icons/fa";

export default function BlogPage() {
    const navigate = useNavigate();

const posts = [
  {
    id: 1,
    title: "Top 10 Men's Fashion Trends in 2026",
    author: "Admin",
    role: "Fashion Editor",
    date: "2026-01-10",
    readingTime: "6 min read",
    category: "Fashion",
    tags: ["trends", "streetwear", "luxury"],
    image:
      "https://plus.unsplash.com/premium_photo-1658506787944-7939ed84aaf8?w=600",
    description:
      "Discover the latest men's fashion trends dominating 2026, including oversized fits, luxury streetwear fusion, and sustainable clothing choices.",
    content:
      "Men's fashion in 2026 is no longer just about clothing — it represents identity, lifestyle, and confidence. Oversized silhouettes, neutral earth tones, and tech-inspired fabrics are dominating global fashion. Designers are merging streetwear with luxury elements, creating outfits that are both comfortable and premium. Sustainability is also a major focus, with brands shifting toward eco-friendly materials and ethical production. Accessories like crossbody bags, retro sneakers, and minimalist watches are becoming essential for completing modern looks."
  },

  {
    id: 2,
    title: "How to Choose the Perfect Jacket for Winter",
    author: "Admin",
    role: "Style Consultant",
    date: "2026-02-05",
    readingTime: "5 min read",
    category: "Style Guide",
    tags: ["winter", "jackets"],
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600",
    description:
      "A complete guide to selecting the perfect winter jacket based on fabric, insulation, style, and weather conditions.",
    content:
      "Choosing the right winter jacket is essential for both comfort and style. Wool coats are ideal for formal occasions, while puffer jackets provide maximum warmth in extreme cold conditions. Leather jackets are perfect for a bold and stylish appearance. Always consider layering, especially in harsh winters, as it helps maintain warmth without compromising mobility. Color selection also matters — darker tones like black, navy, and brown offer versatility and a timeless look."
  },

  {
    id: 3,
    title: "Best Outfit Combinations for Casual Wear",
    author: "Admin",
    role: "Fashion Writer",
    date: "2026-03-12",
    readingTime: "4 min read",
    category: "Outfits",
    tags: ["casual", "style"],
    image:
      "https://images.unsplash.com/photo-1566070143658-523a24797109?w=600",
    description:
      "Learn how to create effortless casual outfits using simple wardrobe essentials and color combinations.",
    content:
      "Casual fashion is all about simplicity, comfort, and smart pairing. A basic white t-shirt combined with slim-fit jeans and clean sneakers creates a timeless look. Layering with denim or lightweight jackets enhances the outfit further. Neutral colors like white, grey, black, and beige allow easy mixing and matching. Accessories such as watches and caps can elevate even the simplest outfits, making them look more stylish and complete."
  },

  {
    id: 4,
    title: "Why Quality Clothing Matters in Men's Fashion",
    author: "Admin",
    role: "Lifestyle Blogger",
    date: "2026-04-01",
    readingTime: "5 min read",
    category: "Lifestyle",
    tags: ["quality", "fabric"],
    image:
      "https://images.unsplash.com/photo-1705248382836-3618e25706d0?w=600",
    description:
      "Understand why investing in high-quality clothing improves appearance, durability, and long-term style confidence.",
    content:
      "Quality clothing plays a major role in defining personal style. High-quality fabrics such as cotton, wool, and denim not only last longer but also provide better comfort and fit. Cheap clothing may look attractive initially but often loses shape and color after a few washes. Investing in premium clothing improves confidence, enhances appearance, and ensures long-term value. A well-dressed individual always leaves a strong impression in both social and professional environments."
  },

  {
    id: 5,
    title: "Top Sneakers Every Man Should Own in 2026",
    author: "Admin",
    role: "Sneaker Expert",
    date: "2026-05-12",
    readingTime: "5 min read",
    category: "Footwear",
    tags: ["sneakers", "shoes"],
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600",
    description:
      "Explore the must-have sneaker styles every man should own for a versatile and modern wardrobe.",
    content:
      "Sneakers have become a core element of modern men's fashion. From classic white sneakers to chunky street-style designs, they offer both comfort and versatility. In 2026, minimalist sneaker designs with neutral tones are trending globally. Sneakers can be paired with jeans, chinos, or even semi-formal outfits. Investing in high-quality sneakers ensures durability and a clean aesthetic that enhances overall style."
  },

  {
    id: 6,
    title: "How to Match Colors in Men's Outfits",
    author: "Admin",
    role: "Style Guide",
    date: "2026-06-01",
    readingTime: "6 min read",
    category: "Styling",
    tags: ["colors", "outfits"],
    image:
      "https://plus.unsplash.com/premium_photo-1675202428354-31b4d814df9d?w=600",
    description:
      "Master the art of color coordination in men's fashion to create balanced and stylish outfits effortlessly.",
    content:
      "Color coordination is one of the most important aspects of fashion. Understanding complementary and neutral colors helps in creating visually appealing outfits. For example, pairing navy with white gives a clean look, while black with grey creates a strong formal appearance. Avoid using too many bold colors together. Instead, balance one strong color with neutral tones for a professional and stylish outfit."
  },

  {
    id: 7,
    title: "Streetwear Guide for Beginners",
    author: "Admin",
    role: "Fashion Blogger",
    date: "2026-06-10",
    readingTime: "7 min read",
    category: "Streetwear",
    tags: ["streetwear", "urban"],
    image:
      "https://images.unsplash.com/photo-1614028574724-baea020fbe9e?w=600",
    description:
      "A complete beginner’s guide to understanding streetwear fashion and how to style it properly.",
    content:
      "Streetwear fashion originated from urban culture and has now become a global trend. It includes oversized hoodies, graphic t-shirts, sneakers, and relaxed fits. The key to mastering streetwear is confidence and balance. Avoid over-accessorizing and focus on statement pieces. Brands like Supreme and Nike have influenced this style heavily, making it a dominant trend in youth fashion."
  },

  {
    id: 8,
    title: "Formal Wear Guide for Office Men",
    author: "Admin",
    role: "Corporate Stylist",
    date: "2026-06-15",
    readingTime: "5 min read",
    category: "Formal",
    tags: ["office", "formal"],
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600",
    description:
      "Learn how to dress professionally for office environments with perfect formal outfit combinations.",
    content:
      "Formal wear is essential for creating a professional impression in the workplace. A well-fitted suit, crisp shirt, and polished shoes form the foundation of office attire. Colors like navy, black, and grey are most suitable for formal environments. Accessories such as ties and watches should be minimal yet elegant. Proper grooming combined with formal dressing enhances confidence and credibility in professional settings."
  }
];

    const handleMore = (post) => {
        navigate("/blogcontent", { state: post });
    };

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <FaBlog size={40} className="text-warning mb-2" />
                <h1 className="fw-bold">Our Blog</h1>
                <p className="text-muted">
                    Latest fashion tips, trends, and style guides for men
                </p>
            </div>

            <div className="row g-4">
                {posts.map((post) => (
                    <div key={post.id} className="col-md-6 col-lg-4">
                        <div
                            className="card text-white h-100 shadow-sm position-relative overflow-hidden"
                            style={{ minHeight: "380px" }}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${post.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    top: 0,
                                    left: 0,
                                    zIndex: 1,
                                }}
                            />

                            <div
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0,0,0,0.65)",
                                    zIndex: 2,
                                }}
                            />

                            <div className="card-body position-relative" style={{ zIndex: 3 }}>
                                <h5 className="text-warning">{post.title}</h5>
                                <p>{post.description}</p>

                                <small className="text-light d-block mb-2">
                                    {post.readingTime}
                                </small>

                                <div className="mt-auto small">
                                    <p><FaUser className="text-warning me-1" /> {post.author} ({post.role})</p>
                                    <p><FaRegCalendarAlt className="text-warning me-1" /> {post.date}</p>
                                    <p><FaTags className="text-warning me-1" /> {post.category}</p>
                                </div>
                            </div>

                            <div
                                className="card-footer bg-transparent border-0 position-relative"
                                style={{ zIndex: 3 }}
                            >
                                <button
                                    onClick={() => handleMore(post)}
                                    className="btn btn-warning w-100"
                                >
                                    More...
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}