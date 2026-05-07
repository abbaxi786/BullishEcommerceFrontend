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
      date: "2026-01-10",
      category: "Fashion",
      image:
        "https://plus.unsplash.com/premium_photo-1658506787944-7939ed84aaf8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      description:
        "Discover the latest men's fashion trends that are dominating 2026, from streetwear to formal styles.",
      content: `Men's fashion in 2026 is evolving rapidly. Streetwear is merging with luxury fashion, creating a unique blend of comfort and style. Oversized fits, neutral tones, and sustainable fabrics are leading the industry. Accessories like minimalist watches and crossbody bags are becoming essential. This guide explores how to upgrade your wardrobe with modern trends and stay ahead in fashion.`
    },
    {
      id: 2,
      title: "How to Choose the Perfect Jacket for Winter",
      author: "Admin",
      date: "2026-02-05",
      category: "Style Guide",
      image:
        "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&auto=format&fit=crop&q=60",
      description:
        "A complete guide to selecting the right winter jacket based on style, material, and comfort.",
      content: `Choosing the right jacket depends on climate, fabric, and fit. Wool jackets are great for formal wear, while puffer jackets provide maximum warmth. Leather jackets add a stylish edge. Always consider layering and comfort when selecting winter outfits.`
    },
    {
      id: 3,
      title: "Best Outfit Combinations for Casual Wear",
      author: "Admin",
      date: "2026-03-12",
      category: "Outfits",
      image:
        "https://images.unsplash.com/photo-1566070143658-523a24797109?w=600&auto=format&fit=crop&q=60",
      description:
        "Learn how to mix and match casual outfits to look stylish and confident every day.",
      content: `Casual fashion is all about balance. Pairing jeans with plain t-shirts, sneakers with chinos, and layering with light jackets creates a clean look. Neutral colors like white, black, and beige are easy to mix and match.`
    },
    {
      id: 4,
      title: "Why Quality Clothing Matters in Men's Fashion",
      author: "Admin",
      date: "2026-04-01",
      category: "Lifestyle",
      image:
        "https://images.unsplash.com/photo-1705248382836-3618e25706d0?w=600&auto=format&fit=crop&q=60",
      description:
        "Understand why investing in quality clothing improves your look, comfort, and confidence.",
      content: `Quality clothing lasts longer, fits better, and enhances your overall appearance. Cheap fabrics may save money initially but wear out quickly. Investing in good materials like cotton, wool, and denim ensures durability and style.`
    },
  ];

  const handleMore = (post) => {
    navigate("/blogcontent", { state: post });
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <FaBlog size={40} className="text-warning mb-2" />
        <h1 className="fw-bold">Our Blog</h1>
        <p className="text-muted">Latest fashion tips, trends, and style guides for men</p>
      </div>

      <div className="row g-4">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 col-lg-4">
            <div
              className="card text-white h-100 shadow-sm position-relative overflow-hidden"
              style={{ minHeight: "350px" }}
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

                <div className="mt-auto">
                  <p><FaUser className="text-warning me-1" /> {post.author}</p>
                  <p><FaRegCalendarAlt className="text-warning me-1" /> {post.date}</p>
                  <p><FaTags className="text-warning me-1" /> {post.category}</p>
                </div>
              </div>

              <div className="card-footer bg-transparent border-0 position-relative" style={{ zIndex: 3 }}>
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
