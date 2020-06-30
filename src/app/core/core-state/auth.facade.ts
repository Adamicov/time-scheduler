import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '@core/core-state/auth.reducers';
import { Store } from '@ngrx/store';
import {
  selectUser,
  selectUserAuthenticated,
} from '@core/core-state/auth.selectors';
import { User } from '@models/auth/user';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  isAuthenticated$: Observable<boolean> = this.store.select(
    selectUserAuthenticated
  );
  user$: Observable<User> = this.store.select(selectUser);

  constructor(private store: Store<AuthState>) {}
}
