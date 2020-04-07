const Handlebars = require("handlebars");
module.exports = (() => Handlebars.compile(`import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Event, NavigationEnd, RoutesRecognized } from '@angular/router';
import { OcService } from 'oc-angular';
import { filter, pairwise} from 'rxjs/operators';

@Component({
  selector: 'oc-root-{{name}}',
  template: '<{{name}}></{{name}}>'
})
export class OcRootComponent implements OnInit {
  title = 'oc-provider-{{name}}';
  previousState!: string;
  params = {};
  setParams = () => ({
    set: (value:any) => {
      this.ngZoneInstance.run(() => {
        this.ocService.setBasicData(value);
        this.ocService.context.next(value);
        this.params = value;
      });
    },
  })

  constructor(private ocService: OcService, private ngZoneInstance: NgZone, private router: Router) { }

  ngOnInit() {
    const rootComp = document.getElementsByTagName('oc-root-{{name}}')[0];
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      ).subscribe((events: RoutesRecognized[]) => {
        this.previousState = events[0].urlAfterRedirects;
      });

    this.router.events
      .subscribe(
        (event: Event) => {
          if (event instanceof NavigationEnd) {
            rootComp.dispatchEvent(new HashChangeEvent('hashchange', {
              bubbles: true,
              oldURL: this.previousState,
              newURL: (event as NavigationEnd).urlAfterRedirects
            }));
            rootComp.dispatchEvent(new PopStateEvent('popstate', { bubbles: true, state: (event as NavigationEnd).urlAfterRedirects }));
          }
        });
    this.ocService.oc.events.fire('oc-{{name}}:ngOnInit', this.setParams());
  }
}
`))();
