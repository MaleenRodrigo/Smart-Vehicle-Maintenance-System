const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const downloadPDF = (elementId, fileName) => {
  const input = document.getElementById(elementId);

  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save(fileName + ".pdf");
    })
    .catch((err) => {
      console.error("Error generating PDF:", err);
      // Handle errors gracefully, e.g., display an error message to the user
    });
};

export default downloadPDF;
