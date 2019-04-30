import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private data: DataService) {
    this.stationList = data.stationList;
   }
  stationList:any
  ngOnInit() {
  }

  changeStation(id: string, name: string) {
    this.data.changStation(id, name);
    this.data.change(false);
  }

}

//AMUNUGAMA_WL
//DADURUOYA_RESERVOIR_DAM_PCB
//DEEGAMA_WL