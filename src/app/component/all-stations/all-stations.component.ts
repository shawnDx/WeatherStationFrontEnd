import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { DataService } from '../../service/data.service';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';
import { Station } from './satation.model';
@Component({
  selector: 'app-all-stations',
  templateUrl: './all-stations.component.html',
  styleUrls: ['./all-stations.component.scss']
})
export class AllStationsComponent implements OnInit {
  StationList = this.data.stationList;

  constructor(private apiService: ApiService, private data: DataService, private changeDetectorRefs: ChangeDetectorRef) {
  }
  ngOnInit() {
  }


  ngOnDestroy() {

  }
  changeStation(id: string, name: string, type: number) {
    this.data.changStation(id, name, type);
    this.data.change(2);
  }
}


// export class TableDataSource extends DataSource<any>{
//   returndata = new Subject<Station[]>();
//   constructor(private apiService: ApiService, private data: DataService) {
//     super();
//   }

//   connect(): Observable<Station[]> {
//     this.getAlldata();
//     return this.returndata;
//   }
//   disconnect() {

//   }

//   async setdata(station) {
//     var tempData: Station // hold data of a station
//     tempData = new Station();
//     this.apiService.getLastDataLog({ station: station.id }).subscribe(result => {
//       if (result.success) {
//         var now = momentTz().tz("Asia/Colombo");
//         var end = momentTz(result.dateTime).tz("Asia/Colombo");
//         var duration = moment.duration(now.diff(end));
//         // console.log(result);
//         tempData.name = station.name;
//         tempData.latTime = end.format("DD/MM/YYYY HH:mm");
//         tempData.days = duration.days();
//         tempData.hours = duration.hours();
//         tempData.min = duration.minutes();
//         if (Number(duration.asMinutes().toFixed(1)) < 20) {
//           tempData.active = true;
//         }
//         else {
//           tempData.active = false;
//         }
//         this.populate(tempData);

//       }
//     });
//   }
//   async getAlldata() {
//     this.data.stationList.forEach(element => {
//       this.setdata(element)
//     });
//   }
//   populate(station: Station) {
//     console.log(station);
//     this.returndata.next([station]);
//   }
// }
