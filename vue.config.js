// setup env vars
require("dotenv").config();

const PORT = process.env.PORT || 3000;

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end();
  },
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:" + PORT
      }
    }
  }
};