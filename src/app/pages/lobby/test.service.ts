import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    async loadBinaryImage(path:string): Promise<string> {
        const response = await fetch(path);
        const blob = await response.blob();

        return  await this.arrayBufferToDataURL(await blob.arrayBuffer());
    }
    async arrayBufferToDataURL(arrayBuffer: ArrayBuffer) {
        const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        return `data:image/jpeg;base64,${base64String}`;
    }
}