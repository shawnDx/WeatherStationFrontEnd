import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar-template',
  templateUrl: './toolbar-template.component.html',
  styleUrls: ['./toolbar-template.component.scss']
})
export class ToolbarTemplateComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  refreshData: any
  active: boolean = false;
  ready: boolean = false;
  time = {
    lastTime: "",
    lastdate: "",
    difMin: 0,
    difHour: 0,
    difDate: 0,
  }
  toolbarModel = {
    dateTime: "",
    temperatureInternal: "00.000000",
    pressure: "0.000000",
    light: "0.000000",
    humidity: "0.000000",
    temperature: "24.730000",
    windVelocity: "1.090000",
    rainFall: "0.000000",
    windDirection: "243.360000",
    success: false
  }
  @Input('id') id: string
  @Input('name') name: string
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {

    this.getdata();
    this.refreshData = setInterval(() => {
      this.getdata()
    }, 60000);
  }
  getdata() {
    this.apiService.getLastDataLog({ station: this.id }).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
      console.log(result);
      if (result.success) {
        this.toolbarModel = result;
        this.evaluate(result.dateTime);
        this.ready = true;
      }
    });
  }
  convert(value: string) {
    return Number(value).toFixed(2)
  }
  async evaluate(endDate) {
    var now = momentTz().tz("Asia/Colombo");
    var end = momentTz(endDate).tz("Asia/Colombo");
    var duration = moment.duration(now.diff(end));
    // console.log(duration.asMinutes().toFixed(1));
    this.time.lastTime = end.format("HH:mm");
    this.time.lastdate = end.format("DD/MM/YYYY");
    this.time.difDate = duration.days();
    this.time.difHour = duration.hours();
    this.time.difMin = duration.minutes();

    // console.log(this.time);
    if (Number(duration.asMinutes().toFixed(1)) < 20) {
      this.active = true;
    }
  }

  ngOnDestroy() {
    clearInterval(this.refreshData);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
