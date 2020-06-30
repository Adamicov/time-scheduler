import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { FEATURE_KEY, reducer } from '@core/core-state/auth.reducers';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@core/core-state/auth.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forFeature(FEATURE_KEY, reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [CommonModule],
})
export class CoreModule {}
