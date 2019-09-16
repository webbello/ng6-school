import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-material-nav',
  templateUrl: './material-nav.component.html',
  styleUrls: ['./material-nav.component.scss']
})
export class MaterialNavComponent {
// Initialize isDarkTheme to false
  public isDarkTheme: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) {}
	changeTheme(): void {
		this.isDarkTheme = !this.isDarkTheme;
		const body = document.getElementsByTagName('body')[0];
		if (this.isDarkTheme) {
			//this.isDarkTheme = false;
			body.classList.add('iirs-dark-theme');
		} else {
			//this.isDarkTheme = true;
			body.classList.remove('iirs-dark-theme');
		}
	}
	logout() {
		if (this.authService.isLoggedIn()) {

			this.authService.setUserLastActive(0)
			.subscribe(res => {
				console.log('AuthGuard',res);
			}, err => {
				console.log(err);
			});
			this.authService.logout();
		}
	}
}
