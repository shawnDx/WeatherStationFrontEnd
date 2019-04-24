import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private data: DataService) { }
  stationList = [
    { name: "University Of Moratuwa(FIT) PCB", id: "University%20of%20Moratuwa(FIT)PCB" },
    { name: "University Of Moratuwa(TCP) PCB", id: "University%20of%20Moratuwa(TCP)PCB" },
    { name: "Backmegahawaththa PCB", id: "BAKMEEGAHAWATHTHA_PCB" }
  ]
  ngOnInit() {
  }

  changeStation(id: string, name: string) {
    this.data.changStation(id, name);
  }

}
