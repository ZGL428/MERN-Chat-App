// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"), // so "@/components/..." means "src/components/..."
    },
  },
};
