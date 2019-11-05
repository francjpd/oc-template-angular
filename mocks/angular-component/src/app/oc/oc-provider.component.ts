
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
// import { OcNavbar } from 'C:\Users\n225273\projects\oc-template-angular\mocks\angular-component';

@Component({
  selector: 'oc-provider-oc-navbar',
  template: '<oc-navbar></oc-navbar>'
})
export class OcProviderComponent implements OnInit {
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
