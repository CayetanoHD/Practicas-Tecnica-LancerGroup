import { Injectable } from "@angular/core";
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
    providedIn: 'root'
  })
  export class GeoLocationHelper {
    constructor() {}

    printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        return coordinates;
      };
  }  