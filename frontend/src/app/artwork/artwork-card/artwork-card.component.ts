import {Component, Input, OnInit} from '@angular/core';
import {Artwork, DisplayMode} from '../../models';

@Component({
    selector: 'app-artwork-card',
    templateUrl: './artwork-card.component.html',
    styleUrls: ['./artwork-card.component.scss']
})
export class ArtworkCardComponent implements OnInit {
    @Input() artwork: Artwork;
    @Input() displayMode: DisplayMode;
    DisplayMode = DisplayMode;

    defaultImage = '/assets/logo.png';

    constructor() {
    }

    ngOnInit(): void {
    }

    imageError($event: ErrorEvent): void {
        // @ts-ignore
        if ($event.target.src !== this.defaultImage) {
            // @ts-ignore
            $event.target.src = this.defaultImage;
            // @ts-ignore
            $event.target.style['object-fit'] = 'none';
        }
    }
}
