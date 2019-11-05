const pascalcase = require('pascalcase');

module.exports = (name, path) => `
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'oc-root-${name}',
  template: '<${name}></${name}>'
})
export class OcRootComponent implements OnInit {
  title = 'oc-provider-${name}';

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