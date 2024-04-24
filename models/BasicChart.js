const mongoose = require("mongoose");

const BasicChartSchema = new mongoose.Schema({
  coordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  chartType: { type: String, required: true },
  chartName: { type: String, required: true },
  creatorName: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  lastchange: {
    timestamps: true,
  },
});

module.exports = mongoose.model("BasicChart", BasicChartSchema);
