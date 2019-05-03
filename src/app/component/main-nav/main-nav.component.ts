import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, timeInterval } from 'rxjs/operators';
import { DataService } from '../../service/data.service'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  dateTime: string;
  page: boolean = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private data: DataService) {
    setInterval(() => {
      let currentDate = new Date();
      this.dateTime = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString();
    }, 1000)
  }
  ngOnInit(): void {
    this.data.currentPage.subscribe(status => {
      this.page = status;
    })
  }

  changePage() {
    this.page = true;
  }

}
