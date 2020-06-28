import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFacadeService {

  constructor(private af: AngularFire) { }
}
