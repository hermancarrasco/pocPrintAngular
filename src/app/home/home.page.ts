import {Component, OnInit} from '@angular/core';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    status = false;
    usbPrintDriver: UsbDriver;
    webPrintDriver: WebPrintDriver;
    ip = '';
    constructor(private printService: PrintService) {
        this.usbPrintDriver = new UsbDriver();
        this.printService.isConnected.subscribe(result => {
            this.status = result;
            if (result) {
                console.log('Connected to printer!!!');
            } else {
                console.log('Not connected to printer.');
            }
        });
    }
    ngOnInit(): void {
        this.requestUsb();
    }


    requestUsb() {
        this.usbPrintDriver.requestUsb().subscribe(result => {
            console.log('result usb:', result);
            this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
        });
    }

    connectToWebPrint() {
        this.webPrintDriver = new WebPrintDriver(this.ip);
        console.log('connect ip:', this.webPrintDriver);
        this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
    }

    print(driver: PrintDriver) {
        console.log('driver: ', driver);
        this.printService.init()
            .setBold(true)
            .setJustification('center')
            .setSize('large')
            .setUnderline(true)
            .writeLine('A01')
            .setUnderline(false)
            .setSize('large')
            .writeLine('A02')
            .setBold(false)
            .feed(4)
            .cut('full')
            .flush();
    }

}
