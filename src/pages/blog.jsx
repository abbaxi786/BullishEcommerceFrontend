import React from "react";
import {
  FaBlog,
  FaRegCalendarAlt,
  FaUser,
} from "react-icons/fa";

export default function BlogPage() {

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
        "https://plus.unsplash.com/premium_photo-1658506787944-7939ed84aaf8?w=1200",
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
        "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=1200",
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
        "https://images.unsplash.com/photo-1566070143658-523a24797109?w=1200",
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
        "https://images.unsplash.com/photo-1705248382836-3618e25706d0?w=1200",
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
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200",
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
        "https://plus.unsplash.com/premium_photo-1675202428354-31b4d814df9d?w=1200",
      description:
        "Master the art of color coordination in men's fashion to create balanced and stylish outfits effortlessly.",
      content:
        "Color coordination is one of the most important aspects of fashion. Understanding complementary and neutral colors helps in creating visually appealing outfits. For example, pairing navy with white gives a clean look, while black with grey creates a strong formal appearance. Avoid using too many bold colors together. Instead, balance one strong color with neutral tones for a professional and stylish outfit."
    }
  ];

  return (
    <div className="bg-light">

      {/* HERO SECTION */}
      <div
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          height: "60vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            top: 0,
            left: 0,
          }}
        />

        {/* HERO CONTENT */}
        <div style={{ zIndex: 2 }}>
          <FaBlog size={50} className="text-warning mb-3" />

          <h1 className="display-3 fw-bold">
            Fashion & Style Blog
          </h1>

          <p className="fs-5 text-light">
            Latest fashion trends, styling guides and outfit inspiration
          </p>
        </div>
      </div>

      {/* BLOG POSTS */}
      <div className="container py-5">

        {posts.map((post, index) => (
          <div
            key={post.id}
            className="row align-items-center bg-white shadow-sm rounded-4 overflow-hidden mb-5"
          >

            {/* IMAGE */}
            <div
              className={`col-lg-6 p-0 ${
                index % 2 !== 0 ? "order-lg-2" : ""
              }`}
            >
              <img
                src={post.image}
                alt={post.title}
                className="img-fluid w-100"
                style={{
                  height: "550px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* CONTENT */}
            <div className="col-lg-6 p-4 p-lg-5">

              {/* CATEGORY */}
              <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                {post.category}
              </span>

              {/* TITLE */}
              <h1 className="fw-bold mb-4">
                {post.title}
              </h1>

              {/* META */}
              <div className="d-flex flex-wrap gap-4 text-muted mb-4">

                <span>
                  <FaUser className="text-warning me-2" />
                  {post.author}
                </span>

                <span>
                  <FaRegCalendarAlt className="text-warning me-2" />
                  {post.date}
                </span>

                <span>
                  {post.readingTime}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p
                className="lead text-secondary mb-4"
                style={{
                  lineHeight: "2",
                }}
              >
                {post.description}
              </p>

              {/* CONTENT */}
              <div
                style={{
                  lineHeight: "2.1",
                  color: "#444",
                  fontSize: "1.05rem",
                }}
              >
                {post.content}
              </div>

              {/* TAGS */}
              <div className="mt-4 d-flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="badge bg-dark px-3 py-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}