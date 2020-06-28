import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  exports: [CommonModule],
})
export class CoreModule {}
