import React from 'react'
import Topbar from '../Layout/Topbar';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className='border-b border-gray-300'>
      {/* topbar */}
      <Topbar/>
      {/* navbar */}
      <Navbar/>
      {/* Crt drawer */}
    </header>
  );
}

export default Header