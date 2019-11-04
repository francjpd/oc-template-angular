
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
// import { AngularComponent } from 'C:\Users\n225273\projects\oc-template-angular\mocks\invalid-jsx-component';

@Component({
  selector: 'oc-provider',
  template: '<angular-component></angular-component>'
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
