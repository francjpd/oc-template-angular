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
      <oc-root-${angularRoot} data-hash="${bundleHash}" data-template="angular"></oc-root-${angularRoot}>
      \${modelHTML}
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
            function(angularComponent){
              oc.events.on('oc-${angularRoot}:ngOnInit', (event, { set }) => {
                set(\${props});
              });
              angularComponent.getInstance('${angularRoot}');
            }
          );
        });
      });
      </script>\`
  }`
};

module.exports = viewTemplate;
