import { Component, OnInit, Input } from '@angular/core';
import { Dataset } from './dataset.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-lastdata-set',
  templateUrl: './lastdata-set.component.html',
  styleUrls: ['./lastdata-set.component.scss']
})
export class LastdataSetComponent implements OnInit {

  @Input('data') tableData:any
  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['time','temperature', 'pressure','humidity','Rainfall','Wind Speed','Wind Direction','Light','internalTemperature'];
  //dataSource = this.tableData;

  tonumber(value){
    return Number(value).toFixed(2);
  }

}
