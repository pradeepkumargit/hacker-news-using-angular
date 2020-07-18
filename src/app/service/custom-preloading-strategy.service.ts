
import { Injectable } from '@angular/core';
import { Observable, of, timer  } from 'rxjs';
import { flatMap } from 'rxjs/operators'

import { PreloadingStrategy, Route } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class CustomPreloadingStrategy implements PreloadingStrategy {

    preloadedModules: string[] = [];

    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (route.data && route.data['preload']) {
            // add the route path to the preloaded module array
            this.preloadedModules.push(route.path);

            // log the route path to the console
            console.log('Preloaded: ' + route.path);

            return load();
        } else {
            return of(null);
        }
    }
}
