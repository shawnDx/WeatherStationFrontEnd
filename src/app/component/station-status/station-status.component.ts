import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service'
import { ApiService } from '../../service/api.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-station-status',
  templateUrl: './station-status.component.html',
  styleUrls: ['./station-status.component.scss']
})
export class StationStatusComponent implements OnInit {
  StationList: any[]
  private ngUnsubscribe = new Subject();
  refreshData: any
  loading: Boolean = true;
  key: string = 'time';
  flip: number = 1;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private dataService: DataService, private api: ApiService, private breakpointObserver: BreakpointObserver) {
    // this.StationList = dataService.stationList;
  }
  ngOnInit() {
    this.update();
    this.refreshData = setInterval(() => {
      // update station status here
      this.update();
    }, 20000)
  }

  update() {
    this.api.getLastDataLogFroAllStation().pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (result.state = true) {
        for (let i = 0; i < result.result.length; i++) {
          var now = momentTz().tz("Asia/Colombo");
          var end = momentTz(result.result[i].ldlog).tz("Asia/Colombo");
          var duration = moment.duration(now.diff(end));
          // console.log(duration.asMinutes().toFixed(1));
          result.result[i].time = Number(duration.asMinutes().toFixed(1));
          result.result[i].lastdate = end.format("DD/MM/YYYY HH:mm");
          result.result[i].difDate = duration.days();
          result.result[i].difHour = duration.hours();
          result.result[i].difMin = duration.minutes();
          // console.log(this.time);
          if (Number(duration.asMinutes().toFixed(1)) < 20) {
            result.result[i].active = 2;
          }
          else if (Number(duration.asMinutes().toFixed(1)) < 120) {
            result.result[i].active = 1;
          }
          else {
            result.result[i].active = 0;
          }
          // result.result[i].time = "this";
          // console.log(result.result[i]);
        }
        this.StationList = result.result;
        this.sort(this.key)
        this.loading = false;
        // console.log("end");
      }
      else {
        // do nothig just wait for next time
      }
    })
  }

  changeStation(id: string, name: string, type: number) {
    this.dataService.changStation(id, name, type);
    this.dataService.change(2);
  }

  ngOnDestroy() {
    clearInterval(this.refreshData);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  sort(key, flip = false) {
    this.key = key;
    if (flip) {
      this.flip = this.flip * -1;
    }

    if (key == "name" || key == 'lastdate') {
      this.StationList.sort((a, b) => {
        return (a[key].localeCompare(b[key])) * this.flip;
      }
      );
    }
    else {
      this.StationList.sort((a, b) => {
        if (a[key] > b[key]) {
          return 1 * this.flip;
        }
        else if (a[key] < b[key]) {
          return -1 * this.flip;
        }
        else {
          return 0;
        }
      })
    }
  }
}
