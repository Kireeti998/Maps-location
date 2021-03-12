import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { Subscription } from 'rxjs';
import { CoordinateElement } from 'src/app/models/map';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'name', 'address', 'lat', 'lng'];
  tableData: any[] = [];
  subscription: Subscription;

  tableHeader: CoordinateElement = {
    index: 'No.',
    name: 'Name',
    address: 'Address',
    lat: 'Latitude',
    lng: 'Longitude'
  };

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.subscription = this.mapService.mapCoordinates$.subscribe(response => {
      this.tableData = [...response];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
