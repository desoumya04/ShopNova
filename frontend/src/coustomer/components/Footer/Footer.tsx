import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6 tracking-wide">ShopNova</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for the latest trends in fashion, electronics, and daily essentials. Discover premium quality at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FacebookIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <TwitterIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <InstagramIcon />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/products/all" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Shop All
                </Link>
              </li>
              <li>
                <Link to="/electronics" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Electronics
                </Link>
              </li>
              <li>
                <Link to="/fashion" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Fashion
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Customer Care</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/account" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> My Account
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Track Order
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Stay Connected</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive offers, updates, and more.
            </p>
            <form className="flex flex-col space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EmailIcon className="text-gray-500" fontSize="small" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShopNova. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/seller/login" className="text-gray-500 hover:text-white transition-colors">Become a Seller</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
