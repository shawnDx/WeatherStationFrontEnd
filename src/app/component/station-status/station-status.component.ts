import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service'


@Component({
  selector: 'app-station-status',
  templateUrl: './station-status.component.html',
  styleUrls: ['./station-status.component.scss']
})
export class StationStatusComponent implements OnInit {
  StationList:any
  data={
    success:false
  }
  constructor(private dataService:DataService) { 
    this.StationList = dataService.stationList;
  }
  ngOnInit() {
    
  }

  changeStation(id: string, name: string) {
    this.dataService.changStation(id, name);
    this.dataService.change(false);
  }

}
