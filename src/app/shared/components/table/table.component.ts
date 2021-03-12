import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input('header') tableHeader: any;
  @Input('data') tableData: any[];
  @Output() rowClickedEvent = new EventEmitter();
  displayedColumns: string[];

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = Object.keys(this.tableHeader);
  }

  rowClicked(row) {
    this.rowClickedEvent.emit(row);
  }
}
