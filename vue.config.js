module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].template = "./src/app/index.html";
      return args;
    });
  },
};
