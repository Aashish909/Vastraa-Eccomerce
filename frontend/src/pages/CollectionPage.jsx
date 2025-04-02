import React, { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  // const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClickOutside = (e) => {
    //close sidebar if clickd outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target))
      setIsSidebarOpen(false);
  };
  useEffect(() => {
    //add event listener for click outside sidebar
    document.addEventListener("mousedown", handleClickOutside);
    //clean event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchedProducts = [
  //       {
  //         _id: 1,
  //         name: "Product 1",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=3" }],
  //       },
  //       {
  //         _id: 2,
  //         name: "Product 1",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=4" }],
  //       },
  //       {
  //         _id: 3,
  //         name: "Product 1",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=4" }],
  //       },
  //       {
  //         _id: 4,
  //         name: "Product 1",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=5" }],
  //       },
  //     ];
  //     setProducts(fetchedProducts);
  //   }, 1000);
  // }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* MObile filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* Filter sideBar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0  z-50 left-0 w-64 bg-white overflow-y-auto transition-transform  duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4 ">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* Sort Options */}
        <SortOptions />
        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
