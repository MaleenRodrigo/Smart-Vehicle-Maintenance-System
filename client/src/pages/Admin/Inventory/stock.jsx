import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import ResponsiveDrawer from "../../Layout/Drawer";
import jsPDF from "jspdf";


function Stock() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");

  const handleUpdateStock = async (productId) => {
    const newStockLevel = parseInt(prompt("Enter the additional stock quantity:"), 10);
    if (!isNaN(newStockLevel) && newStockLevel > 0) {
      try {
        const response = await axios.put(`http://localhost:5000/api/products/addstock/${productId}`, {
          stock: newStockLevel,
        });
        const updatedProduct = response.data.updatedProduct;
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, stock: updatedProduct.stock, date: updatedProduct.date } : product
          )
        );
        console.log("Stock updated successfully");
      } catch (error) {
        console.error("Error updating stock level:", error.message);
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

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return "Sold Out";
    } else if (stock <= 10) {
      return "Low Stock";
    } else {
      return "Available";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Low Stock":
        return "bg-yellow-400";
      case "Sold Out":
        return "bg-red-500";
      case "Available":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const formattedDate = (dateString) => {
    if (!dateString) return ""; // Handle empty dates

    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  };

    const filteredProducts = products.filter((product) => {
    const matchSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchBrand = selectedBrand === "All" || product.brand === selectedBrand;
    const matchStatus = selectedStatus === "All" || getStockStatus(product.stock) === selectedStatus;
    const matchDate = selectedDate === "All" || formattedDate(product.date) === selectedDate;

    return matchSearchTerm && matchCategory && matchBrand && matchStatus && matchDate;
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedStatus("All");
    setSelectedDate("All");
  };


  const generateReportPDF = () => {
    const doc = new jsPDF();
  
    doc.text("Inventory Report", 20, 10);
  
    let startY = 20;
    doc.setFontSize(12);
  
    // Table headers
    const headers = [
      "Name",
      "Category",
      "Brand",
      "Model",
      "Last Update",
      "Stock",
      "Status"
    ];
  
    const data = filteredProducts.map(({ name, category, brand, model, date, stock }) => [
      name,
      category,
      brand,
      model,
      formattedDate(date), // Format the date here
      stock,
      getStockStatus(stock)
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
        0: { cellWidth: 45 },  // Name
        1: { cellWidth: 40 },  // Category
        2: { cellWidth: 20 },  // Brand
        3: { cellWidth: 20 },  // Model
        4: { cellWidth: 25 },  // Last Update
        5: { cellWidth: 14 },  // Stock
        6: { cellWidth: 20 }   // Status
      }
    });
  
    doc.save("inventory_report.pdf");
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

          <div className="flex items-center mb-2 space-x-4">
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

            <select value={selectedStatus} onChange={handleStatusChange} className="border border-gray-300 rounded-md p-2">
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Sold Out">Sold Out</option>
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-md pl-3 pr-3"
            />

            <button onClick={clearFilters} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold  px-3 rounded">
              Clear Filters
            </button>

            

          </div>
          <button
            onClick={generateReportPDF}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Download Report
          </button>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
              Inventory
            </caption>

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 ">
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
                <th scope="col" className="px-6 py-3 text-center">
                  Last Update
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Units
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="bg-white border-b :bg-gray-800 :border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4 capitalize">{product.model}</td>
                    <td className="px-6 py-4 capitalize text-center">
                      {product.date ? new Date(product.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).replace(/\//g, "/") : "-"}
                    </td>
                    <td className="px-6 py-4 text-center">{product.stock}</td>

                    <td className="px-3 py-4 text-center">
                      <span className={`uppercase font-semibold text-[12px] px-3 py-1.5 rounded ${getStatusColor(getStockStatus(product.stock))}`}>
                      {getStockStatus(product.stock)}
                      </span>
                    </td>

                    <td className="px-6 py-4 capitalize text-center">
                      <a
                        onClick={() => handleUpdateStock(product._id)}
                        className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                      >
                        <EditIcon />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
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

export default Stock;
