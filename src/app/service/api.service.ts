import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

const hostAddress: string = "http://4onse.projects.uom.lk"//"https://wsdispalyserver.herokuapp.com";//"http://localhost:3000"//

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: Http) { }

  getThisTimeData(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(hostAddress + '/frontEnd/dataWithStName', data, { headers: headers })
      .pipe(map(res => res.json()));
  }
  getLastDataLog(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(hostAddress + '/frontEnd/lastDataLog', data, { headers: headers })
      .pipe(map(res => res.json()));
  }
  getLastDataLogFroAllStation() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(hostAddress + '/frontEnd/getLstDtaLg', { headers: headers })
      .pipe(map(res => res.json()));
  }

  getLocationForAllStation() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(hostAddress + '/frontEnd/location', { headers: headers })
      .pipe(map(res => res.json()));
  }
}