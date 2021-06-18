const withTM = require("next-transpile-modules")(["react-konva", "konva"]);

module.exports = withTM({
  images: {
    domains: ["firebasestorage.googleapis.com", "storage.googleapis.com"],
  },
});
