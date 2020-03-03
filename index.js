var properties = require("properties");
var iconv = require('iconv-lite');

/**
 * A webpack loader that allows the loading of `.properties` file.
 * Creates a JS object of the properties. See the `properties` module
 * on npm: https://www.npmjs.com/package/properties
 */
module.exports = function (content) {
  this.cacheable();

  content = iconv.decode(content, this.query.readEncoding || 'latin1')

  var callback = this.async();
  properties.parse(content, this.query, function (err, result) {
    if (err) {
      return callback(err);
    }
    return callback(null, "module.exports = " + JSON.stringify(result, null, 2));
  });
};

module.exports.raw = true
