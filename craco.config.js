module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  eslint: {
    mode: require("@craco/craco").ESLINT_MODES.file,
  },
};
