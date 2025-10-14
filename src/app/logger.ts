import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  /**
   * Logs a message and optional data to the console.
   * @param message - The message to log.
   * @param data - Optional additional data.
   * @returns void
   */
  log(message: string, data?: any):void {
    if (data) {
      console.log(`[LOG] ${message}:`, data);
    } else {
      console.log(`[LOG] ${message}`);
    }
  }
}
