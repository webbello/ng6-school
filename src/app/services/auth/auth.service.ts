
/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */

import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

	constructor(private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;

		if (localStorage.getItem('userData')) {
			return true;
		}else {
			//this.router.navigate(['/login']);
			return true;
		}
	}
}

/**
 * Created By : Sangwin Gawande (http://sangw.in)
 */