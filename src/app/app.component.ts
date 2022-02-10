import { Component } from '@angular/core';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private renderer: Renderer2;

    authenticatedTemplate = false;

    constructor(private rendererFactory: RendererFactory2, private router: Router) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
        this.routerSubscription();
    }

    routerSubscription() {
        this.router.events.subscribe(async (event) => {
            if (event instanceof NavigationEnd) {
                if (event.urlAfterRedirects.toLowerCase() === '/members') {
                    this.authenticatedTemplate = true;
                } else {
                    this.authenticatedTemplate = false;
                }
            }
        });
    }
}
