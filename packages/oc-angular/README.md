# OcAngular 

[Access to the ES version of the Readme](./README-ES.md)

Entities required by Angular to make both the communication and compatibility with OC possible.

## Modules

### OcModule

Module responsible for exporting the `OcPatchRouteComponent` and the service` OcService`.

### OcService

Service in charge of:

- Expose the OC instance.
- Offer a series of basic methods that the `OcRootComponent` will use when initializing the microfront.
- Save the data through a ** BehaviorSubject ** the arguments that were previously defined in the `package.json` of the microservice, in this way, the microfront can subscribe to it and carry out any logic it desires .

## Components:

### OcPatchRouteComponent
Due to the way the Angular Router works, it is necessary to create an empty component with the path `**`, as the last element of routes, for example:

`` 'ts
// Microfront my-app-based-on-angular
import {OcPatchRouteComponent} from 'oc-angular';


const routes: Routes = [
    {path: 'cards', component: CardViewComponent},
    {path: 'mortgage', component: MortgageViewComponent},
    {path: '**', component: OcPatchRouteComponent},
];

`` ''

Otherwise, the microfront would not work properly.