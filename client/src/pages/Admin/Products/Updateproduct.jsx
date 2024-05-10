import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import ResponsiveDrawer from "../../Layout/Drawer";

function UpdateProduct() {
  const location = useLocation();
  const productID = location.state?.productId;
  const { productId } = useParams(); // Get the product ID from the URL
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    brand: "",
    model: "",
    description: "",
    price: "",
    stock: "",
  });

  // Fetch product details based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/get/${productID}`
        );
        setUpdateProduct(response.data.product); // Set product data in the state
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]); // Fetch product data on component mount and when ID changes

  // Handle input changes
  const handleChange = (e) => {
    setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/update/${productID}`,
        updateProduct
      );
      console.log(response.data); // Log the response after updating product
      window.alert("Product Updated Successfull");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <div>
      <ResponsiveDrawer>
        <section className="bg-white light:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 light:text-light">
              Update Product
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-light"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={updateProduct.name}
                    onChange={handleChange}
                    className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                    placeholder="Type product name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-light"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={updateProduct.brand}
                    onChange={handleChange}
                    className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                    placeholder="Enter product brand"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="model"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-light"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    id="model"
                    value={updateProduct.model}
                    onChange={handleChange}
                    className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                    placeholder="Enter product model"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-light"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={updateProduct.price}
                    onChange={handleChange}
                    className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                    placeholder="Enter product price"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="stock"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-light"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={updateProduct.stock}
                    onChange={handleChange}
                    className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                    placeholder="Enter product stock"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-light"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="8"
                    value={updateProduct.description}
                    onChange={handleChange}
                    className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                    placeholder="Enter product description"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-bold text-center text-white bg-primary rounded-lg"
              >
                Update Product
              </button>
            </form>
          </div>
        </section>
      </ResponsiveDrawer>
    </div>
  );
}

export default UpdateProduct;
