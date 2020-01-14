jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

const path = require('path');
const fs = require('fs-extra');
const compileView = require('../lib/compileView.js');

jest.mock('child_process');
const childProcessMock = require('child_process');

describe('Compile view ', () => {
  jest.useFakeTimers();
  const componentPath = path.join(__dirname, '../../../mocks/angular-component');
  const publishPath = path.join(componentPath, '_packageCompileViewTest');
  const publishFileName = 'template.js';

  const options = {
    componentPackage: fs.readJsonSync(`${componentPath}/package.json`),
    componentPath,
    publishPath,
    publishFileName,
    production: true
  };

  it('Should be a valid compilation', () => {
    compileView(options, (err, compiledViewInfo) => {
      compiledViewInfo.bundle.hashKey = 'dummyData';
      const viewHashKey = compiledViewInfo.template.hashKey;
      compiledViewInfo.template.hashKey = 'dummyData';
      expect(compiledViewInfo).toMatchSnapshot();
      expect(
        fs
          .readFileSync(path.join(publishPath, publishFileName), 'UTF8')
          .replace(viewHashKey, 'dummyData')
          .replace(
            /\[\'oc\',.*?\'angularComponents\',.*?\'.*?\'\]/g,
            '["oc", "angularComponents", "dummyContent"]'
          )
      ).toMatchSnapshot();
      fs.removeSync(publishPath);
    });
  });
  

  it('Should handle invaild Ng compilation properly', () => {
    childProcessMock.setInvalidCompilation();
    compileView(options, (err) => {
      expect(err).toContain('Angular compilation failed');
    });
  });

  afterEach(() => {
    childProcessMock.setValidCompilation();
  })
});
