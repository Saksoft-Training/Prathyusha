//#region Imports
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
//#endregion

//#region Component Metadata
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
//#endregion

//#region Navbar Component
export class Navbar {
}
//#endregion