import { Component, OnInit, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../../../service/data.service';
import { ApiService } from '../../../service/api.service';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input('stationData') stationData
  @Input('weaterData') weaterData
  private ngUnsubscribe = new Subject();

  constructor(private api: ApiService, private data: DataService) { }
  ngOnInit() {
  }

  getdata = (id, type, callback): any => {
    var data;
    this.api.getThisTimeData({ station: id, type: type }).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      callback(data);
    })
  }

  toNumber(value) {
    return Number(value).toFixed(2);
  }

  changeStation(id: string, name: string, type: number) {
    this.data.changStation(id, name, type);
    this.data.change(2);
  }

}
