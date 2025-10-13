import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About {
  constructor(private logger: LoggerService) {
    this.logger.log('Opened the about page');
  }

}