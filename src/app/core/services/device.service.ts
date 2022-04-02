import { Injectable } from '@angular/core';
import { Device, DeviceInfo, DeviceId } from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  async getDeviceInfo(): Promise<DeviceInfo> {
    return await Device.getInfo();
  }

  async getDeviceId(): Promise<DeviceId> {
    return await Device.getId();
  }
}
