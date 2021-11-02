module.exports = (phase, { defaultConfig }) => {
  return {
    images: {
      domains: ["firebasestorage.googleapis.com", "storage.googleapis.com"],
    },
    experimental: {
      esmExternals: false,
    },
  };
};
