import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponsiveDrawer from "../../Layout/Drawer";
import jsPDF from "jspdf";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
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

  const filteredProducts = products.filter((product) => {
    const matchSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchPriceRange =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Under Rs.5000" && product.price < 5000) ||
      (selectedPriceRange === "Rs.5000 - Rs.10000" && product.price >= 5000 && product.price <= 10000) ||
      (selectedPriceRange === "Over Rs.10000" && product.price > 10000);

    return matchSearchTerm && matchCategory && matchBrand && matchPriceRange;
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };


  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedPriceRange("All");
  };

  const generateReportPDF = () => {
    const doc = new jsPDF();
  
    doc.text("Product Report", 20, 10);
  
    let startY = 20;
    doc.setFontSize(12);
  
    // Table headers
    const headers = [
      "Name",
      "Category",
      "Brand",
      "Model",
      "Description",
      "Price",
    ];
  
    const data = filteredProducts.map(({ name, category, brand, model, description, price }) => [
      name,
      category,
      brand,
      model,
      description,
      price,
    ]);
  
    doc.autoTable({
      startY,
      head: [headers],
      body: data,
      theme: 'grid',
      styles: {
        fontSize: 10,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { cellWidth: 40 },  // Name
        1: { cellWidth: 40 },  // Category
        2: { cellWidth: 20 },  // Brand
        3: { cellWidth: 20 },  // Model
        4: { cellWidth: 40 },  // description
        5: { cellWidth: 18 },  // price
      }
    });
  
    doc.save("product_report.pdf");
  };

  return (
    <div>
      <ResponsiveDrawer>
        

        <div className="mb-28 shadow-md rounded-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="flex items-center mb-4 space-x-4">
            <select value={selectedCategory} onChange={handleCategoryChange} className="border border-gray-300 rounded-md p-2">
              <option value="All">All Categories</option>
              <option value="Engine Components">Engine Components</option>
              <option value="Transmission and Drivetrain Parts">Transmission and Drivetrain Parts</option>
              <option value="Suspension and Steering Components">Suspension and Steering Components</option>
              <option value="Braking System Parts">Braking System Parts</option>
              <option value="Electrical Components">Electrical Components</option>
              <option value="Exhaust System Parts">Exhaust System Parts</option>
              <option value="Body and Exterior Parts">Body and Exterior Parts</option>
              <option value="Interior Components">Interior Components</option>
              <option value="Fluids and Lubricants">Fluids and Lubricants</option>
            </select>

            <select value={selectedBrand} onChange={handleBrandChange} className="border border-gray-300 rounded-md p-2">
              <option value="All">All Brands</option>
              <option value="Toyota">Toyota</option>
              <option value="Mazda">Mazda</option>
              <option value="Mitsubishi">Mitsubishi</option>
              <option value="Nissan">Nissan</option>
            </select>

            <select value={selectedPriceRange} onChange={handlePriceRangeChange} className="border border-gray-300 rounded-md p-2">
              <option value="All">All Prices</option>
              <option value="Under Rs.5000">Under Rs.5000</option>
              <option value="Rs.5000 - Rs.10000">Rs.5000 - Rs.10000</option>
              <option value="Over Rs.10000">Over Rs.10000</option>
            </select>
            <button onClick={clearFilters} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold  px-3 rounded">
              Clear Filters
            </button>
          </div>
          <button
            onClick={generateReportPDF}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4">
            Download Report
          </button>
          <button
          onClick={() => navigate("/admin/addproduct")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
        >
          Add product
        </button>

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
                  Category
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
                    <td className="px-6 py-4">{product.category}</td>
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
                    colSpan="7"
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
