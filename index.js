var properties = require("properties");

/**
 * A webpack loader that allows the loading of `.properties` file.
 * Creates a JS object of the properties. See the `properties` module
 * on npm: https://www.npmjs.com/package/properties
 */
module.exports = function (content) {
  this.cacheable();

  var callback = this.async();
  properties.parse(content, this.query, function (err, result) {
    if (err) {
      return callback(err);
    }
    return callback(null, "module.exports = " + JSON.stringify(result, null, 2));
  });
};
