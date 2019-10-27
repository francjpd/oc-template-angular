const pascalcase = require('pascalcase');

module.exports = (name, path) => `
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
// import { ${pascalcase(name)} } from '${path}';

@Component({
  selector: 'oc-provider',
  template: '<${name}/>'
})
export class OcProvider implements OnInit {
  title = 'oc-provider';
  
  @Input() _staticPath: string;
  @Input() _baseUrl: string;
  @Input() _componentName : string;
  @Input() _componentVersion: string;

  ngOnInit() {
    (window as any).oc.events.fire('oc:componentDidMount');
  }

  isSelected({ route }:any) {
    if ((window as any).location.pathname === route) {
      return true;
    }
    return false;
  }
}
`;