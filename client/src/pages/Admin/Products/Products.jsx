import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponsiveDrawer from "../../Layout/Drawer";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleEditClick = (productId) => {
    const confirmEdit = window.confirm(
      "Are you sure you want to edit this product?"
    );
    if (confirmEdit) {
      navigate(`/admin/updateproduct`, { state: { productId } });
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/products/delete/${productId}`
        );
        // Remove the deleted product from the local state
        setProducts(products.filter((product) => product._id !== productId));
        console.log("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ResponsiveDrawer>
        <button
          onClick={() => navigate("/admin/addproduct")}
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-bold text-center text-white bg-primary rounded-lg ml-auto"
        >
          Add product
        </button>

        <div className="mb-28 shadow-md rounded-lg">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 mt-4 sm:mt-6 text-sm border-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
          />

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
              All Products List
            </caption>

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b :bg-gray-800 :border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4 capitalize">{product.model}</td>
                    <td className="px-6 py-4 capitalize">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 capitalize">{product.price}</td>

                    <td className="px-6 py-4 capitalize">
                      <a
                        onClick={() => handleEditClick(product._id)}
                        className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                      >
                        <EditIcon />
                      </a>
                      <a
                        onClick={() => handleDelete(product._id)}
                        className="ml-2 font-medium text-red-600 :text-blue-500 cursor-pointer"
                      >
                        <DeleteIcon />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="w-full text-md text-gray-600 font-semibold m-10 text-center"
                  >
                    No products match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ResponsiveDrawer>
    </div>
  );
}

export default ProductList;
