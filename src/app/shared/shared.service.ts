import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    constructor(private titleService: Title) {

    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
