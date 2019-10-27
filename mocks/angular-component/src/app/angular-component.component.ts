import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import { assetUrl } from './src/oc/asset-url';

@Component({
  selector: 'angular-component',
  styleUrls: ['./angular-component.component.css']
})
export class AngularComponent implements OnInit, OnDestroy {
  subscription: Subscription = null;
  title = 'oc-navbar';

  // ngLogo = assetUrl('images/logo.svg');
  routes = [
    {
      route: '/You must ',
      label: 'Posición Global'
    },
    {
      route: '/Provide',
      label: 'Cuentas y tarjetas'
    },
    {
      route: '/a  valid Path',
      label: 'Financiación'
    }
  ];

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isSelected({ route }:any) {
    if (window.location.pathname === route) {
      return true;
    }
    return false;
  }
}
