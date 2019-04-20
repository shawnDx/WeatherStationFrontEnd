import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

const hostAddress: string = "https://wsdispalyserver.herokuapp.com";

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
}