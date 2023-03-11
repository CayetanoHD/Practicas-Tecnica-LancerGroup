import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class RuntimePlatformHelper {
  
  constructor(private readonly platform: Platform) {
  }

  public getPlatforms(): string[] {
    return this.platform.platforms();
  }

  public isWebPlatform(): boolean {
    return this.platform.is("mobileweb") || !this.isNativePlatform() || (this.getPlatformName() === "web");
  }

  public isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  }

  public getPlatformName(): string {
    return Capacitor.getPlatform();
  }

  public is(platform: "ios" | "ipad" | "iphone" | "android" | "phablet" | "tablet" | "cordova" | "capacitor" | "electron" | "pwa" | "mobile" | "mobileweb" | "desktop" | "hybrid"): boolean {
    return this.platform.is(platform);
  }

}