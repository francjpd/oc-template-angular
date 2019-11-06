const removeTsExtension = path => path.replace(/\.ts?$/, "");

const higherOrderServerTemplate = ({
  serverPath,
  contextPath,
  bundleHashKey,
  componentName,
  componentVersion
}) => `
import { data as dataProvider } from '${removeTsExtension(serverPath)}';
import { Context } from '${removeTsExtension(contextPath)}';

export const data = (context : Context, callback : (error: any, data?: any) => void) => {
  dataProvider(context, (error: any, model: any) => {
    if (error) {
      return callback(error);
    }
    const props = Object.assign({}, model, {
      _params: model,
      _staticPath: context.staticPath,
      _baseUrl: context.baseUrl,
      _componentName: "${componentName}",
      _componentVersion: "${componentVersion}"
    });
    const srcPathHasProtocol = context.staticPath.indexOf("http") === 0;
    const srcPath = srcPathHasProtocol ? context.staticPath : ("https:" + context.staticPath);
    return callback(null, Object.assign({}, {
      angularComponent: {
        key: "${bundleHashKey}",
        src: srcPath + "angular-component.js",
        props
      }
    }));
  });
}
`;

module.exports = higherOrderServerTemplate;
