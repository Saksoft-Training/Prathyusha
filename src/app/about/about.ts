import { Component } from '@angular/core';
import { LoggerService } from '../logger';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  constructor(private logger: LoggerService) {
    this.logger.log('Opened the about page');
  }

}