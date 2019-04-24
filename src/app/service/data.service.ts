import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private station = new BehaviorSubject<string>('University%20of%20Moratuwa(FIT)PCB');
  currentStation = this.station.asObservable();

  private stationName = new BehaviorSubject<string>("University Of Moratuwa(FIT) PCB");
  currentStationName = this.stationName.asObservable();
  constructor() { }

  changStation(station: string , stationName: string) {
    console.log(station);
    this.station.next(station);
    this.stationName.next(stationName);
  }
}
