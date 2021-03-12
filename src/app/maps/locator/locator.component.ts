import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import {} from 'googlemaps';
import { FormControl } from '@angular/forms';
import { MapService } from 'src/app/services/map.service';
import { Subscription } from 'rxjs';
import { CoordinateElement } from 'src/app/models/map';

const ELEMENT_DATA: CoordinateElement[] = [];

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss']
})
export class LocatorComponent
  implements AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  searchInput = new FormControl();
  displayedColumns: string[] = ['index', 'name', 'address'];
  tableData: any[] = [];
  isLoadingResults: boolean = true;
  isLoaded: boolean = false;
  subscription: Subscription[] = [];
  tableHeader: CoordinateElement = {
    index: 'No.',
    name: 'Name',
    address: 'Address'
  };

  constructor(private mapService: MapService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const sub1 = this.mapService.mapCoordinates$.subscribe(response => {
      if (response.length === 0) {
        this.getCoordinatesData('pramati');
        this.isLoaded = true;
      } else if (!this.isLoaded) {
        const location = {
          lat: response[response.length - 1].lat,
          lng: response[response.length - 1].lng
        };
        this.loadMap(location);
        this.tableData = [...response];
        this.isLoadingResults = false;
      }
    });
    this.subscription.push(sub1);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  getCoordinatesData(name) {
    const sub2 = this.mapService
      .getMapCoordinates(name)
      .subscribe((response: any) => {
        ELEMENT_DATA.push({
          index: ELEMENT_DATA.length + 1,
          name: response.results[0].name,
          address: response.results[0].formatted_address,
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng
        });
        this.tableData = [...ELEMENT_DATA];
        this.isLoadingResults = false;
        this.loadMap(response.results[0].geometry.location);
        this.mapService.mapCoordinates$.next(this.tableData);
      });
    this.subscription.push(sub2);
  }

  loadMap(coordinates) {
    const mapProperties = {
      center: new google.maps.LatLng(coordinates.lat, coordinates.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );
    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
      title: 'markers'
    });
  }

  updateMap(coordinates) {
    this.loadMap(coordinates);
  }

  clearSearch(event: MouseEvent) {
    this.searchInput.patchValue('');
    event.preventDefault();
  }

  clickSearch(value) {
    if (value) {
      this.getCoordinatesData(value);
      this.isLoadingResults = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.map(sub => sub.unsubscribe());
  }
}
