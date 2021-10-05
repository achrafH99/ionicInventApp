import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins, Capacitor } from '@capacitor/core';


const { Camera, Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  image: SafeResourceUrl;
  constructor() { }
  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    this.photos.unshift({
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath
    });

  }
  removeItem(value) {
    const index: number = this.photos.indexOf(value);
    this.photos.splice(index, 1);
  }
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}


