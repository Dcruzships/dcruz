import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Log, logs } from './logs';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LogTableComponent implements OnInit {

  logs: Log[] = logs;
  displayedColumns: string[] = ['date', 'log'];
  dataSource = new MatTableDataSource<Log>(this.logs);

  isExpansionDetailRow = (i: number, row: Log) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Log>(this.logs);
  }

}
