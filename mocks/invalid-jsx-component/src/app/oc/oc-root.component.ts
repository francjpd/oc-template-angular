
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'oc-root-angular-component',
  template: '<angular-component></angular-component>'
})
export class OcRootComponent implements OnInit {
  title = 'oc-provider-angular-component';

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
