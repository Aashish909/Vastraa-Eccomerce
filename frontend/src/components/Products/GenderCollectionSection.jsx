import React from "react";
import mensCollectionsImage from "../../assets/mens-collection.webp";
import womensCollectionsImage from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-10">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        {[
          {
            img: womensCollectionsImage,
            alt: "womensCollectionsImage",
            title: "Women's Collection",
            link: "/collections/all?gender=Women",
          },
          {
            img: mensCollectionsImage,
            alt: "mensCollectionsImage",
            title: "Men's Collection",
            link: "/collections/all?gender=Men",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="relative flex-1 group overflow-hidden rounded-xl"
          >
            <img
              src={item.img}
              alt={item.alt}
              className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500 "></div>
            <div className="absolute bottom-8 left-8 bg-white/90 p-6 rounded-lg shadow-lg transition-transform duration-500 group-hover:translate-y-[-10px]">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {item.title}
              </h2>
              <Link
                to={item.link}
                className="bg-gray-900 text-white px-1 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenderCollectionSection;
