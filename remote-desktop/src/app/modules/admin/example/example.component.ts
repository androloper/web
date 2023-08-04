import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit, OnDestroy {
    @ViewChild('vncContainer', {static: true}) vncContainer!: ElementRef;

    private rfb: any;

    ngOnInit() {
        // Replace 'your-vnc-server-url' with the URL of your VNC server
        this.rfb = new RFB(this.vncContainer.nativeElement, 'wss://your-vnc-server-url:port');

        this.rfb.addEventListener('connect', () => {
            console.log('VNC connected!');
        });

        this.rfb.addEventListener('disconnect', () => {
            console.log('VNC disconnected!');
        });

        this.rfb.connect();
    }

    ngOnDestroy() {
        if (this.rfb) {
            this.rfb.disconnect();
        }
    }
}
