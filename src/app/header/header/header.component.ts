import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  // Corrected typo
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription | null = null;  // Initialize to null

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .pipe(
        catchError(error => {
          console.error('Error in auth status subscription', error);
          throw error;  // Re-throw the error after logging it
        })
      )
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    if (this.authListenerSubs) {
      this.authListenerSubs.unsubscribe();  // Unsubscribe if it's not null
    }
  }
}
