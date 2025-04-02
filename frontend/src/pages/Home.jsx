import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
// const placeholderProducts =  [
//   {
//     _id: 1,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=3" }],
//   },
//   {
//     _id: 2,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=4" }],
//   },
//   {
//     _id: 3,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=4" }],
//   },
//   {
//     _id: 4,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=5" }],
//   },
// ];



const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  // Fetch products for a specific collection
  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
  }, [dispatch]); // Runs only when `dispatch` changes
  // Fetch best seller product
  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      }
    };

    fetchBestSeller();
  }, []); // Runs only once on mount

  // useEffect(()=>{
  //   //Fetch products for a specific collection
  //   dispatch(fetchProductsByFilters({
  //     gender:"Women",
  //     category: "Bottom Wear",
  //     limit: 8,
  //   }))
  //   //Fetch best seller product
  //   const fetchBestSeller =async ()=>{
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
  //       setBestSellerProduct(response.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchBestSeller()
  // },[dispatch])
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p>Loading best seller product...</p>
      )}

      <div className="container mx-auto px-5">
        <h2 className="text-3xl text-center font-bold mb-4 ">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
}

export default Home