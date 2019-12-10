const createPredicate = require("./to-be-published/get-js-from-url");
const tryGetCached = require("./to-be-published/try-get-cached");
const Zone = require('zone.js');

module.exports = (options, callback) => {
  try {
    const url = options.model.angularComponent.src;
    const key = options.model.angularComponent.key;
    const props = options.model.angularComponent.props;
    const extractor = (key, context) => context.oc.angularComponents[key];
    const getJsFromUrl = createPredicate({
      key,
      url,
      extractor,
      globals: {
        Zone
      }
    });

    tryGetCached("angularComponent", key, getJsFromUrl, (err, CachedApp) => {
      if (err) return callback(err);
      try {
        console.log("render!");
        // platformBrowserDynamic().bootstrapModule(CachedApp);
        const html = options.template(
          Object.assign({}, options.model, {
            __html: CachedApp
          })
        );
        return callback(null, html);
      } catch (error) {
        return callback(error);
      }
    });
  } catch (err) {
    return callback(err);
  }
};
