import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // this will be passed from the route config
      // on the data property
      const expectedRole = next.data.expectedRole;
      const token = localStorage.getItem('id_token');
      // decode the token to get its payload
      //const tokenPayload = decode(token);
      //console.log(tokenPayload.role)
    	// if (!this.authService.isLoggedIn() || tokenPayload.role !== expectedRole) {
     //    this.router.navigate(['login']);
     //    return false;
    	// }

      return true;
    }
}
