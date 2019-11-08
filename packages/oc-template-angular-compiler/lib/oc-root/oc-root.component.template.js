const pascalcase = require('pascalcase');

module.exports = (name, path) => ` 
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart, RoutesRecognized} from '@angular/router';
import { OcService } from 'oc-angular';
import { filter, pairwise, map, tap } from 'rxjs/operators';

@Component({
  selector: 'oc-root-${name}',
  template: '<${name}></${name}>'
})
export class OcRootComponent implements OnInit {
  title = 'oc-provider-${name}';
  previousState: string;
  params: any;

  constructor(private ocService: OcService, private _ngZone: NgZone, private router: Router) { }

  ngOnInit() {
    const rootComp = document.getElementsByTagName('oc-root-${name}')[0];
    this.router.events
    .pipe(
      filter((evt: any) => evt instanceof RoutesRecognized),
      pairwise()
      ).subscribe((events: RoutesRecognized[]) => {
        this.previousState = events[0].urlAfterRedirects
    });
    
    this.router.events
    .subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          rootComp.dispatchEvent(new HashChangeEvent('hashchange', { bubbles: true, oldURL: this.previousState, newURL: (event as NavigationEnd).urlAfterRedirects }));
          rootComp.dispatchEvent(new PopStateEvent('popstate', { bubbles: true, state: (event as NavigationEnd).urlAfterRedirects }));
        }
      });

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
