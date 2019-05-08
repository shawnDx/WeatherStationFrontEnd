import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-water-level-last-data',
  templateUrl: './water-level-last-data.component.html',
  styleUrls: ['./water-level-last-data.component.scss']
})
export class WaterLevelLastDataComponent implements OnInit {
  @Input('data') tableData: any
  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['time', 'WaterLevel'];
  //dataSource = this.tableData;

}
