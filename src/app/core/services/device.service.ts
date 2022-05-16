import { Injectable } from '@angular/core';
import { Device, DeviceId } from '@capacitor/device';
import { DeviceInfo } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  async getDeviceInfo(): Promise<DeviceInfo> {
    let uuid: string = (await this.getDeviceId()).uuid
    let deviceInfo = await Device.getInfo();
    return { uuid: uuid, model: deviceInfo.model, platform: deviceInfo.platform, manufacturer: deviceInfo.manufacturer };
  }

  async getDeviceId(): Promise<DeviceId> {
    return await Device.getId();
  }

  async getDeviceUUID(): Promise<string> {
    return (await this.getDeviceId()).uuid;
  }
}
