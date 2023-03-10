import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageHelper {
  constructor() {}

  async setStorageKey(key: string, value: any): Promise<void> {
    console.debug('Storage', `Writing key ${key}`);
    const valueString = JSON.stringify(value);
    await Preferences.set({
      key: key,
      value: valueString,
    });
    console.debug('Storage', `The key ${key} was written.`);
  }

  async clear(): Promise<void> {
    console.debug('Storage', `Clearing storage.`);
    await Preferences.clear();
    console.debug('Storage', `Storage cleared.`);
  }

  async removeStorageKey(key: string): Promise<void> {
    console.debug('Storage', `Removing key ${key}`);
    await Preferences.remove({ key: key });
    console.debug('Storage', `The key ${key} was removed.`);
  }

  async getStorageKey<T>(key: string): Promise<any> {
    if (key != null) {
      console.debug('Storage', `Looking for key ${key}`);
      const data = await Preferences.get({ key: key });
      if (data != null) {
        console.debug('Storage', `Key ${key} found.`);
        return JSON.parse(data.value as any) ;
      }
      console.debug('Storage', `Key ${key} not found.`);
    }
    return null;
  }
  
}
