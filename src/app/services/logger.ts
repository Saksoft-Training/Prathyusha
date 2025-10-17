//#region Imports
import { Injectable } from '@angular/core';
//#endregion

//#region Injectable Metadata
@Injectable({ providedIn: 'root' })
//#endregion

//#region LoggerService
export class LoggerService {

  //#region Methods

  //#region log
  /**
   * Logs a message to the console with optional data.
   * @param message - Main log message
   * @param data - Optional additional data to log
   */
  public log(message: string, data?: any): void {
    if (data) {
      console.log(`[LOG] ${message}:`, data);
    } else {
      console.log(`[LOG] ${message}`);
    }
  }
  //#endregion

  //#endregion

}
//#endregion
