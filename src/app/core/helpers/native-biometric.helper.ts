import { Injectable } from '@angular/core';
import { NativeBiometric, AvailableResult, Credentials, BiometryType } from "capacitor-native-biometric";
import { KeychainTouchId } from '@ionic-native/keychain-touch-id/ngx';

@Injectable({
    providedIn: 'root'
})
export class NativeBiometricHelper {
    constructor(private readonly keychainTouchId: KeychainTouchId) { }

    async isAvailable(): Promise<AvailableResult> {
        try {
            const result = await NativeBiometric.isAvailable();
            console.debug('NativeBiometric.isAvailable result: ', result);
            return result;
        }
        catch (err) {
            return new Promise<AvailableResult>((resolve, rejects) => {
                resolve({
                    isAvailable: false,
                    biometryType: BiometryType.NONE,
                    errorCode: 0,
                })
            })
        }
    }

    async isTouchAvailable(): Promise<boolean> {
        const biomAvail = await this.isAvailable();
        return biomAvail.isAvailable && (
            biomAvail.biometryType === BiometryType.FACE_ID ||
            biomAvail.biometryType === BiometryType.FACE_AUTHENTICATION ||
            biomAvail.biometryType === BiometryType.FINGERPRINT ||
            biomAvail.biometryType === BiometryType.TOUCH_ID ||
            biomAvail.biometryType === BiometryType.MULTIPLE
        );
    }

    async hasFaceRecognition(): Promise<boolean> {
        const biomAvail = await this.isAvailable();
        return biomAvail.isAvailable && (
            biomAvail.biometryType === BiometryType.FACE_ID ||
            biomAvail.biometryType === BiometryType.FACE_AUTHENTICATION
        );
    }

    async setCredentials(pin: string, key: string, username: string): Promise<any> {
        return await NativeBiometric.setCredentials({
            username: username,
            password: pin,
            server: key,
        });
    }

    async getCredentials(key: string): Promise<Credentials> {
        return await NativeBiometric.getCredentials({
            server: key,
        });
    }

    async has(key: string): Promise<boolean> {
        try {
            const result: Credentials = await NativeBiometric.getCredentials({ server: key });
            return result?.username != null || result?.password != null;
        } catch (err) {
            console.warn('NativeBiometric getCredentials error: ', err);
        }
        return false;
    }

    async verifyIdentity(usage: any = { title: undefined, reason: undefined, description: undefined }): Promise<any> {
        return await NativeBiometric.verifyIdentity({
            title: usage?.title || "APAP Autenticación Biométrica",
            reason: usage?.reason || "Autorizar transacciones en este dispositivo",
            description: usage?.description || "Tu acceso biométrico podrá ser utilizado para autorizar transacciones en este dispositivo",
        });
    }

    async deleteCredentials(serverKey: string): Promise<any> {
        try {
            await this.keychainTouchId.delete(serverKey);
            console.info('PIN MFA eliminado de almacenamiento biometrico anterior');
        } catch (err) {
            console.warn('Falla eliminando PIN MFA de almacenamiento biometrico anterior:', err);
        }

        return (await this.has(serverKey) ? await NativeBiometric.deleteCredentials({ server: serverKey }) : false);
    }

}
