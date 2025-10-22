//#region Imports
import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger';
//#endregion

//#region Component Metadata
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
//#endregion

//#region About Component
export class About {

  //#region Constructor
  constructor(private logger: LoggerService) {
    this.logger.log('Opened the about page');
  }
  //#endregion

}
//#endregion
