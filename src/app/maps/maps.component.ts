import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  toggleViewButton = new FormControl();

  constructor() {}

  ngOnInit(): void {
    let currentUrl = location.pathname;
    const exactUrl = currentUrl.split('/');
    exactUrl.splice(0, 2);
    exactUrl[0] === 'locator'
      ? this.toggleViewButton.setValue('locator')
      : this.toggleViewButton.setValue('list');
  }
}
