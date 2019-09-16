import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // Initialize isDarkTheme to false
  isDarkTheme: boolean = false;

  changeTheme(): void {
      if (this.isDarkTheme) {
         this.isDarkTheme = false;
      } else {
         this.isDarkTheme = true;
      }
  }

}
