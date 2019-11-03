const viewTemplate = ({
  angularRoot,
  css,
  externals,
  bundleHash,
  bundleName
}) => {
  const cssStyleTag = css ? `<style> ${css} </style>` : '';
  const cssEvent = css ? `oc.events.fire('oc: cssDidMount','${css}');` : '';
  return `function (model) {
    var modelHTML = model.__html ? model.__html : '';
    var staticPath = model.angularComponent.props._staticPath;
    var props = JSON.stringify(model.angularComponent.props);
    return \`
    <base href="/">
    <div id="${angularRoot}" class="${angularRoot}">
      <oc-provider></oc-provider>
      \${modelHTML}
    </div> 
      ${cssStyleTag}
      <script>
        window.oc = window.oc || {};
        oc.cmd = oc.cmd || [];
        oc.cmd.push(function(oc){
          ${cssEvent}
          oc.requireSeries(${JSON.stringify(externals)}, function(){
            oc.require(
            ["oc", "angularComponents", "${bundleHash}"],
            "\${staticPath}${bundleName}.js",
            function(AngularComponent){
              var targetNode = document.getElementById("${angularRoot}");
              targetNode.setAttribute("id","");
            }
          );
        });
      });
      </script>\`
  }`
};

module.exports = viewTemplate;
