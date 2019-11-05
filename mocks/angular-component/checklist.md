1. Eliminar app module + componente.

2. Crear modulo + componente con el nombre pasado como parametro modo -- flat.
    ``` bash
    ng generate module oc-navbar --flat
    ```
3. Crear componente 

    ``` 
    ng generate component oc-navbar --flat --module=oc-navbar
    ```

4. Crear routing module
    ```
        ng generate module oc-navbar-routing --flat --module=oc-navbar
    ```

    1. Luego agregamos la ruta 
    
        ``` ts
        import { NgModule } from '@angular/core';
        import { RouterModule, Routes } from '@angular/router';
        import { OcNavbarComponent } from './oc-navbar.component';

        const routes: Routes = [
        { path: '', component: OcNavbarComponent }
        ];

        @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
        })
        export class OcNavbarRoutingModule { }
        ```

5. modificar main.ts  y agregar modulo principal a este nuevo módulo creado, ejemplo

    ``` ts
    // fichero main.ts
    import { enableProdMode } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

    import { OcNavbarModule } from './app/oc-navbar.module';
    import { environment } from './environments/environment';

    if (environment.production) {
    enableProdMode();
    }

    platformBrowserDynamic().bootstrapModule(OcNavbarModule)
    .catch(err => console.error(err));

    ```

6. Agregar propiedades OC a package.json

    ``` json
    "oc": {
        "files": {
        "data": "src/oc/server.ts",
        "template": {
            "src": "src/app/oc-navbar.module.ts",
            "type": "oc-template-angular"
        }
        },
        "parameters": {
        "name": {
            "default": "World",
            "description": "Your name",
            "example": "Jane Doe",
            "mandatory": false,
            "type": "string"
        }
        }
    }

    ```

7. Crear carpeta oc con server.ts , additionalData.ts

8. modificar index.html y agregar el nuevo elemento.

9. Tener una carpeta oc con el cotnenido de este proyecto.

10. Descargar @angular-builders/custom-webpack
    1. modificar angular.json: agregar:
    ```
    "builder": "@angular-builders/custom-webpack:browser"
    ```
    y
    ```
    "customWebpackConfig": {
        "path": "./oc-webpack.config.js"
    }
    ```





## Puntos a verificar en oc-template-angular

1. Se comento la compilacion del componente porque pensaba que seria suficiente con compilar el module.
2. Cambiar export.module de index principal para agregar la interface.


# Cosas que me he encontrado:

1. Tuve que eliminar ng-tools de este proyecto (oc-navbar) porque habian dos instancias del mismo. (el de oc-template-angular y oc-navbar).


## 