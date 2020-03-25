# OcAngular

Entidades necesarias por Angular para hacer posible la comunicación  y compatibilidad con OC.

## Modulos

### OcModule 

Modulo encargado de exportar  el `OcPatchRouteComponent` y el servicio `OcService`.

### OcService

Servicio encargado de:

- Exponer la instancia OC.
- Ofrecer una serie de metodos basicos que usará el `OcRootComponent` al momento de inicializar el microfront.
- Guardar mediante un **BehaviorSubject** los argumentos que fueron previamente definidos en el `package.json` del microservicio, de esta manera, el microfront pueda suscribirse al mismo y realizar la lógica que desee. 

## Componentes:

### OcPatchRouteComponent
Debido a la manera en cómo funciona el Router de Angular, es necesario crear un componente vacío con el path `**`, como último elemento de rutas, es decir:

``` ts
// Microfront my-app-based-on-angular
import { OcPatchRouteComponent } from 'oc-angular';


const routes: Routes = [
    { path: 'cards', component: CardViewComponent },
    { path: 'mortgage', component: MortgageViewComponent },
    { path: '**', component: OcPatchRouteComponent },
];

```

De lo contrario, el microfront no funcionaría correctamente.

