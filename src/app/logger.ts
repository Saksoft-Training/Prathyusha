import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string, data?: any) {
    if (data) {
      console.log(`[LOG] ${message}:`, data);
    } else {
      console.log(`[LOG] ${message}`);
    }
  }
}
