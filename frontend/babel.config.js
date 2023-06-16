module.exports = function (api) {
    api.cache(true);
    const presets = [];
    const plugins = ['macros'];
  
    if (process.env["ENV"] === "prod") {
      plugins.push();
    }
  
    return {
        presets,
        plugins
      }

  }
  