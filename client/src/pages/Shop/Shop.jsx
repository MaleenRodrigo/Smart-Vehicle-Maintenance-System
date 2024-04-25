import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

function Shop() {
  const [products, setProducts] = useState([]);
  const url = 'http://localhost:8070';
  const [token, setToken] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/products`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchProducts();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
      }
    }
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="hidden xl:mt-8 xl:block">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Shop</h3>
                <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    >
                      <a href="#" className="overflow-hidden rounded">
                        <img
                          className="mx-auto h-44 w-44 dark:hidden"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                        <img
                          className="mx-auto hidden h-44 w-44 dark:block"
                          src={product.imageUrlDark}
                          alt={product.name}
                        />
                      </a>
                      <div>
                        <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                          {product.model}
                        </a>
                        <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">{product.model}</p>
                      </div>
                      <div>
                        <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                          {product.name}
                        </a>
                        <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">{product.description}</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          <span className="line-through"> ${product.price} </span>
                        </p>
                        <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">${product.discountedPrice}</p>
                      </div>
                      <div className="mt-6 flex items-center gap-2.5">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        >
                          <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          <svg
                            className="-ms-2 me-2 h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                            />
                          </svg>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Shop;
