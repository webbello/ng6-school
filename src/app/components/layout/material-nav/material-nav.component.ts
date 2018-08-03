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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {}
  
  }
