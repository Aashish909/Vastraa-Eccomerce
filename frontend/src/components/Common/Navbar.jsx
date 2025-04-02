import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDraweropen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDraweropen);
  };

  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      {/* Navbar Container */}
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-15 lg:px-15">
        {/* Left Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Vastraa
          </Link>
        </div>

        {/* Center Navigation Links (Desktop Only) */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Topwear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottomwear
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar (Only Visible on Desktop) */}
          <div className="hidden md:block overflow-hidden">
            <SearchBar />
          </div>

          {/* Cart Icon with Badge */}
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black"
            aria-label="View Cart"
          >
            <HiOutlineShoppingCart className="h-6 w-6 text-gray-700 cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <Link to="/profile" className="hover:text-black" aria-label="Profile">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black px-2 rounded text-sm text-white"
            >
              Admin
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden"
            onClick={toggleNavDrawer}
            aria-label="Toggle Menu"
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDraweropen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleNavDrawer}
            aria-label="Close Menu"
            className="transition-transform hover:rotate-90"
          >
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Topwear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottomwear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
