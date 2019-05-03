import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { DataService } from '../../service/data.service';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { componentRefresh } from '@angular/core/src/render3/instructions';
import { Station } from './satation.model';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'app-all-stations',
  templateUrl: './all-stations.component.html',
  styleUrls: ['./all-stations.component.scss']
})
export class AllStationsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  int_id: any

  displayedColumns: string[] = ['StationName', 'Status', 'Time', 'info'];
  lastDAta = []
  tableData:any;
  // tableData = new TableDataSource(this.apiService, this.data);
  // tempData = { name: "", active: false, latTime: "", info: { days: 0, hours: 0, min: 0 } } // hold data of a station

  constructor(private apiService: ApiService, private data: DataService, private changeDetectorRefs: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.getAlldata().then(()=>{
     console.log("all done");
    })
    this.int_id = setInterval(() => {
      //this.getAlldata()
      this.tableData =  new MatTableDataSource<Station>(this.lastDAta);
    }, 1000);
  }
  ngAfterContentInit(){
    
  }

  ngOnDestroy() {
    clearInterval(this.int_id);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async setdata(station) {
    var tempData: Station // hold data of a station
    tempData = new Station();
    this.apiService.getLastDataLog({ station: station.id }).subscribe(result => {
      if (result.success) {
        var now = momentTz().tz("Asia/Colombo");
        var end = momentTz(result.dateTime).tz("Asia/Colombo");
        var duration = moment.duration(now.diff(end));
        // console.log(result);
        tempData.name = station.name;
        tempData.latTime = end.format("DD/MM/YYYY HH:mm");
        tempData.days = duration.days();
        tempData.hours = duration.hours();
        tempData.min = duration.minutes();
        if (Number(duration.asMinutes().toFixed(1)) < 20) {
          tempData.active = true;
        }
        else {
          tempData.active = false;
        }
        this.lastDAta.push(tempData)
        // this.tableData.data.push(tempData);
        // this.tableData = this.tableData
        // console.log(tempData);
      }
    });
  }

  async getAlldata() {
    this.data.stationList.forEach(element => {
      this.setdata(element);
    });
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
