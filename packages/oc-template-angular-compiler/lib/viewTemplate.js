const viewTemplate = ({
  angularRoot,
  css,
  externals,
  bundleHash,
  bundleName
}) => `function(model){
  var modelHTML =  model.__html ? model.__html : '';
  var staticPath = model.angularComponent.props._staticPath;
  var props = JSON.stringify(model.angularComponent.props);
  return '<div id="${angularRoot}" class="${angularRoot}">' + modelHTML + '</div>' +
    '${css ? "<style>" + css + "</style>" : ""}' +
    '<script>' +
    'window.oc = window.oc || {};' +
    'oc.cmd = oc.cmd || [];' +
    'oc.cmd.push(function(oc){' +
    '${css ? "oc.events.fire(\\'oc:cssDidMount\\', \\'" + css + "\\');" : ""}' +
      'oc.requireSeries(${JSON.stringify(externals)}, function(){' +
        'oc.require(' +
          '["oc", "angularComponents", "${bundleHash}"],' + 
          '"' + staticPath + '${bundleName}.js",' +
          'function(ReactComponent){' +
            'var targetNode = document.getElementById("${angularRoot}");' +
            'targetNode.setAttribute("id","");' +
            'Wont render properly'
          '}' +
        ');' +
      '});' +
    '});' +
  '</script>'
}`;

module.exports = viewTemplate;
