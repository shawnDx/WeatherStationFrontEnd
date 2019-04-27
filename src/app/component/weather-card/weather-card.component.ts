import { Component, OnInit } from '@angular/core';
import { Card } from './cardtemplate/card.model';
import { ApiService } from '../../service/api.service';
import { from } from 'rxjs';
import { Dataset } from './lastdata-set/dataset.model';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  tableData: any;
  cards = [];
  tempretureCard: Card;
  pressureCard: Card;
  humidityCard: Card;
  rainfallCard: Card;
  winSpeedCard: Card;
  windDirectionCard: Card;
  lightCard: Card;
  stationName: string = "University%20of%20Moratuwa(TCP)PCB";
  stationDispayName: string = "University Of Moratuwa(FIT) PCB"
  workingFlag: Boolean = false;
  loadingFlag: Boolean = true;

  constructor(private apiService: ApiService, private data: DataService) {
    // configure card before initialize
    this.tempretureCard = new Card();
    this.tempretureCard.title = "Temperature";
    this.tempretureCard.imageurl = "../../../assets/weatherInfoImg/Temperature-icon.png"
    this.tempretureCard.data = 32;
    this.tempretureCard.uom = "&deg;C";
    this.cards.push(this.tempretureCard); // push cards arry to each card so we can loop the arrray in HTML

    this.pressureCard = new Card();
    this.pressureCard.title = "Pressure";
    this.pressureCard.imageurl = "../../../assets/weatherInfoImg/pressure.png"
    this.pressureCard.data = 100.99;
    this.pressureCard.uom = "Kpa"
    this.cards.push(this.pressureCard);

    this.humidityCard = new Card();
    this.humidityCard.title = "Humidity";
    this.humidityCard.imageurl = "../../../assets/weatherInfoImg/humidity.png"
    this.humidityCard.data = 55.20;
    this.humidityCard.uom = "%";
    this.cards.push(this.humidityCard);

    this.rainfallCard = new Card();
    this.rainfallCard.title = "Rainfall";
    this.rainfallCard.imageurl = "../../../assets/weatherInfoImg/rain.png"
    this.rainfallCard.data = 1.25;
    this.rainfallCard.uom = "mm";
    this.cards.push(this.rainfallCard);

    this.winSpeedCard = new Card();
    this.winSpeedCard.title = "Wind Speed";
    this.winSpeedCard.imageurl = "../../../assets/weatherInfoImg/windSpeed.png"
    this.winSpeedCard.data = 1.25;
    this.winSpeedCard.uom = "ms<sup>-1</sup>";
    this.cards.push(this.winSpeedCard);


    this.windDirectionCard = new Card();
    this.windDirectionCard.title = "Wind Direction";
    this.windDirectionCard.imageurl = "../../../assets/weatherInfoImg/WindDirection.png"
    this.windDirectionCard.data = 260.52;
    this.windDirectionCard.uom = "&deg;";
    this.cards.push(this.windDirectionCard);


    this.lightCard = new Card();
    this.lightCard.title = "Light";
    this.lightCard.imageurl = "../../../assets/weatherInfoImg/light.png"
    this.lightCard.data = 160.5;
    this.lightCard.uom = "lux";
    this.cards.push(this.lightCard);
  }

  ngOnInit() {
    this.data.currentStationName.subscribe(stationName => {
      this.stationDispayName = stationName;
    })
    this.data.currentStation.subscribe(station => {
      this.stationName = station;
      this.getdata(true);
    });
    this.getdata(true);
    setInterval(() => {
      this.getdata(false);
    }, 10000);
  }
  getdata(isFirstload: Boolean) {
    if (isFirstload) this.loadingFlag = true;
    this.apiService.getThisTimeData({ station: this.stationName }).subscribe(data => {
      if (data[0].success) {
        this.workingFlag = true;
        this.tableData = data;
        var result = data[0];
        console.log(data);
        this.tempretureCard.singleValueverify((Number(result.temperature)).toFixed(2), 50, 10);
        this.pressureCard.singleValueverifyWithTwoType((Number(result.pressure)).toFixed(2), 110, 85, "Kpa", 1020, 900, "hpa");
        this.humidityCard.singleValueverify((Number(result.humidity)).toFixed(2), 101, 0.01);
        this.winSpeedCard.multiValueverify(data, "windVelocity")// have ti use multi vaue verification
        this.windDirectionCard.multiValueverify(data, "windDirection") // have to use multi value verification
        this.rainfallCard.data = (Number(result.rainFall)).toFixed(2); // still Canot do verifiacation
        this.lightCard.data = (Number(result.light)).toFixed(2); // have to use time verification

        this.tempretureCard.dateTime = result.time;
        this.pressureCard.dateTime = result.time;
        this.humidityCard.dateTime = result.time;
        this.rainfallCard.dateTime = result.time;
        this.winSpeedCard.dateTime = result.time;
        this.windDirectionCard.dateTime = result.time;
        this.lightCard.dateTime = result.time;
      }
      else {
        this.workingFlag = false;
      }
      this.loadingFlag = false;
    });
  }
}
