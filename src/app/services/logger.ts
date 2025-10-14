import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  /**
   * Logs a message to the console with optional data.
   * @param message - Main log message
   * @param data - Optional additional data to log
   * @param level - Optional log level ('log', 'error')
   */
  public log(message: string, data?: any) {
    if (data) {
      console.log(`[LOG] ${message}:`, data);
    } else {
      console.log(`[LOG] ${message}`);
    }
  }
}
