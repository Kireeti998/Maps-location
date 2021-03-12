import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public mapCoordinates$ = new BehaviorSubject(<any>[]);

  constructor(private http: HttpClient) {}

  getMapCoordinates(name) {
    return this.http.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=AIzaSyBaUrSDc2A9mfhyzUDeln7QzFWp5QkKY6U`
    );
  }
}
