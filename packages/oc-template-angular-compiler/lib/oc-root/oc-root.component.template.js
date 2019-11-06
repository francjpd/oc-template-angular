const pascalcase = require('pascalcase');

module.exports = (name, path) => ` 
import { Component, OnInit, NgZone } from '@angular/core';
import { OcService } from 'oc-angular';

@Component({
  selector: 'oc-root-${name}',
  template: '<${name}></${name}>'
})
export class OcRootComponent implements OnInit {
  title = 'oc-provider-${name}';
  params: any;

  constructor(private ocService: OcService, private _ngZone: NgZone) { }

  ngOnInit() {
    this.ocService.oc.events.on('oc-angular-init:${name}', (event: any, props: any) => {
      this._ngZone.run(() => {
        if (props != null) {
          this.ocService.oc.events.fire('oc:componentDidMount', props)
          this.ocService.setBasicData(props);
          this.ocService.context.next(props);
          this.params = props.params;
        }
      });
      this.ocService.oc.events.fire('oc-angular-created:${name}');
    });
  }

  onInitHandler(event: any, props: any) {
    if (props != null) {
      const { _staticPath, _baseUrl, _componentName, componentVersion, ...rest } = props;
      this.ocService.oc.events.fire('oc:componentDidMount', ...rest)
      this.ocService.setBasicData(props);
      this.ocService.context.next(props);
      this.params = props.params;
    }
  }
}`;
