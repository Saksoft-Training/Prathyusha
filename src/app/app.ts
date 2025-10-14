//#region Imports
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { HttpClientModule } from '@angular/common/http';
//#endregion

//#region Component Metadata
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
//#endregion

//#region App Component
export class App {

  //#region Properties
  /** Application title signal */
  protected readonly title = signal('movie-app');
  //#endregion

}
//#endregion